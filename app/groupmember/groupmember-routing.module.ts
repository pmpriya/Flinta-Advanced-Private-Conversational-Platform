import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupmemberPage } from './groupmember.page';

const routes: Routes = [
  {
    path: '',
    component: GroupmemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupmemberPageRoutingModule {}
