import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyshelfPage } from './myshelf.page';

const routes: Routes = [
  {
    path: '',
    component: MyshelfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyshelfPageRoutingModule {}
