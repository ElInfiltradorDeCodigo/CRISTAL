import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarDepartamentoPageRoutingModule } from './agregar-departamento-routing.module';
import { AgregarDepartamentoPage } from './agregar-departamento.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDepartamentoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarDepartamentoPage]
})
export class AgregarDepartamentoPageModule {}
