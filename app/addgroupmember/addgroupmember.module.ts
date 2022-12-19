import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddgroupmemberPageRoutingModule } from './addgroupmember-routing.module';

import { AddgroupmemberPage } from './addgroupmember.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddgroupmemberPageRoutingModule
  ],
  declarations: [AddgroupmemberPage]
})
export class AddgroupmemberPageModule {}
