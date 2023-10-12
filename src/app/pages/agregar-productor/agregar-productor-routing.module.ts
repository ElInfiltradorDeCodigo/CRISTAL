import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarProductorPage } from './agregar-productor.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarProductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarProductorPageRoutingModule {}
