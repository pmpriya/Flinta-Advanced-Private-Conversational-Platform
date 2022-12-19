import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupmemberPageRoutingModule } from './groupmember-routing.module';

import { GroupmemberPage } from './groupmember.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupmemberPageRoutingModule
  ],
  declarations: [GroupmemberPage]
})
export class GroupmemberPageModule {}
