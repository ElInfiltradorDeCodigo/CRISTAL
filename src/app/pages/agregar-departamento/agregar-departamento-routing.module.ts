import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDepartamentoPage } from './agregar-departamento.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDepartamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDepartamentoPageRoutingModule {}
