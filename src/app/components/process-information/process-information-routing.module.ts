import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessInformationPage } from './process-information.page';


const routes: Routes = [
  {
    path: '',
    component: ProcessInformationPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessInformationRoutingModule {}
