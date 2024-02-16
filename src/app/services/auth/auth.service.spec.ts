import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs'; // Import 'of' from RxJS

describe('AuthService', () => {
  let authService: AuthService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authService = new AuthService(httpSpy);
  });

  it('should call HTTP post with correct URL and request', () => {
    const request = { email: 'email', senha: 'senha' };
    const response = { sucesso: true, token: 'fakeToken', refreshToken: 'fakeRefreshToken' };

    httpSpy.post.and.returnValue(of(response)); // Mock the HTTP response

    authService.login(request);

    expect(httpSpy.post).toHaveBeenCalledWith(`${authService.baseUrl}api/Auth`, request);
  });

  it('should store tokens in local storage on successful login', () => {
    const request = { email: 'email', senha: 'senha' };
    const response = { sucesso: true, token: 'fakeToken', refreshToken: 'fakeRefreshToken' };

    httpSpy.post.and.returnValue(of(response)); // Mock the HTTP response

    authService.login(request);

    expect(localStorage.getItem(authService.AUTH_TOKEN_KEY)).toBe('fakeToken');
    expect(localStorage.getItem(authService.AUTH_REFRESH_TOKEN_KEY)).toBe('fakeRefreshToken');
  });

  // Add more tests for other methods (e.g., isLoggedIn, logout, getToken)
});
