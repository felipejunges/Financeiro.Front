import { Component, OnInit } from '@angular/core';
import { Parcela } from 'src/app/interfaces/Parcela';
import { ParcelasService } from 'src/app/services/parcelas/parcelas.service';

@Component({
  selector: 'app-parcelas',
  templateUrl: './parcelas.component.html',
  styleUrls: ['./parcelas.component.css']
})
export class ParcelasComponent implements OnInit {

  parcelas: Parcela[] = [];

  constructor(private service: ParcelasService) { }

  ngOnInit(): void {
    this.listarParcelas();
  }

  listarParcelas() {
    this.service.listarParcelas(1).subscribe((parcelas) => this.parcelas = parcelas);
  }
}
