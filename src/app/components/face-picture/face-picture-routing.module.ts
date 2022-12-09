import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacePicturePage } from './face-picture.page';

const routes: Routes = [
  {
    path: '',
    component: FacePicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacePicturePageRoutingModule {}
