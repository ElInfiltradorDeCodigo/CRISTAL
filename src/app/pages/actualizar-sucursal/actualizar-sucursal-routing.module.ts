import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarSucursalPage } from './actualizar-sucursal.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarSucursalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarSucursalPageRoutingModule {}
