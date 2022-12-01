import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacialRecognitionPage } from './facial-recognition.page';


const routes: Routes = [
  {
    path: '',
    component: FacialRecognitionPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacialRecognitionRoutingModule {}
