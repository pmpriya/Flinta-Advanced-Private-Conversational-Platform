import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileFilterPage } from './file-filter.page';

const routes: Routes = [
  {
    path: '',
    component: FileFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileFilterPageRoutingModule {}
