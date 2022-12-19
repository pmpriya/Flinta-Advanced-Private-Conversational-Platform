import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewerModalPage } from './viewer-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewerModalPageRoutingModule {}
