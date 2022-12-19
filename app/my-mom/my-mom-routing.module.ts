import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMomPage } from './my-mom.page';

const routes: Routes = [
  {
    path: '',
    component: MyMomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMomPageRoutingModule {}
