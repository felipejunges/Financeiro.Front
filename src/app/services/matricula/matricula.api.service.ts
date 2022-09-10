import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Matricula } from 'src/app/interfaces/Matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaApiService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  incluir(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(`${this.baseUrl}api/Matriculas`, matricula);
  }

  obterContrato(contratoId: number): Observable<any> {
    //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const options = {responseType: 'text'};

    return this.http.get(`${this.baseUrl}api/Contratos/${contratoId}/termos`, {responseType: 'text'});
  }
}
