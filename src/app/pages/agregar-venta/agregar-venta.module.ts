import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarVentaPageRoutingModule } from './agregar-venta-routing.module';
import { AgregarVentaPage } from './agregar-venta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarVentaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarVentaPage]
})
export class AgregarVentaPageModule {}
