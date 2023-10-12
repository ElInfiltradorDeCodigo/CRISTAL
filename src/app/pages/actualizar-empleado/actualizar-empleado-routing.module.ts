import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarEmpleadoPage } from './actualizar-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarEmpleadoPageRoutingModule {}
