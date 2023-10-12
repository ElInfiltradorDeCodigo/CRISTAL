import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgregarProductorPageRoutingModule } from './agregar-productor-routing.module';
import { AgregarProductorPage } from './agregar-productor.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarProductorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarProductorPage]
})
export class AgregarProductorPageModule {}
