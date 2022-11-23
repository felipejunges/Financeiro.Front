import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { Parcela } from 'src/app/interfaces/Parcela';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParcelasService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private readonly keycloak: KeycloakService) { }

  obterBoleto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}api/Parcelas/${id}/obter-boleto`, { responseType: 'text', headers: this.authHeader() });
  }

  listarParcelas(contratoId: number): Observable<Parcela[]> {
    return this.http.get<Parcela[]>(`${this.baseUrl}api/Contratos/${contratoId}/parcelas`, { headers: this.authHeader() });
  }

  gerarBoletoParcela(parcelaId: number) {
    return this.http.post(`${this.baseUrl}api/Parcelas/${parcelaId}/gerar-boleto?confirmaSobrescrever=true`, { headers: this.authHeader() });
  }
  
  private authHeader() : HttpHeaders {
    return new HttpHeaders ({
      //'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Authorization': `Bearer ${this.keycloak.getToken()}`
    })
  }
}
