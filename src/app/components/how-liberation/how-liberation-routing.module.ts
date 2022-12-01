import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowLiberationPage } from './how-liberation.page';



const routes: Routes = [
  {
    path: '',
    component: HowLiberationPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowLiberationRoutingModule {}
