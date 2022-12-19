import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CropphotoPage } from './cropphoto.page';

const routes: Routes = [
  {
    path: '',
    component: CropphotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CropphotoPageRoutingModule {}
