import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Matricula } from 'src/app/interfaces/Matricula';
import { ContratoInclusao } from 'src/app/interfaces/ContratoInclusao';

@Injectable({
  providedIn: 'root'
})
export class MatriculaApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  incluir(matricula: Matricula): Observable<ContratoInclusao> {
    return this.http.post<ContratoInclusao>(`${this.baseUrl}api/Matriculas`, matricula);
  }
}
