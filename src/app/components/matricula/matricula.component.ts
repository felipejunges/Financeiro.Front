import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    { uf: 'RS', nome: 'Rio Grande do Sul' }
  ];

  constructor(private service: MatriculaApiService) { }

  ngOnInit(): void {
    this.postagemForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required, GenericValidators.isValidCpf()]),
      identidade: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d{2}$/)]),
      telefone: new FormControl('', [Validators.required, Validators.pattern(/^\([0-9]{2}\)\s?[0-9]{5}(-?)[0-9]{4}$/)]),
      logradouro: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      cidade: new FormControl('', [Validators.required]),
      estado: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{5}(-)[0-9]{3}$/)])
    });
  }

  campoInvalido(campo: string) {
    return this.postagemForm.controls[campo].invalid && (this.postagemForm.controls[campo].dirty || this.postagemForm.controls[campo].touched);
  }

  obterValorCampo(campo: string): string {
    return this.postagemForm.controls[campo].value;
  }

  // get nome() {
  //   return this.postagemForm.get('nome')!;
  // }

  teste(e:Event)
  {
    console.log(e);
  }

  submit() {
    if (this.postagemForm.invalid)
      return;

    this.postagemForm.controls['cpf'].setErrors({ 'teste': true });

    this.service.incluir({
      email: this.obterValorCampo('email'),
      senha: '',
      nome: this.obterValorCampo('nome'),
      cpf: this.obterValorCampo('cpf'),
      identidade: this.obterValorCampo('identidade'),
      dataNascimento: this.obterValorCampo('dataNascimento'),
      telefone: this.obterValorCampo('telefone')
    }).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

}
