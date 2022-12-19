import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ComponentsModule} from '../../components/components.module';
import { TextHightModule } from "../text-hight/text-hight.module";

import { IonicModule } from '@ionic/angular';

import { GroupchatPageRoutingModule } from './groupchat-routing.module';

import { GroupchatPage } from './groupchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,TextHightModule,
    GroupchatPageRoutingModule,
    ComponentsModule
  ],
  declarations: [GroupchatPage]
})
export class GroupchatPageModule {}
