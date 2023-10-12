import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilProductorPage } from './perfil-productor.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilProductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilProductorPageRoutingModule {}
