import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/interfaces/login/LoginRequest';
import { LoginResponse } from 'src/app/interfaces/login/LoginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public baseUrl = environment.apiAuthBaseUrl;
  public AUTH_TOKEN_KEY: string = 'authToken';
  public AUTH_REFRESH_TOKEN_KEY: string = 'authRefreshToken';

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.AUTH_TOKEN_KEY) != null; // TODO: validar se o token está válido
  }

  login(request: LoginRequest): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.baseUrl}api/Auth`, request).pipe(
      map((response: LoginResponse) => {
        if (!response.sucesso) {
          return false;
        }

        localStorage.setItem(this.AUTH_TOKEN_KEY, response.token);
        localStorage.setItem(this.AUTH_REFRESH_TOKEN_KEY, response.refreshToken);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error during login:', error);
        return throwError(() => new Error('test'));
      })
    );
  }

  logout() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.AUTH_REFRESH_TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }
}
