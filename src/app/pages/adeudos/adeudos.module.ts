import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdeudosPageRoutingModule } from './adeudos-routing.module';

import { AdeudosPage } from './adeudos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdeudosPageRoutingModule
  ],
  declarations: [AdeudosPage]
})
export class AdeudosPageModule {}
