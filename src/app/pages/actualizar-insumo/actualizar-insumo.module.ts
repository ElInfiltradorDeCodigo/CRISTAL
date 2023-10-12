import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarInsumoPageRoutingModule } from './actualizar-insumo-routing.module';

import { ActualizarInsumoPage } from './actualizar-insumo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarInsumoPageRoutingModule
  ],
  declarations: [ActualizarInsumoPage]
})
export class ActualizarInsumoPageModule {}
