import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PronosticosPage } from './pronosticos.page';

const routes: Routes = [
  {
    path: '',
    component: PronosticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PronosticosPageRoutingModule {}
