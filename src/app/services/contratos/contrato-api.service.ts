import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

import { Contrato } from 'src/app/interfaces/Contrato';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private readonly keycloak: KeycloakService) { }

  listarContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.baseUrl}api/Contratos`, { headers: this.authHeader() });
  }

  obterTermosContrato(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/Contratos/${id}/termos`, { responseType: 'text', headers: this.authHeader() });
  }

  aceitarTermosContrato(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}api/Contratos/${id}/termos`, { headers: this.authHeader() });
  }

  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      //'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Authorization': `Bearer ${this.keycloak.getToken()}`
    })
  }
}
