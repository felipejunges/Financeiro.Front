import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcela } from 'src/app/interfaces/Parcela';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelasService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  obterBoleto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/Parcelas/${id}/obter-boleto`, { responseType: 'text' });
  }

  listarParcelas(contratoId: number): Observable<Parcela[]> {
    return this.http.get<Parcela[]>(`${this.baseUrl}api/Contratos/${contratoId}/parcelas`);
  }

  gerarBoletoParcela(parcelaId: number) {
    return this.http.post(`${this.baseUrl}api/Parcelas/${parcelaId}/gerar-boleto?confirmaSobrescrever=true`, null);
  }
}
