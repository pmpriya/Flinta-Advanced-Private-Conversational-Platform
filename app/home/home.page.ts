import { Component, ViewChild } from '@angular/core';
import { PopoverController, Platform, NavController, IonTabs } from '@ionic/angular';
import { RecentchatMenuComponent } from '../recentchat-menu/recentchat-menu.component';
import { ApiserviceService } from '../apiservice.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { LoginProvider } from "../../providers/ServerDb/loginprovider";
import { Router } from '@angular/router';
import { AuthenticationService } from '././../services/Authentication.service';
import { ThemeSwitcherService } from '../theme-switcher.service';
import { NetworkService } from "../network.service";

import { ContactsPage } from "../contacts/contacts.page";
import { RecentChatPage } from "../recent-chat/recent-chat.page";
import { RoomsPage } from "../rooms/rooms.page";
import { SwipeTabDirective } from '../directives/swipe-tab.directive';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('myTabs') tabRef: IonTabs;

  @ViewChild(SwipeTabDirective) swipeTabDirective: SwipeTabDirective;

  recentPage: any = RecentChatPage;
  contactsPage: any = ContactsPage;
  roomPage: any = RoomsPage;

  @ViewChild('tabs', { static: true }) tabs: IonTabs;
  username: any = localStorage.getItem('name');
  profileImg: any;
  designation: any = localStorage.getItem('designation');
  myeventres: any;

  private activeTab?: HTMLElement;
  colorCode: any;
  colorCodeBottom: any;
  colorCodeConetnt: any;
  swipeTabColor:any;
  swipeTabColorTxt:any;
  themeselect: any = false;
  opts = {
    icon: false,
    label: true,
    toolbarPos: 'top',
    scrollable: true,
  };


  ionTabsDidChange($event) {
    console.log('[TabsPage] ionTabsDidChange, $event: ', $event);
    this.swipeTabDirective.onTabInitialized($event.tab);
  }

  onTabChange($event) {
    console.log('[TabsPage] onTabChange, $event: ', $event);
    this.tabRef.select($event);
  }

  constructor(private networkService: NetworkService, private authService: AuthenticationService, private router: Router, private navCtrl: NavController, private LoginProvider: LoginProvider, private platform: Platform, public sanitizer: DomSanitizer, public popoverController: PopoverController, private service: ApiserviceService, public themeSwitcher: ThemeSwitcherService) {
    // this.themeSwitcher.setTheme('day');

   
    if (this.networkService.CurrentStatus == true) {
      console.log("this.networkService.CurrentStatus :" + this.networkService.CurrentStatus + ":" + localStorage.getItem('photourl'))
      this.profileImg = localStorage.getItem('photourl');

    }
    else {
      this.profileImg = "default";

    }
    // if(localStorage.getItem('theme')=='day'){
    //   this.themeSwitcher.setTheme('day');
    //   this.themeselect = false;
    // }
    // if(localStorage.getItem('theme')=='night'){
    //   this.themeSwitcher.setTheme('night');
    //   this.themeselect = true;
    // }

  
  }


  tabChange(tabsRef: IonTabs) {
    // this.activeTab = tabsRef.outlet.activatedView.element;
    // console.log("tabsRef :"+JSON.stringify(tabsRef))
  }

  // ionViewWillLeave() {
  //   this.propagateToActiveTab('ionViewWillLeave');
  // }

  // ionViewDidLeave() {
  //   this.propagateToActiveTab('ionViewDidLeave');
  // }

  // ionViewWillEnter() {
  //   // this.superTabs.selectTab(0);
  //   this.propagateToActiveTab('ionViewWillEnter');
  // }

  events() {
    this.navCtrl.navigateForward('/upcoming-events');
  }

  changetheme() {
    console.log(this.themeselect);
    if (this.themeselect == true) {
      this.themeSwitcher.setTheme('night');
      localStorage.setItem('theme', 'night');
    }
    if (this.themeselect == false) {
      this.themeSwitcher.setTheme('day');
      localStorage.setItem('theme', 'day');
    }

  }


  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }
  ionViewDidEnter() {

    // this.tabs.select('recent');
    this.propagateToActiveTab('ionViewDidEnter');

    console.log("ionViewDidEnter")
    
  }
  async menu() {
    const popover = await this.popoverController.create({
      component: RecentchatMenuComponent,
      cssClass: 'pop',
      // event: ev
    });
    return await popover.present();
  }

  milestone() {
    this.navCtrl.navigateForward('/project-milestone');
  }

  ngOnInit() {
  
    this.settheme();
  }
  settheme() {
    var d = Number(new Date().getHours());

    if (d >= 6 && d < 18) {
      // this.colorCode=this.themeSwitcher.DayColorCode
      this.colorCodeConetnt={'--ion-background-color':'white'}
      this.colorCode={'--background': this.themeSwitcher.DayColorCode}
      this.swipeTabColor={'background-color': 'white'}
      
      this.swipeTabColorTxt={'color': this.themeSwitcher.DayColorCode}


      // this.colorCode="#0c84b4 !important"
      console.log("day mode"+ this.colorCode);
      this.colorCodeBottom=this.themeSwitcher.DayColorCode
      this.themeSwitcher.setTheme('day');
      localStorage.setItem('theme', 'day');
    } else {
      this.swipeTabColor={'background-color': '#333333'}
      this.colorCode={'--background':'#333333'}
      this.colorCodeBottom="#333333"
      this.colorCodeConetnt={'--ion-background-color':'#333333'}
      this.swipeTabColorTxt={'color': 'white'}

      console.log("night mode:"+ this.colorCode);
      this.themeSwitcher.setTheme('night');
      localStorage.setItem('theme', 'night');
    }
  }
  profilePage() {
    this.navCtrl.navigateForward('myprofile', {

    })
  }
  getmyevents() {
    var data = {
      myno: localStorage.getItem('mobile')
    }
    this.service.PostRequest(this.service.mainAPI + '/getmyevents', data).then(res => {
      console.log(res);
      this.myeventres = res;


      for (let i = 0; i < this.myeventres.length; i++) {
        this.service.setremainder(this.myeventres[i].title, String(this.myeventres[i].starttime));
      }
    }, err => {
      console.log(err);
    })
  }



}
