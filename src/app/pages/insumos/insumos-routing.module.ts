import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumosPage } from './insumos.page';

const routes: Routes = [
  {
    path: '',
    component: InsumosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosPageRoutingModule {}
