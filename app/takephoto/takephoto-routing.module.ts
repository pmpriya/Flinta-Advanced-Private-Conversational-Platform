import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakephotoPage } from './takephoto.page';

const routes: Routes = [
  {
    path: '',
    component: TakephotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakephotoPageRoutingModule {}
