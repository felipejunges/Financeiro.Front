import { Component, OnInit } from '@angular/core';
import { Contrato } from 'src/app/interfaces/Contrato';
import { Parcela } from 'src/app/interfaces/Parcela';
import { ContratoService } from 'src/app/services/contratos/contrato.service';
import { ParcelasService } from 'src/app/services/parcelas/parcelas.service';

@Component({
  selector: 'app-parcelas',
  templateUrl: './parcelas.component.html',
  styleUrls: ['./parcelas.component.css']
})
export class ParcelasComponent implements OnInit {

  contratos: Contrato[] = [];
  parcelas: Parcela[] = [];

  constructor(private service: ParcelasService, private contratoService: ContratoService) { }

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

  listarParcelas(contratoId: string) {
    this.service.listarParcelas(Number(contratoId)).subscribe((parcelas) => this.parcelas = parcelas);
  }
}
