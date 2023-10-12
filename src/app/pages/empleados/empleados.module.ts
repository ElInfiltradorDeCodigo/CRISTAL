import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadosPageRoutingModule } from './empleados-routing.module';

import { EmpleadosPage } from './empleados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosPageRoutingModule
  ],
  declarations: [EmpleadosPage]
})
export class EmpleadosPageModule {}
