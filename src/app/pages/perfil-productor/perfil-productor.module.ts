import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilProductorPageRoutingModule } from './perfil-productor-routing.module';

import { PerfilProductorPage } from './perfil-productor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilProductorPageRoutingModule
  ],
  declarations: [PerfilProductorPage]
})
export class PerfilProductorPageModule {}
