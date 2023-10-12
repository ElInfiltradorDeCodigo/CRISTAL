import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartamentosPage } from './departamentos.page';

const routes: Routes = [
  {
    path: '',
    component: DepartamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentosPageRoutingModule {}
