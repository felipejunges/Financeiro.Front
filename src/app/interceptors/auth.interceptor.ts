import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private router: Router
  ) { }

  requested = false;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userService.getToken();

    if (token != null) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    return next
      .handle(request)
      .pipe(catchError(e => this.handleError(e)));
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err && err.status == 401 && !this.requested) {

      // TODO: estudar Observables :)

      this.refreshToken().subscribe({
        next: (tokenRenewed: boolean) => {
          if (tokenRenewed) {
            this.requested = false;
            return of('Token renewed')
          }

          return throwError(() => new Error('Impossível gerar novo token'));
        },
        error: (err: any) => {
          this.userService.logout();
          this.router.navigate(['/']);

          return throwError(() => new Error('User token is invalid'));
        }
      });

      return of('Of padrão');

    } else {
      this.requested = false;
      return throwError(() => new Error('Erro não relacionado com Auth'));
    }
  }

  private refreshToken(): Observable<boolean> {
    this.requested = true;

    const [token, refreshToken] = this.userService.getTokenWithRefresh();

    return this.authService.refresh(token!, refreshToken!); // TODO: valores podem ser nulos!
  }
}
