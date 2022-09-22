import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { MatriculaApiService } from 'src/app/services/matricula/matricula.api.service';
import { GenericValidators } from 'src/app/validators/generic.validators';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.css']
})
export class MatriculaComponent implements OnInit {

  postagemForm!: FormGroup;

  estados = [
    { uf: 'PR', nome: 'Paraná' },
    { uf: 'RS', nome: 'Rio Grande do Sul' },
    { uf: 'SC', nome: 'Santa Catarina' }
  ];

  opcoesParcelamento = [
    { parcelamento: '1', descricao: 'À vista' },
    { parcelamento: '6', descricao: '6x' },
    { parcelamento: '12', descricao: '12x' },
    { parcelamento: '18', descricao: '18x' },
    { parcelamento: '24', descricao: '24x' },
    { parcelamento: '30', descricao: '30x' },
    { parcelamento: '36', descricao: '36x' }
  ];

  primeiroVencimento: string = this.calcularPrimeiroVencimento().toLocaleDateString();

  constructor(private service: MatriculaApiService) { }

  ngOnInit(): void {
    this.postagemForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [Validators.required, GenericValidators.isValidCpf()]),
      identidade: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required, Validators.pattern(/^(19|20)\d{2}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/)]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\([0-9]{2}\)\s?[0-9]{5}(-?)[0-9]{4}$/)]),
      cursoId: new FormControl('1'),
      numeroParcelas: new FormControl('', [Validators.required]),
      endereco: new FormGroup({
        logradouro: new FormControl('', [Validators.required]),
        numero: new FormControl('', [Validators.required]),
        bairro: new FormControl('', [Validators.required]),
        complemento: new FormControl(''),
        municipio: new FormControl('', [Validators.required]),
        uf: new FormControl('', [Validators.required]),
        cep: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5}(-)[0-9]{3}$/)])
      })
    });
  }

  calcularPrimeiroVencimento():Date {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    return currentDate;
  }

  campoInvalido(campo: string) {
    let field = this.postagemForm.get(campo);

    if (!field)
      return false;

    return field.invalid && (field.dirty || field.touched);
  }

  campoGrupoInvalido(grupo: string, campo: string) {
    let field = this.postagemForm.get(grupo)?.get(campo);

    if (!field)
      return false;

      return field.invalid && (field.dirty || field.touched);
  }
  
  submit() {
    if (this.postagemForm.invalid)
      return;

    this.postagemForm.controls['cpf'].setErrors({ 'teste': true });

    this.service.incluir(this.postagemForm.value)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
  }
}
