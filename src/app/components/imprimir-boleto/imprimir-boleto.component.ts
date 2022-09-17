import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-imprimir-boleto',
  templateUrl: './imprimir-boleto.component.html',
  styleUrls: ['./imprimir-boleto.component.css']
})
export class ImprimirBoletoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  id: number = Number(this.route.snapshot.paramMap.get("id"));
  url: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:5000/api/Parcelas/${this.id}/obter-boleto`);

  ngOnInit(): void {
  }

}
