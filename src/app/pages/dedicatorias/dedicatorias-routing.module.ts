import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DedicatoriasPage } from './dedicatorias.page';

const routes: Routes = [
  {
    path: '',
    component: DedicatoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DedicatoriasPageRoutingModule {}
