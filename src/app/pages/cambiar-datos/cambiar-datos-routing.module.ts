import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarDatosPage } from './cambiar-datos.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarDatosPageRoutingModule {}
