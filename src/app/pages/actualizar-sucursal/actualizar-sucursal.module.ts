import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarSucursalPageRoutingModule } from './actualizar-sucursal-routing.module';

import { ActualizarSucursalPage } from './actualizar-sucursal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarSucursalPageRoutingModule
  ],
  declarations: [ActualizarSucursalPage]
})
export class ActualizarSucursalPageModule {}
