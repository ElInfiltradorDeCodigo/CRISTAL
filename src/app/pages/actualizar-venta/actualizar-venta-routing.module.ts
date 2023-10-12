import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarVentaPage } from './actualizar-venta.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarVentaPageRoutingModule {}
