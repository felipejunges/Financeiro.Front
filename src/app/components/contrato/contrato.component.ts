import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatriculaApiService } from 'src/app/services/matricula/matricula.api.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit {

  constructor(private service: MatriculaApiService, private route: ActivatedRoute) { }

  id: number = Number(this.route.snapshot.paramMap.get("id"));
  teste: string = "teste";

  ngOnInit(): void {
    // this.service.obterContrato(this.id).subscribe((retorno: any) => {
    //   this.teste = retorno;
    // });
  }

}
