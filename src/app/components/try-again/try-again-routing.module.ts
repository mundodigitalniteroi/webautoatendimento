import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TryAgainPage } from './try-again.page';

const routes: Routes = [
  {
    path: '',
    component: TryAgainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TryAgainPageRoutingModule {}
