import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarAdeudoPageRoutingModule } from './actualizar-adeudo-routing.module';

import { ActualizarAdeudoPage } from './actualizar-adeudo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarAdeudoPageRoutingModule
  ],
  declarations: [ActualizarAdeudoPage]
})
export class ActualizarAdeudoPageModule {}
