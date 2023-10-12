import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarVentaPageRoutingModule } from './actualizar-venta-routing.module';

import { ActualizarVentaPage } from './actualizar-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarVentaPageRoutingModule
  ],
  declarations: [ActualizarVentaPage]
})
export class ActualizarVentaPageModule {}
