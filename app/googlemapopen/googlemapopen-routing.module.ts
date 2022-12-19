import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GooglemapopenPage } from './googlemapopen.page';

const routes: Routes = [
  {
    path: '',
    component: GooglemapopenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GooglemapopenPageRoutingModule {}
