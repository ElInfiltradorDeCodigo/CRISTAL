import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAdeudoPage } from './detalle-adeudo.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAdeudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAdeudoPageRoutingModule {}
