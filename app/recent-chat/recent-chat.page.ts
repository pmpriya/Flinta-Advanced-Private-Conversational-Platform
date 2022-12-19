import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Network } from '@ionic-native/network/ngx'
import { NavController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { UserProvider } from "../../providers/user/user";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { BuddyRecentDBProvider } from "../../providers/ServerDb/buddyRecentDB";
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { GruopProvider } from "../../providers/ServerDb/group";
import { Socket } from 'ngx-socket-io';
import { AuthenticationService } from '././../services/Authentication.service';
import { NetworkService } from "../network.service";
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-recent-chat',
  templateUrl: './recent-chat.page.html',
  styleUrls: ['./recent-chat.page.scss'],
})
export class RecentChatPage implements OnInit {
  myrequests: any;
  myfriends;
  Tempmdata: any;
  allmygroups = [];
  opengrps = [];
  pageActive: boolean = false;
  
  colorCode:any;
  constructor(private ThemeSwitcherService:ThemeSwitcherService, private photoViewer:PhotoViewer,private nativeAudio: NativeAudio,  private networkProvider: NetworkService, private network: Network,  private authService: AuthenticationService, private socket: Socket, private ApiserviceService: ApiserviceService,  private GruopProvider: GruopProvider, private BuddyChatProvider: BuddyChatProvider, private BuddyRecentDBProvider: BuddyRecentDBProvider, public sanitizer: DomSanitizer,  private platform: Platform, private loadingCtrl: LoadingController, public navCtrl: NavController,
    public alertCtrl: AlertController) {
    
    this.pageActive = true;
    this.colorCode=this.ThemeSwitcherService.DayColorCode;
    this.receiveRecentChat();

    console.log("constructor")

    this.network.onConnect().subscribe(() => {
      this.onlinedata();
    })
  }
  zoomImage(image){
    console.log("zoomImage :"+image)
    this.photoViewer.show(image);
  }

  ngOnInit() {
    this.pageActive = true;
    
    
    this.nativeAudio.preloadSimple('receive', 'assets/mp3/receive.wav').then(res => {
    })
    console.log("ngOnInit")
    this.myfriends = []
    this.socket.connect();
    
  }

  receiveRecentChat() {
    this.socket.on('profile_changes', (msg) => {
      console.log("profile_changes")
      this.dataLoad();
    })
    this.socket.on('recentmessgae', (msg) => {
      console.log("recentmessgae 1:"+JSON.stringify(msg))
      if (msg.uid == localStorage.getItem("FlintauserID") && msg.backclick != null) {
        this.dataLoad();
      }
      else if (msg.uid == localStorage.getItem("FlintauserID")) {
        this.dataLoad();
        console.log("recentmessgae 2")

        console.log("receiveRecentChat recive :" + JSON.stringify(msg))
        if (this.pageActive == true) {
          if (msg.message != null && msg.sender != localStorage.getItem("FlintauserID") && (msg.buddyid == localStorage.getItem("FlintauserID") || msg.sentby == localStorage.getItem("FlintauserID"))) {
            console.log("receiveRecentChat audio")

            this.nativeAudio.play('receive', () => console.log('sent is done playing'));
          }
          else if (msg.groupkey != null && msg.sender != localStorage.getItem("FlintauserID")) {
            this.nativeAudio.play('receive', () => console.log('sent is done playing'));
          }

        }


     
          console.log("recentmessgae 3")

          this.BuddyRecentDBProvider.getrecentdb(localStorage.getItem("FlintauserID").toString()).then((data) => {
            
            if (data["flag"] == null) {
              this.Tempmdata = data;
              console.log("recent ionViewDidEnter 2:" + JSON.stringify(data))
              
              this.setRecentItem(this.Tempmdata);
              this.authService.loginFLow == true;
            }

          });

      }

    })

  }
  setRecentItem(Tempmyfriends) {
    console.log(Tempmyfriends);
    this.myfriends = [];
    Tempmyfriends.forEach(element => {

      var getdata = new Date(parseInt(element.timestamp));
      var today = new Date();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      var mesage = null, dateTime = "", Msgcount = undefined, username = null, chatType = "1", buddyimage = undefined;

      if (this.convertDateFormat(getdata) == this.convertDateFormat(today)) {
        dateTime = "";
      }
      else {
        dateTime = this.convertDateFormat(getdata);
      }

      if (element.groupkey != undefined && element.groupkey != "undefined" && element.groupkey != null && element.groupkey != "null") {
        username = element.groupname;

        chatType = "2";
        if (element.buddyimage == "undefined") {
          element.buddyimage = "default";
        }
        mesage ="<b>"+ element.groupsendername + ":</b>" + element.message;
      }
      else {
        chatType = "1"
        mesage = element.message;
        username = element.username;
      }


      if (element.UnreadMsg != 0) {
        Msgcount = element.UnreadMsg;
      }
      console.log("first add:" + element.groupkey + ":" + username)
      

      
      
      this.myfriends.push({
        buddyid: element.buddyid,
        mobile: element.buddyid,
        username: username,
        buddyimage: element.buddyimage,
        status: element.status,
        uid: element.uid,
        date: element.Filedate,
        message: mesage,
        fileType: element.filetype,
        timestamp: element.timestamp,
        dateString: dateTime,
        count: element.messagecount,
        fileExtension: element.fileextension,
        groupKey: element.groupkey,
        openGroup: element.opengroup,
        chatType: chatType,
        "sentby": element.sentby,
        "sentto": element.sentto,
        Filedate: element.Filedate,
        UnreadMsg: element.UnreadMsg,
        groupName: element.groupname,

      });

      console.log(this.myfriends)
      let obj = {};

      const unique = () => {
        let result = [];

        this.myfriends.forEach((item, i) => {
          obj[item['username']] = i;
        });

        for (let key in obj) {
          let index = obj[key];
          result.push(this.myfriends[index])
        }

        return result;
      }
      this.myfriends = unique();

      this.myfriends.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });
      

    });

  }


  ionViewDidEnter() {
    

    console.log("ionViewDidEnter 1:" + this.authService.loginFLow)

    
    this.BuddyRecentDBProvider.recentList = [];

    this.dataLoad();

  }
  dataLoad() {
    if (this.platform.is('android')) {
      if (this.networkProvider.CurrentStatus == false) {
        console.log("recent ionViewDidEnter 2")

        
        
        

        
        
        
        
        
        
      }
      else {
        this.onlinedata();
      }
    }

    else {
      this.onlinedata();
    }
  }
  onlinedata() {
    console.log("onlinedata")
    
    this.BuddyRecentDBProvider.getrecentdb(localStorage.getItem("FlintauserID").toString()).then((data) => {
      
      console.log("data :" + JSON.stringify(data))

      if (data["flag"] == null) {

        this.Tempmdata = data;

        if (this.platform.is('android')) {
          
          
          

          this.Tempmdata.forEach(element => {
            
            
            
            
            
            
            
            
            

            
          });
        }

        if (this.Tempmdata.length != 0) {
          this.myfriends = [];
          this.setRecentItem(this.Tempmdata);
        }

      }





      
      this.authService.loginFLow == true;
    }, err => {
      console.log(err);
      
    })
  }

  convertDateFormat(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    return (dd + "/" + mm + "/" + yyyy);

  }


  ionViewDidLoad1() {


  }


  convertDate(date) {
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'agu', 'sep', 'oct', 'nov', 'dec'];
    var day = date.getDate();
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    return day + "-" + month + "-" + year;
  }


  
  convertToDataURLviaCanvas(url, outputFormat) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        resolve(dataURL);
        canvas = null;
      };
      img.src = url;
    });
  }

  ionViewWillLeave() {

    
    this.pageActive = false;
  }
  ionViewDidLeave() {
    this.pageActive = false;
    
  }

  
  buddychat(buddy) {

    if (buddy.chatType == "1") {

      var buddyinfo = {
        "username": buddy.username,
        "mobile": buddy.mobile,
        "photourl": buddy.buddyimage,
      }
      console.log("buddychat :" + JSON.stringify(buddy) + ":" + JSON.stringify(buddyinfo))

      this.BuddyChatProvider.initializebuddy(buddyinfo);
      if (this.platform.is('android') || this.platform.is('ios')) {
        console.log("andorid")
        
        


        
        
        
        
      }
      else {
        this.BuddyChatProvider.buddy = buddyinfo;
        this.navCtrl.navigateForward('buddychat-room', {
          queryParams: buddyinfo,
        })
      }


      
      
    }
    else {

      this.GruopProvider.currentgroupname = buddy.username;
      this.GruopProvider.currentgroupProfileImage = buddy.buddyimage;
      this.GruopProvider.getintogroup(buddy.groupKey, buddy.username, buddy.buddyimage, buddy.openGroup);

      var obj =
      {
        groupimage: buddy.buddyimage,
        groupkey: buddy.groupKey,
        groupname: buddy.groupName,
        opengroup: buddy.openGroup,
      }
      this.GruopProvider.initializegroup(obj);
      if (this.platform.is('android')) {
        console.log("platform");
        
        
        
        
        
      }
      else {
        this.navCtrl.navigateForward('groupchat', {
          queryParams: obj,
        })
      }
    }

  }


  showPopover(myEvent, item) {

    item.selected != item.selected;
    if (item.selected) {
      item.selected = false;
    }
    else {
      item.selected = true;
    }

    if (item.groupKey != undefined) {


    }
    else {
      

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
  pressed() {
    
  }
  active() {
    
  }
  released() {
    
  }

  
  searchuser(searchbar) {
    

    let el = document.getElementsByTagName('ion-searchbar');
    el[0].classList.add('MY-CUSTOM-CLASS')

    var q = searchbar.target.value;

    
    

    


    console.log("searchuser :" + q + ":" + q.length)

    if (q != undefined && q.trim() == '') {
      this.onlinedata();
      return;
    } else {
      this.myfriends = this.myfriends.filter((v) => {
        if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1 ||  v.message.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        else {
          return false;

        }
      })
    }
    if (q.length == 0) {
      this.onlinedata();
    }


  }
  onCancel(event) {
    console.log('CANCEL', event);
    this.onlinedata();
  }
}
