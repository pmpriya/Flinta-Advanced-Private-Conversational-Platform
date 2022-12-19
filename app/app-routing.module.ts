import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: 'recent',
    loadChildren: () => import('./recent-chat/recent-chat.module').then(m => m.RecentChatPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  // {
  //   path: 'buddychat-room',
  //   loadChildren: () => import('./buddychat-room/buddychat-room.module').then( m => m.BuddychatRoomPageModule)
  // },
  {
    path: 'assigntask',
    loadChildren: () => import('./assigntask/assigntask.module').then( m => m.AssigntaskPageModule)
  },
  {
    path: 'mycalendar',
    loadChildren: () => import('./mycalendar/mycalendar.module').then( m => m.MycalendarPageModule)
  },
  {
    path: 'contactlist',
    loadChildren: () => import('./contactlist/contactlist.module').then( m => m.ContactlistPageModule)
  },
  {
    path: 'googlelocation',
    loadChildren: () => import('./googlelocation/googlelocation.module').then( m => m.GooglelocationPageModule)
  },
  {
    path: 'groupcreation',
    loadChildren: () => import('./groupcreation/groupcreation.module').then( m => m.GroupcreationPageModule)
  },
  // {
  //   path: 'groupchat',
  //   loadChildren: () => import('./groupchat/groupchat.module').then( m => m.GroupchatPageModule)
  // },
  {
    path: 'groupmember',
    loadChildren: () => import('./groupmember/groupmember.module').then( m => m.GroupmemberPageModule)
  },
  {
    path: 'addgroupmember',
    loadChildren: () => import('./addgroupmember/addgroupmember.module').then( m => m.AddgroupmemberPageModule)
  },
  {
    path: 'file-filter',
    loadChildren: () => import('./file-filter/file-filter.module').then( m => m.FileFilterPageModule)
  },
  {
    path: 'search-filter',
    loadChildren: () => import('./search-filter/search-filter.module').then( m => m.SearchFilterPageModule)
  },
  {
    path: 'mytask',
    loadChildren: () => import('./mytask/mytask.module').then( m => m.MytaskPageModule)
  },
  {
    path: 'myshelf',
    loadChildren: () => import('./myshelf/myshelf.module').then( m => m.MyshelfPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then( m => m.MyprofilePageModule)
  },
  {
    path: 'my-mom',
    loadChildren: () => import('./my-mom/my-mom.module').then( m => m.MyMomPageModule)
  },
  {
    path: 'grouplist',
    loadChildren: () => import('./grouplist/grouplist.module').then( m => m.GrouplistPageModule)
  },
  {
    path: 'project-milestone',
    loadChildren: () => import('./project-milestone/project-milestone.module').then( m => m.ProjectMilestonePageModule)
  },
  {
    path: 'upcoming-events',
    loadChildren: () => import('./upcoming-events/upcoming-events.module').then( m => m.UpcomingEventsPageModule)
  },
  // {
  //   path: 'syn',
  //   loadChildren: () => import('./syn/syn.module').then( m => m.SynPageModule)
  // },
  {
    path: 'video',
    loadChildren: () => import('./video/video.module').then( m => m.VideoPageModule)
  },
  {
    path: 'videocall',
    loadChildren: () => import('./videocall/videocall.module').then( m => m.VideocallPageModule)
  },
  {
    path: 'changepwd',
    loadChildren: () => import('./changepwd/changepwd.module').then( m => m.ChangepwdPageModule)
  },
  {
    path: 'zoom',
    loadChildren: () => import('./zoom/zoom.module').then( m => m.ZoomPageModule)
  },
  {
    path: 'webchat',
    loadChildren: () => import('./webchat/webchat.module').then( m => m.WebchatPageModule)
  },
  {
    path: 'takephoto',
    loadChildren: () => import('./takephoto/takephoto.module').then( m => m.TakephotoPageModule)
  },
  {
    path: 'cropphoto',
    loadChildren: () => import('./cropphoto/cropphoto.module').then( m => m.CropphotoPageModule)
  },
  {
    path: 'multipleimageupload',
    loadChildren: () => import('./multipleimageupload/multipleimageupload.module').then( m => m.MultipleimageuploadPageModule)
  },
  {
    path: 'viewphoto',
    loadChildren: () => import('./viewphoto/viewphoto.module').then( m => m.ViewphotoPageModule)
  },
  {
    path: 'viewer-modal',
    loadChildren: () => import('./viewer-modal/viewer-modal.module').then( m => m.ViewerModalPageModule)
  },

  // {
  //   path: 'googlemapopen',
  //   loadChildren: () => import('./googlemapopen/googlemapopen.module').then( m => m.GooglemapopenPageModule)
  // },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
