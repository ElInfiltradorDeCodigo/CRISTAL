import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarProductorPage } from './actualizar-productor.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarProductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarProductorPageRoutingModule {}
