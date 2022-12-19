import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebchatPageRoutingModule } from './webchat-routing.module';

import { WebchatPage } from './webchat.page';
// import {RecentChatPage} from '../recent-chat/recent-chat.page';
// import {BuddychatRoomPage} from '../buddychat-room/buddychat-room.page'
import { TextHightModule } from "../text-hight/text-hight.module";
import { AssigntaskPageModule } from '../assigntask/assigntask.module';
// import {ContactsPage} from '../contacts/contacts.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {ComponentsModule} from '../../components/components.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ContactlistPageModule } from '../contactlist/contactlist.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebchatPageRoutingModule,
    TextHightModule,
    AssigntaskPageModule,
    Ng2SearchPipeModule,
    ComponentsModule,
    ContactlistPageModule,
    NgCalendarModule
  ],
  declarations: [WebchatPage]
})
export class WebchatPageModule {}
