import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePage,
  // }
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'recent',
        loadChildren: () => import('../recent-chat/recent-chat.module').then(m => m.RecentChatPageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../contacts/contacts.module').then(m => m.ContactsPageModule)
      },
      {
        path: 'room',
        loadChildren: () => import('../rooms/rooms.module').then(m => m.RoomsPageModule)
      },
      {
        path: '',
        redirectTo: '/home/recent',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/home/recent',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
