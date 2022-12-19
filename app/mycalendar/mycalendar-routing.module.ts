import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycalendarPage } from './mycalendar.page';

const routes: Routes = [
  {
    path: '',
    component: MycalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MycalendarPageRoutingModule {}
