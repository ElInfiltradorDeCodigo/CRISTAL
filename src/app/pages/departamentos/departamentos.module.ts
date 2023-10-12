import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartamentosPageRoutingModule } from './departamentos-routing.module';

import { DepartamentosPage } from './departamentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartamentosPageRoutingModule
  ],
  declarations: [DepartamentosPage]
})
export class DepartamentosPageModule {}
