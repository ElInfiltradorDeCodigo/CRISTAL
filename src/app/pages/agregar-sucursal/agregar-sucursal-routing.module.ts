import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarSucursalPage } from './agregar-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarSucursalPageRoutingModule {}
