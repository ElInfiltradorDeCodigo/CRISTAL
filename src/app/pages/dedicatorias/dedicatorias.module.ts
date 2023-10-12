import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DedicatoriasPageRoutingModule } from './dedicatorias-routing.module';

import { DedicatoriasPage } from './dedicatorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DedicatoriasPageRoutingModule
  ],
  declarations: [DedicatoriasPage]
})
export class DedicatoriasPageModule {}
