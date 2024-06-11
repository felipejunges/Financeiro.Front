import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contrato } from 'src/app/interfaces/Contrato';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  listarContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.baseUrl}api/Contratos`);
  }

  obterTermosContrato(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/Contratos/${id}/termos`, { responseType: 'text' });
  }

  aceitarTermosContrato(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}api/Contratos/${id}/termos`, {}); // TODO: validar essa chamada pois estava passando o token aqui
  }
}
