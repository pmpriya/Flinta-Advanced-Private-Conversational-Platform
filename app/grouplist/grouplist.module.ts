import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrouplistPageRoutingModule } from './grouplist-routing.module';

import { GrouplistPage } from './grouplist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrouplistPageRoutingModule
  ],
  declarations: [GrouplistPage]
})
export class GrouplistPageModule {}
