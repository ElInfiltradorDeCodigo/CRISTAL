import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarInsumoPage } from './agregar-insumo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarInsumoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarInsumoPageRoutingModule {}
