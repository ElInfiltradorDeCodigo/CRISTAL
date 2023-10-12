import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarSucursalPageRoutingModule } from './agregar-sucursal-routing.module';

import { AgregarSucursalPage } from './agregar-sucursal.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarSucursalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarSucursalPage]
})
export class AgregarSucursalPageModule {}
