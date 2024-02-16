import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatriculaComponent } from './components/matricula/matricula.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ContratoComponent } from './components/contrato/contrato.component'

import { ParcelasComponent } from './components/parcelas/parcelas.component';
import { ImprimirBoletoComponent } from './components/imprimir-boleto/imprimir-boleto.component';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    MatriculaComponent,
    HomeComponent,
    LoginComponent,
    ContratoComponent,
    ParcelasComponent,
    ImprimirBoletoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
