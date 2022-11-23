import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/interfaces/Contrato';
import { Parcela } from 'src/app/interfaces/Parcela';
import { ContratoApiService } from 'src/app/services/contratos/contrato-api.service';
import { ParcelasService } from 'src/app/services/parcelas/parcelas.service';

@Component({
  selector: 'app-parcelas',
  templateUrl: './parcelas.component.html',
  styleUrls: ['./parcelas.component.css']
})
export class ParcelasComponent implements OnInit {

  contratos: Contrato[] = [];
  parcelas: Parcela[] = [];

  constructor(private service: ParcelasService, private contratoService: ContratoApiService) { }

  ngOnInit(): void {
    this.listarContratos();
  }

  listarContratos() {
    this.contratoService.listarContratos().subscribe((contratos) => {
      this.contratos = contratos;

      if (contratos) {
        this.listarParcelas(contratos[0].id.toString());
      }
    });
  }

  gerarBoletoParcela(parcelaId: number) {
    this.service.gerarBoletoParcela(parcelaId).subscribe(() => {
      this.listarContratos();
    });
  }

  listarParcelas(contratoId: string) {
    this.service.listarParcelas(Number(contratoId)).subscribe((parcelas) => this.parcelas = parcelas);
  }
}
