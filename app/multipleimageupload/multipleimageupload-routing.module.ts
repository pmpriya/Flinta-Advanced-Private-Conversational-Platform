import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultipleimageuploadPage } from './multipleimageupload.page';

const routes: Routes = [
  {
    path: '',
    component: MultipleimageuploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultipleimageuploadPageRoutingModule {}
