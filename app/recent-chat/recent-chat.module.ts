import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentChatPageRoutingModule } from './recent-chat-routing.module';

import { RecentChatPage } from './recent-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentChatPageRoutingModule
  ],
  declarations: [RecentChatPage]
})
export class RecentChatPageModule {}
