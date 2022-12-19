import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrouplistPage } from './grouplist.page';

const routes: Routes = [
  {
    path: '',
    component: GrouplistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrouplistPageRoutingModule {}
