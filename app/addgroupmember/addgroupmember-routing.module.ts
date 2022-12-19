import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddgroupmemberPage } from './addgroupmember.page';

const routes: Routes = [
  {
    path: '',
    component: AddgroupmemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddgroupmemberPageRoutingModule {}
