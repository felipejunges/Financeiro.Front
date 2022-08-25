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

  constructor(private service: MatriculaApiService) { }

  ngOnInit(): void {
    this.postagemForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required, GenericValidators.isValidCpf()])
    });
  }

  campoInvalido(campo: string) {
    return this.postagemForm.controls[campo].invalid && (this.postagemForm.controls[campo].dirty || this.postagemForm.controls[campo].touched);
  }

  // get nome() {
  //   return this.postagemForm.get('nome')!;
  // }

  submit() {
    if (this.postagemForm.invalid)
      return;

    // this.postagemForm.setErrors({
    //   cpf: 'teste'
    // });

    this.postagemForm.controls['cpf'].setErrors({'teste': true});

    // this.service.incluir({
    //   email: '',
    //   senha: '',
    //   nome: this.nome.value
    // }).subscribe({
    //   next: (v) => console.log(v),
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete')
    // });
  }

}
