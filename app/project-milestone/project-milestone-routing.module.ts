import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectMilestonePage } from './project-milestone.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectMilestonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectMilestonePageRoutingModule {}
