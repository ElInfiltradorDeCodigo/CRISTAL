import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarEmpleadoPageRoutingModule } from './actualizar-empleado-routing.module';

import { ActualizarEmpleadoPage } from './actualizar-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarEmpleadoPageRoutingModule
  ],
  declarations: [ActualizarEmpleadoPage]
})
export class ActualizarEmpleadoPageModule {}
