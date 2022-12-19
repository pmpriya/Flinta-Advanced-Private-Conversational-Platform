import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {ComponentsModule} from '../../components/components.module';

import { IonicModule } from '@ionic/angular';

import { BuddychatRoomPageRoutingModule } from './buddychat-room-routing.module';
import { TextHightModule } from "../text-hight/text-hight.module";
import { BuddychatRoomPage } from './buddychat-room.page';
// import {AutosizeModule} from 'ngx-autosize';
// import { LongPressModule } from 'ionic-long-press';
import { AssigntaskPageModule } from '../assigntask/assigntask.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextHightModule,
    BuddychatRoomPageRoutingModule,
     ComponentsModule,
    // AutosizeModule,
    // LongPressModule,
    AssigntaskPageModule,
  ],

  declarations: [BuddychatRoomPage],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA,
  //   NO_ERRORS_SCHEMA
  // ]
})
export class BuddychatRoomPageModule {}
