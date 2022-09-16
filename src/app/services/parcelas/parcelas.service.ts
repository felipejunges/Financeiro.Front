import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Parcela } from 'src/app/interfaces/Parcela';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelasService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private readonly oAuthService: OAuthService) { }

  listarParcelas(contratoId: number): Observable<Parcela[]> {
    return this.http.get<Parcela[]>(`${this.baseUrl}api/Contratos/${contratoId}/parcelas`, { headers: this.authHeader() });
  }

  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    })
  }
}
