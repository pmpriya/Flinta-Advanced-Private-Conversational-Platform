import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectMilestonePageRoutingModule } from './project-milestone-routing.module';

import { ProjectMilestonePage } from './project-milestone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectMilestonePageRoutingModule
  ],
  declarations: [ProjectMilestonePage]
})
export class ProjectMilestonePageModule {}
