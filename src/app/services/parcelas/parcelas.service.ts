import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcela } from 'src/app/interfaces/Parcela';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ParcelasService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private readonly auth: AuthService) { }

  obterBoleto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/Parcelas/${id}/obter-boleto`, { responseType: 'text', headers: this.authHeader() });
  }

  listarParcelas(contratoId: number): Observable<Parcela[]> {
    return this.http.get<Parcela[]>(`${this.baseUrl}api/Contratos/${contratoId}/parcelas`, { headers: this.authHeader() });
  }

  gerarBoletoParcela(parcelaId: number) {
    return this.http.post(`${this.baseUrl}api/Parcelas/${parcelaId}/gerar-boleto?confirmaSobrescrever=true`, null, { headers: this.authHeader() });
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.auth.getToken()}`
    })
  }
}
