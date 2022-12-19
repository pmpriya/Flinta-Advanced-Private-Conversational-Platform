/**
 * Displaying Upcoming Events like birthday, wedding Anniversaries
 */

import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform,LoadingController } from '@ionic/angular';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { NetworkService } from '../network.service';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.page.html',
  styleUrls: ['./upcoming-events.page.scss'],
})

  /**
   * Starting of class
   */

export class UpcomingEventsPage implements OnInit {

  contacts:any;
  me=localStorage.getItem('mobile');
  Uid:any;
  currentUser:any;
  buddydetails:any;
  buddy:any;
  buddyinfo:any;
  message_id:any;
  message_id1:any;
  mycontacts=[];
  sortedcontacts = [];
  showloading:boolean = false;
  compid:any;

  /**
 * end of global variables
 */


  constructor(private loadingCtrl:LoadingController, public sanitizer: DomSanitizer, private service:ApiserviceService,private localNotifications: LocalNotifications,public alertController: AlertController,private BuddyChatProvider: BuddyChatProvider,private networkProvider: NetworkService, private platform: Platform,) {
    this.compid=localStorage.getItem('compid');
   }

  ngOnInit() {
    this.getusers();
  }

  getusers(){
    this.presentToast()
    this.showloading = true;
    var data={
      compid:this.compid
    }
      this.service.PostRequest(this.service.mainAPI + '/getUserMstComp',data).then(res => {
        if(res['status']!=0){
      this.showloading = false;
      // console.log(res);
      this.loadingdismiss()
      this.contacts = res;
      this.contacts.forEach(element => {
        if(element.username!="undefined" && element.dob!=undefined){
          this.mycontacts.push(element);
        }
       if(element.mobile!=this.me&&element.dob&&new Date(element.dob).getDate()==new Date().getDate()&&new Date(element.dob).getMonth()==new Date().getMonth()){
        element.bday = true;
        this.bdaynotify(element.username);
       }
       for(let i=0;i<7;i++){
        if(new Date(new Date(element.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getDate()==new Date().getDate()&&new Date(new Date(element.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getMonth()==new Date().getMonth()){
          element.advbday = true;
          element.color = 'green'
        }
        else if(new Date(new Date(element.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getDate()==new Date().getDate()&&new Date(new Date(element.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getMonth()==new Date().getMonth()){
          element.belatedbday = true;
          element.color = 'red'
        }
      }
      });
      console.log(this.mycontacts);
      this.sortedcontacts = this.mycontacts.sort((a, b) => {
        var adate = new Date(a.dob).getTime();
        var bdate = new Date(b.dob).getTime();
        console.log(adate,bdate)
        return adate - bdate;
      })
      console.log(this.sortedcontacts);
    }
    },err=>{
      console.log(err);
      this.loadingdismiss()

    })
  }
   //priya
   searchuser(searchbar) {
    //this.filteredusers = ;
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {

      this.mycontacts = [];
     
      this.getusers();

      return;
    }

    this.mycontacts = this.mycontacts.filter((v) => {
      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {

        return false;

      }


    })
  }
  onCancel(event) {
    this.mycontacts = [];
     
    this.getusers();
  }
  bdaynotify(name){
    this.localNotifications.schedule({
      title:"BirthDay Remainder",
      text:"It's "+name+" Birthday Today!",
      trigger:{in:2,unit:ELocalNotificationTriggerUnit.HOUR,count:3}
    })
  }

  async sendwishes(buddy){
    console.log(buddy);
    if(buddy.bday&&buddy.bday==true){

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Birthday!',
        subHeader: 'Share your Wishes to '+buddy.username +' on this Special Day !' ,
        inputs: [
          {
            name: 'wishes',
            type: 'textarea',
            placeholder: 'Type your Wishes..'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Send',
            handler: (data) => {
              console.log(data);
              var sendata = new Date();
              var array = {
                message: this.service.encryptText(data.wishes),
                sentby: this.me,
                username: buddy.username,
                buddyImage: buddy.photourl,
                message_id: this.me + "_" + buddy.mobile,
                timestamp: sendata.getTime(),
                deviceid: buddy.deviceid,
                sentto: buddy.mobile,
                location: false,
                latitude: undefined + ',' + undefined,
                status: status,
                filetype: "text",
                fileextension: '',
                tagmessage:this.service.encryptText(''),
                tagfileextension: '',
                tagfiletype: '',
                tagtime: '',
                attachtext:this.service.encryptText(null),
                Taskfrom: '',
                Taskto: '',
                chatType: "1",
                selfdestruct: "false"  //For Self Destruct message
              }
            
              // online data insert
              this.BuddyChatProvider.createMessage(array, "1").then(res => {
                console.log(res);
                if (this.networkProvider.CurrentStatus == true) {
                }
              },err=>{
                console.log(err);
              });
              this.service.presentToast("Wishes Sent")
            }
          }
        ]
      });
  
      await alert.present();

    } else{

      for(let i=0;i<7;i++){
        if(new Date(new Date(buddy.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getDate()==new Date().getDate()&&new Date(new Date(buddy.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getMonth()==new Date().getMonth()){
          console.log("Advance wishes");
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Advance Wishes!',
            subHeader: 'Share your Wishes to '+buddy.username +' in Advance!' ,
            inputs: [
              {
                name: 'wishes',
                type: 'textarea',
                placeholder: 'Type your Wishes..'
              },
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              }, {
                text: 'Send',
                handler: (data) => {
                  console.log(data);
                  var sendata = new Date();
                  var array = {
                    message: this.service.encryptText(data.wishes),
                    sentby: this.me,
                    username: buddy.username,
                    buddyImage: buddy.photourl,
                    message_id: this.me + "_" + buddy.mobile,
                    timestamp: sendata.getTime(),
                    deviceid: buddy.deviceid,
                    sentto: buddy.mobile,
                    location: false,
                    latitude: undefined + ',' + undefined,
                    status: status,
                    filetype: "text",
                    fileextension: '',
                    tagmessage: this.service.encryptText(''),
                    tagfileextension: '',
                    tagfiletype: '',
                    tagtime: '',
                    Taskfrom: '',
                    Taskto: '',
                    chatType: "1",
                    attachtext:this.service.encryptText(null),
                    selfdestruct: "false"  //For Self Destruct message
                  }
               
                  // online data insert
                  this.BuddyChatProvider.createMessage(array, "1").then(res => {
                    console.log(res);
                  
                  },err=>{
                    console.log(err);
                  });
                  this.service.presentToast("Wishes Sent")
                }
              }
            ]
          });
      
          await alert.present();
        }else if(new Date(new Date(buddy.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getDate()==new Date().getDate()&&new Date(new Date(buddy.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getMonth()==new Date().getMonth()){
          console.log("Belated wishes");
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Forgot to Wish?',
            subHeader: 'Share your Belated Wishes to '+buddy.username +' now!' ,
            inputs: [
              {
                name: 'wishes',
                type: 'textarea',
                placeholder: 'Type your Wishes..'
              },
            ],
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  console.log('Confirm Cancel');
                }
              }, {
                text: 'Send',
                handler: (data) => {
                  console.log(data);
                  var sendata = new Date();
                  var array = {
                    message: this.service.encryptText(data.wishes),
                    sentby: this.me,
                    username: buddy.username,
                    buddyImage: buddy.photourl,
                    message_id: this.me + "_" + buddy.mobile,
                    timestamp: sendata.getTime(),
                    deviceid: buddy.deviceid,
                    sentto: buddy.mobile,
                    location: false,
                    latitude: undefined + ',' + undefined,
                    status: status,
                    filetype: "text",
                    fileextension: '',
                    tagmessage: this.service.encryptText(''),
                    tagfileextension: '',
                    tagfiletype: '',
                    tagtime: '',
                    Taskfrom: '',
                    Taskto: '',
                    attachtext:this.service.encryptText(null),
                    chatType: "1",
                    selfdestruct: "false"  //For Self Destruct message
                  }
                 
                  // online data insert
                  this.BuddyChatProvider.createMessage(array, "1").then(res => {
                    console.log(res);
                    if (this.networkProvider.CurrentStatus == true) {
                    }
                  },err=>{
                    console.log(err);
                  });
                  this.service.presentToast("Wishes Sent")
                }
              }
            ]
          });
      
          await alert.present();
        }
      // if(buddy.gender=="Female"){
      //   this.service.presentToast("Not her Birthday Today!");
      // }else if(buddy.gender=="Male"){
      //   this.service.presentToast("Not his Birthday Today!");
      // }else{
      //   this.service.presentToast("Not Birthday Today!");
      // }
      
    }
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

}
