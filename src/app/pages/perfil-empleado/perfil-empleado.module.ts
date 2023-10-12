import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilEmpleadoPageRoutingModule } from './perfil-empleado-routing.module';

import { PerfilEmpleadoPage } from './perfil-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilEmpleadoPageRoutingModule
  ],
  declarations: [PerfilEmpleadoPage]
})
export class PerfilEmpleadoPageModule {}
