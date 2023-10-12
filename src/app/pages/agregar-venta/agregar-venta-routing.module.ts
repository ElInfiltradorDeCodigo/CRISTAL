import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarVentaPage } from './agregar-venta.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarVentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarVentaPageRoutingModule {}
