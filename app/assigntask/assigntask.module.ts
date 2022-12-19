import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssigntaskPageRoutingModule } from './assigntask-routing.module';

import { AssigntaskPage } from './assigntask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssigntaskPageRoutingModule
  ],
  declarations: [AssigntaskPage]
})
export class AssigntaskPageModule {}
