import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebchatPage } from './webchat.page';

const routes: Routes = [
  {
    path: '',
    component: WebchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebchatPageRoutingModule {}
