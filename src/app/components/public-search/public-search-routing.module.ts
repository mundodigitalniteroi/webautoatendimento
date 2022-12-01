import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicSearchPage } from './public-search.page';

const routes: Routes = [
  {
    path: '',
    component: PublicSearchPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicSearchRoutingModule {}
