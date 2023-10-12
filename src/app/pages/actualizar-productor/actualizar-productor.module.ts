import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarProductorPageRoutingModule } from './actualizar-productor-routing.module';

import { ActualizarProductorPage } from './actualizar-productor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarProductorPageRoutingModule
  ],
  declarations: [ActualizarProductorPage]
})
export class ActualizarProductorPageModule {}
