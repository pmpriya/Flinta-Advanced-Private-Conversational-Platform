import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewphotoPage } from './viewphoto.page';

const routes: Routes = [
  {
    path: '',
    component: ViewphotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewphotoPageRoutingModule {}
