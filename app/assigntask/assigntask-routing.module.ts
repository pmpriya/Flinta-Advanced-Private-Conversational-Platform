import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssigntaskPage } from './assigntask.page';

const routes: Routes = [
  {
    path: '',
    component: AssigntaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssigntaskPageRoutingModule {}
