import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoomPage } from './zoom.page';

const routes: Routes = [
  {
    path: '',
    component: ZoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZoomPageRoutingModule {}
