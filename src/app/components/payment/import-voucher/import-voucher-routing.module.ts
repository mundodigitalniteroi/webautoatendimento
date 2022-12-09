import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportVoucherPage } from './import-voucher.page';



const routes: Routes = [
  {
    path: '',
    component: ImportVoucherPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportVoucherRoutingModule {}
