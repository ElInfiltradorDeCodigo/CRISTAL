import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAdeudoPageRoutingModule } from './detalle-adeudo-routing.module';

import { DetalleAdeudoPage } from './detalle-adeudo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAdeudoPageRoutingModule
  ],
  declarations: [DetalleAdeudoPage]
})
export class DetalleAdeudoPageModule {}
