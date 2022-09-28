import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ParcelasService } from 'src/app/services/parcelas/parcelas.service';

@Component({
  selector: 'app-imprimir-boleto',
  templateUrl: './imprimir-boleto.component.html',
  styleUrls: ['./imprimir-boleto.component.css']
})
export class ImprimirBoletoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ParcelasService, private sanitizer: DomSanitizer) { }

  base64Pdf: string = "";

  ngOnInit(): void {
    var parcelaId: number = Number(this.route.snapshot.paramMap.get("id"));

    this.service.obterBoleto(parcelaId).subscribe((retorno: string) => {
      this.base64Pdf = `data:application/pdf;base64,${retorno}`;
    });
  }

  sanitize(valor: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(valor);
  }

}
