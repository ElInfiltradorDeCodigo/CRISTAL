import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarAdeudoPage } from './actualizar-adeudo.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarAdeudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarAdeudoPageRoutingModule {}
