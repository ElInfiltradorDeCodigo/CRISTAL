import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdeudosPage } from './adeudos.page';

const routes: Routes = [
  {
    path: '',
    component: AdeudosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdeudosPageRoutingModule {}
