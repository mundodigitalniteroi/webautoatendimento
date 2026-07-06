import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotoFacialPage } from './foto-facial.page';


const routes: Routes = [
  {
    path: '',
    component: FotoFacialPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotoFacialRoutingModule {}
