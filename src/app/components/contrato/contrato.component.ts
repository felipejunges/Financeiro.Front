import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl, SafeValue } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContratoApiService } from 'src/app/services/contratos/contrato-api.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  constructor(private service: ContratoApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  termosAceitos: boolean = false;
  erroTermo: boolean = false;
  base64Pdf: string = "";

  ngOnInit(): void {

    var contratoId: number = Number(this.route.snapshot.paramMap.get("id"));

    this.service.obterTermosContrato(contratoId).subscribe((retorno: string) => {
      this.base64Pdf = `data:application/pdf;base64,${retorno}`;
    });
  }

  sanitize(valor: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(valor);
  }

  onCheckboxChange(e: any) {
    this.termosAceitos = e.target.checked;
  }

  enviarContrato() {
    this.erroTermo = false;

    if (!this.termosAceitos) {
      this.erroTermo = true;
      return;
    }

    var contratoId: number = Number(this.route.snapshot.paramMap.get("id"));
    
    this.service.aceitarTermosContrato(contratoId).subscribe();
  }

}
