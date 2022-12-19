import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuddychatRoomPage } from './buddychat-room.page';

const routes: Routes = [
  {
    path: '',
    component: BuddychatRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuddychatRoomPageRoutingModule {}
