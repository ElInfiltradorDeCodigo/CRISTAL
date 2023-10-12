import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarDatosPageRoutingModule } from './cambiar-datos-routing.module';

import { CambiarDatosPage } from './cambiar-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarDatosPageRoutingModule
  ],
  declarations: [CambiarDatosPage]
})
export class CambiarDatosPageModule {}
