import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PronosticosPageRoutingModule } from './pronosticos-routing.module';

import { PronosticosPage } from './pronosticos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PronosticosPageRoutingModule
  ],
  declarations: [PronosticosPage]
})
export class PronosticosPageModule {}
