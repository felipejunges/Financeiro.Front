import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { Matricula } from 'src/app/interfaces/Matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaApiService {
  private baseUrl = environment.apiBaseUrl;
  private matriculasApiUrl = `${this.baseUrl}api/Contratos`;

  constructor(private http: HttpClient) { }

  incluir(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.matriculasApiUrl, matricula);
  }
}
