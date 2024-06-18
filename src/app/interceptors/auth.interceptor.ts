import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
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
      .pipe(catchError(e => this.handleError(e, request, next)));
  }

  handleError(err: any, request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (err && err.status == 401 && !this.requested) {
      // If the error status is 401 Unauthorized, try refreshing the token
      return this.refreshToken().pipe(
        switchMap((success: boolean) => {
          // Clone the original request and attach the new token to the header
          const { token } = this.userService.getTokenWithRefresh();

          const clonedRequest = request.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } });
          return next.handle(clonedRequest);
        })
      );
    }

    return throwError(() => new Error('err'));
  }

  private refreshToken(): Observable<boolean> {
    this.requested = true;

    const { token, refreshToken } = this.userService.getTokenWithRefresh();

    return this.authService.refresh(token!, refreshToken!); // TODO: valores podem ser nulos!
  }
}
