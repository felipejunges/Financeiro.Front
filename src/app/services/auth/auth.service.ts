import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/interfaces/login/LoginRequest';
import { LoginResponse } from 'src/app/interfaces/login/LoginResponse';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.apiAuthBaseUrl;

  constructor(private http: HttpClient, private tokenService: TokenService, private userService: UserService) { }

  login(request: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.baseUrl}api/Auth`, request)
      .pipe(
        map((response: LoginResponse) => {
          if (!response.sucesso) {
            return false;
          }

          this.tokenService.set(response.token, response.refreshToken);
          this.userService.decodeJwt(response.token);

          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error during login:', error);
          return throwError(() => new Error('test'));
        })
      );
  }

  refresh(token: string, refreshToken: string): Observable<boolean> {
    return this.http.put<LoginResponse>(`${this.baseUrl}api/Auth`, { token, refreshToken })
      .pipe(
        map((response: LoginResponse) => {

          if (!response.sucesso) {
            return false;
          }

          this.tokenService.set(response.token, response.refreshToken);
          this.userService.decodeJwt(response.token);

          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error during refreshToken:', error);
          return throwError(() => new Error('test'));
        })
      );
  }
}
