import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermAcceptionPage } from './term-acception.page';

const routes: Routes = [
  {
    path: '',
    component: TermAcceptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermAcceptionPageRoutingModule {}
