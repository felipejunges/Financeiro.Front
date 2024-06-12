import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public AUTH_TOKEN_KEY: string = 'authToken';
  public AUTH_REFRESH_TOKEN_KEY: string = 'authRefreshToken';

  constructor() { }

  isLoggedIn(): boolean {
    return this.getToken() != null; // TODO: validar se o token está válido
  }

  set(token: string, refreshToken: string) {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    localStorage.setItem(this.AUTH_REFRESH_TOKEN_KEY, refreshToken);
  }

  remove() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.AUTH_REFRESH_TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }
}
