import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupcreationPage } from './groupcreation.page';

const routes: Routes = [
  {
    path: '',
    component: GroupcreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupcreationPageRoutingModule {}
