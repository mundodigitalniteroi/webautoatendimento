import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessInformationsPage } from './process-informations.page';


const routes: Routes = [
  {
    path: '',
    component: ProcessInformationsPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessInformationsRoutingModule {}
