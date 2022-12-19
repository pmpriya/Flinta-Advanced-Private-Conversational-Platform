import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { NetworkService } from '../network.service';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Network } from '@ionic-native/network/ngx'
import { Socket } from 'ngx-socket-io';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts = [];
  mynumber: any;


  //filter contacts
  public status;
  public backgroundLive;
  public backgroundAll;
  public fontcolorlive;
  public fontcolorall

  public FilterValue = 0;
  colorCode: any;
  compid:any;
  constructor(public ThemeSwitcherService: ThemeSwitcherService, public photoViewer: PhotoViewer, public socket: Socket, public network: Network, public webview: WebView, public loadingCtrl: LoadingController, public sanitizer: DomSanitizer, public BuddyChatProvider: BuddyChatProvider,  public platform: Platform, public navCtrl: NavController, public service: ApiserviceService, public networkService: NetworkService,) {
    this.mynumber = localStorage.getItem('mobile');
    this.compid=localStorage.getItem('compid');
    this.colorCode = ThemeSwitcherService.DayColorCode;
    this.network.onConnect().subscribe(() => {
      this.onlinecontacts();
    })


    this.socket.on('profile_changes', (msg) => {
      console.log("profile_changes  :" + JSON.stringify(msg))
      this.onlinecontacts();
    })
  }

  ngOnInit() {

  }
  zoomImage(image) {
    this.photoViewer.show(image);
  }
  onCancel(event) {
    this.backgroundAll = this.ThemeSwitcherService.DayColorCode;
    this.backgroundLive = '#f8f8f8';
    this.fontcolorlive = 'black'
    this.fontcolorall = 'white';

    console.log('CANCEL', event);
    this.onlinecontacts();
  }
  //priya
  searchuser(searchbar) {
    //this.filteredusers = ;
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {

      this.contacts = [];
      this.status = "0";
      this.backgroundAll = this.ThemeSwitcherService.DayColorCode;
      this.backgroundLive = '#f8f8f8';
      this.fontcolorlive = 'black'
      this.fontcolorall = 'white';
      this.onlinecontacts();

      return;
    }

    this.contacts = this.contacts.filter((v) => {
      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.designation.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {

        return false;

      }


    })
  }
  ionViewDidEnter() {
    console.log(' contact ionViewDidEnter ')

    this.status = "0";
    this.backgroundAll = this.ThemeSwitcherService.DayColorCode;
    this.backgroundLive = '#f8f8f8';
    this.fontcolorlive = 'black'
    this.fontcolorall = 'white';

  }


  ionViewDidLoad() {
    console.log('contact ionViewDidLoad ')
  }

  ionViewWillLeave() {
    console.log('contact ionViewWillLeave  ')
  }
  ionViewDidLeave() {
    console.log('contact ionViewDidLeave   ')
  }
  ionViewWillUnload() {
    console.log('contact ionViewWillUnload    ')
  }

  ionViewWillEnter() {
    console.log("contacts ionViewWillEnter :" + this.networkService.CurrentStatus)

    this.onlinecontacts();

   
  }
  onlinecontacts() {
    console.log(" onlinecontacts 1 :" + this.contacts.length)

    // this.presentToast();
    var data={
      compid:this.compid
    }
      this.service.PostRequest(this.service.mainAPI + '/getUserMstComp',data).then(res => {
        if(res['status']!=0){
      console.log("onlinecontacts 2:" + res);

      this.contacts = [];
      var gettata: any;
      gettata = res;
      gettata.sort(function (a, b) {
        if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1; }
        if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1; }
        return 0;
      })


      gettata.forEach(element => {
        if (element.mobile != localStorage.getItem('FlintauserID') && element.userstatus == "A" && element.username != undefined && element.username != "" && element.username != "undefined") {
          this.contacts.push(element)
          console.log("this.contacts :" + this.contacts.length)
        }
      });
      this.loadingdismiss();
      if (this.platform.is('android')) {

        if (this.networkService.CurrentStatus == true) {
          // this.userdetails.insertRecords(this.contacts)

          this.contacts.sort(function (a, b) {
            if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1; }
            if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1; }
            return 0;
          })

          this.loadingdismiss();
        }

      }

      console.log(" onlinecontacts 3 :" + this.contacts.length)
    }
    }, err => {
      this.loadingdismiss();
      console.log(err);
      this.onlinecontacts();
      //this.loadingdismiss();
    })
  }

  chat(contact) {
    this.BuddyChatProvider.initializebuddy(contact)

    if (this.platform.is('android') || this.platform.is('ios')) {
      
    }
    else {

      this.navCtrl.navigateForward('buddychat-room', {
        queryParams: contact,
      })
    }

  }
  async presentToast() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',

      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',

    });
    return await loading.present();
  }
  async loadingdismiss() {
    return await this.loadingCtrl.dismiss();
  }

  filterContacts(val) {
    this.FilterValue = val;
    if (val == 1) {

      // this.onlinecontacts();

      this.status = "1";
      this.backgroundLive = '#4CAF50';
      this.backgroundAll = '#f8f8f8';
      this.fontcolorlive = 'white'
      this.fontcolorall = 'black';


      this.contacts = this.contacts.filter(function (number) {
        return number.status == "online";
      });

    } else {
      this.status = "0";
      // $scope.loadContacts();
      this.backgroundAll = this.ThemeSwitcherService.DayColorCode;
      this.backgroundLive = '#f8f8f8';
      this.fontcolorlive = 'black'
      this.fontcolorall = 'white';


   
        this.onlinecontacts();



    }
  }

}
