import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupcreationPageRoutingModule } from './groupcreation-routing.module';
import { GroupcreationPage } from './groupcreation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupcreationPageRoutingModule
  ],
  declarations: [GroupcreationPage]
})
export class GroupcreationPageModule {}
