import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarEmpleadoPage } from './agregar-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarEmpleadoPageRoutingModule {}
