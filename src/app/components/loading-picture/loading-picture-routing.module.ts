import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingPicturePage } from './loading-picture.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingPicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingPicturePageRoutingModule {}
