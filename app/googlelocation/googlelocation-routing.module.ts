import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GooglelocationPage } from './googlelocation.page';

const routes: Routes = [
  {
    path: '',
    component: GooglelocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GooglelocationPageRoutingModule {}
