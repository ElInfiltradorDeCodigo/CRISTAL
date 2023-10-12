import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarInsumoPageRoutingModule } from './agregar-insumo-routing.module';
import { AgregarInsumoPage } from './agregar-insumo.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarInsumoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarInsumoPage]
})
export class AgregarInsumoPageModule {}
