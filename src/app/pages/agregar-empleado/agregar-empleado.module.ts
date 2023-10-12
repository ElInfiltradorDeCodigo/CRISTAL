import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarEmpleadoPageRoutingModule } from './agregar-empleado-routing.module';

import { AgregarEmpleadoPage } from './agregar-empleado.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarEmpleadoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarEmpleadoPage]
})
export class AgregarEmpleadoPageModule {}
