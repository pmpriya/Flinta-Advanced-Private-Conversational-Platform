import { Component, OnInit } from '@angular/core';

import { Platform, LoadingController, NavParams, AlertController, NavController, ModalController } from "@ionic/angular";
import { LoginProvider } from "../../providers/ServerDb/loginprovider";
import { GruopProvider } from "../../providers/ServerDb/group";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from "../network.service";

import { GruopChatProvider } from "../../providers/ServerDb/groupChat";
import { Socket } from 'ngx-socket-io';
import { ApiserviceService } from "../apiservice.service";
@Component({
  selector: 'app-groupcreation',
  templateUrl: './groupcreation.page.html',
  styleUrls: ['./groupcreation.page.scss'],
})
export class GroupcreationPage implements OnInit {

  TempArray = [];


  contactList = [];
  contactList1 = [];
  groupname: any;
  groupImg: any;
  getList: any;
  contactsSelected: any;
  selectedCount: any;
  selecteditem: any;
  opengroup: any;
  opengrp: boolean;
  myInfo: any;
  userall: any;
  defaultcheck: boolean = false;

  forwardFlow: any;
  forwardmessages: any;
  chatinfo: any;

  colorCode: any;
  colorCode1: any;

  themeselect: any = false;
  flow: any;
  grouplist: any;
  groupmembers = [];
  compid; any;
  constructor(private ApiserviceService: ApiserviceService, private modelctrl: ModalController, public navParams: NavParams, private socket: Socket, private GruopChatProvider: GruopChatProvider, private networkService: NetworkService, private activatedRoute: ActivatedRoute, private navCtrl: NavController, private BuddyChatProvider: BuddyChatProvider, public sanitizer: DomSanitizer,
    private GruopProvider: GruopProvider, private LoginProvider: LoginProvider, private loadingCtrl: LoadingController,
    private platform: Platform, public alertCtrl: AlertController,
  ) {
    this.compid = localStorage.getItem('compid');
    
    if (this.navParams.get('forward') != null) {
      this.forwardFlow = true;
      this.forwardmessages = this.navParams.get('forward');
      this.chatinfo = this.navParams.get('chatinfo');
      this.flow = this.navParams.get('flag');
      this.getGroupInfo();
    }
    else {
      this.forwardFlow = false;
    }


    
    
    
    
    
    
    
    
    
    
    

    
    

    this.contactsSelected = [];
    this.selectedCount = 0;


    this.getContacts();
  }
  getGroupInfo() {
    this.grouplist = []
    this.GruopProvider.getGroupContactlist().then(data => {
      var getdta: any;
      getdta = data;
      getdta.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });
      getdta.forEach(element => {
        this.grouplist.push(element)
      })
    })
  }
  onCancel(event) {

    this.contactList = [];
    console.log('CANCEL', event);
    this.getContacts();
  }

  getItems(ev) {

    var q = ev.target.value;

    if (q.trim() == '') {


      this.getContacts();
      return false;
    }

    this.contactList = this.contactList1.filter((v) => {
      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1 || v.designation.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {

        return false;

      }
    })

  }

  getContacts() {

    this.contactList = [];

    
    
    
    

    
    
    
    
    
    

    
    
    
    
    
    this.onlinecontacts();
    

    

  }
  async presentAlert(tittle) {
    var alert = await this.alertCtrl.create({

      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  onlinecontacts() {

    this.getList = [];

    
    this.LoginProvider.getUserInfo(this.compid).then(data => {
      console.log("live changed load online:" + JSON.stringify(data))
      this.getList = data;
      
      var mainArray = [];
      this.contactList = [];
      this.contactList1 = [];
      this.getList.sort(function (a, b) {
        if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1; }
        if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1; }
        return 0;
      })
      this.getList.forEach(element => {
        if (element.mobile != localStorage.getItem('FlintaFlintauserID') && element.userstatus == "A" && element.username != undefined && element.username != "" && element.username != "undefined") {
          this.contactList.push(element)
          this.contactList1.push(element)
        }
      });



      if (this.contactsSelected.length != 0) {
        this.contactsSelected.forEach(element => {
          this.contactList.forEach(value => {
            if (element.mobile == value.mobile) {
              value.selected = true;
            }
          });
        });

      }


    }, err => {
      console.log(err);
      
    })


  }
  setContactList(res) {
    this.contactList = res;
    

    this.contactList.sort(function (a, b) {
      var nameA = a.displayName.toUpperCase(); 
      var nameB = b.displayName.toUpperCase(); 

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      
      return 0;
    });


  }

  buddychat(buddy) {
    this.BuddyChatProvider.initializebuddy(buddy);
    
    
  }


  

  

  
  
  
  
  
  

  
  

  
  
  
  
  

  

  
  
  
  

  
  
  


  
  
  
  

  
  

  checkall(userall) {

    console.log("userall :" + userall)


    if (userall == true) {

      this.contactList.forEach(value => {
        
        if (this.contactsSelected.indexOf(value) == -1) {
          this.contactsSelected.push(value)
        }

        value.selected = true;

      });
    }
    else {
      console.log("userall 2:" + userall)

      this.contactList.forEach(value => {
        this.contactsSelected.pop(value);
        value.selected = false;


      });
    }
    this.removeDups(this.contactsSelected);
    console.log("this.contactsSelected :" + this.contactsSelected.length)

    console.log(this.contactList);
  }

  removeDups(array) {
    let unique = {};
    array.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  change(contact) {

    console.log("contact :" + contact.selected)
    console.log("contactsSelected length: " + this.contactsSelected.length);

    if (contact.selected == true) {
      
      if (this.contactsSelected.indexOf(contact) == -1) {
        this.contactsSelected.push(contact)
      }
    }
    else {
      this.contactsSelected.pop(contact);

    }

    this.contactsSelected = this.contactsSelected.filter((test, index, array) =>
      index === array.findIndex((findTest) =>
        findTest.mobile === test.mobile
      )
    );
    
    if (this.contactList.length != this.contactsSelected.length) {
      
    }
    console.log("contactList :" + this.contactList.length)
    console.log("contactsSelected length 2: " + this.contactsSelected.length);

    console.log("contactsSelected : " + JSON.stringify(this.contactsSelected));
  }

  async showMessage(groupKey, newgroup, groupPic1) {

    const statusalert = await this.alertCtrl.create({
      
      message: 'Group Created Successfully',
      buttons: [
        {
          text: "Ok",
          
          handler: () => {

            

            this.GruopProvider.getintogroup(groupKey, this.groupname, newgroup.groupPic, this.opengrp);
            var obj = { groupkey: groupKey, groupname: this.groupname, groupimage: groupPic1, openGroup: this.opengrp }
            this.GruopProvider.initializegroup(obj)
            this.modelctrl.dismiss(obj);

            
            
            


          }
        }]
    });
    
    
    await statusalert.present();
  }

  forwardSelectedMessage() {
    this.forwardmessages.forEach(element => {
      this.forwardMessage(element)
    });
  }
  forwardMessage(item) {

    this.presentLoading();

    var count = 0;
    console.log("this.contactsSelected :" + JSON.stringify(this.contactsSelected))
    this.contactsSelected.forEach(element => {
      if (!element.groupkey) {
        count++;
        var sendMessage = {
          "message": this.ApiserviceService.encryptText(item.message),
          "sentby": localStorage.getItem('FlintaFlintauserID'),
          "username": element.username, 
          "buddyImage": element.photourl, 
          "message_id": localStorage.getItem('FlintaFlintauserID') + "_" + element.mobile,
          "timestamp": new Date().getTime(),
          "deviceid": element.deviceid,
          "sentto": element.mobile,
          "forwardmsg": item.sentby,
          "location": item.location,
          "latitude": item.latitude,
          "status": 1,
          "filetype": item.filetype,
          "fileextension": item.fileextension,
          "Taskfrom": item.Taskfrom,
          "Taskto": item.Taskto,
          "chatType": "1",
          'tagmessage': this.ApiserviceService.encryptText(''),
          'attachtext': this.ApiserviceService.encryptText(null),
          "selfdestruct": item.selfdestruct,
          "livelocation": item.livelocation,
        }
        console.log("send:" + count + ":" + this.contactsSelected.length)

        console.log("sendMessage :" + JSON.stringify(sendMessage))

        this.socket.emit('chatmessage', sendMessage);

        var message_id = localStorage.getItem('FlintaFlintauserID') + "_" + element.mobile, message_id1 = element.mobile + "_" + localStorage.getItem('FlintaFlintauserID');
        this.BuddyChatProvider.createMessage(sendMessage, "1").then(res => {
          this.loadingdismiss();


          if (count == this.contactsSelected.length) {

            this.loadingdismiss();
            this.networkService.forwardFlow = true;

            if (this.flow == "group") {
              this.modelctrl.dismiss();

            }
            else {
              console.log("completed:" + JSON.stringify(this.chatinfo))
              this.BuddyChatProvider.initializebuddy(this.chatinfo)

              this.modelctrl.dismiss();

              
              
              
            }

          }



        }).catch(err => {
          this.loadingdismiss();
        });
      }
      else {
        var dateNow = new Date();

        
        var hours = dateNow.getHours();
        var minutes = "0" + dateNow.getMinutes();
        var month = dateNow.getMonth();
        var da = dateNow.getDate();

        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var formattedTime = monthNames[month] + "-" + da + "-" + hours + ":" + minutes.substr(-2);
        var status = "0";
        if (this.networkService.CurrentStatus == true) {
          status = "1";
        }

        var sendDate = new Date();
        
        
        
        

        var array1 = {
          groupname: element.groupname,
          groupkey: element.groupkey,
          message: this.ApiserviceService.encryptText(item.message),
          sentby: item.sentby,
          sendername: localStorage.getItem('name'),
          photourl: '',
          groupimage: element.groupImage,
          timestamp: new Date().getTime(),
          replydisplayname: '',
          filetype: item.filetype,
          experts: '',
          tagmessage: item.tagmessage,
          tagfileextension: item.tagfileextension,
          tagtime: item.tagtime,
          Tagsend: '',
          Tagto: '',
          Date: new Date(),
          tagfiletype: item.tagfiletype,
          Taglatitude: '',
          Taglocation: '',
          Filedate: new Date(),
          status: '1',
          Taskfrom: '',
          Taskto: '',
          channel: "android",
          opengroup: element.opengroup,
          forwardmsg: item.sentby,
          selectedColor: "none",
          showMore: false,
          edited: null

        }

        var array2 = {

          groupname: element.groupname,
          groupkey: element.groupkey,
          message: this.ApiserviceService.encryptText(item.message),
          sentby: item.sentby,
          sendername: localStorage.getItem('name'),
          photourl: '',
          groupimage: element.groupImage,
          timestamp: new Date().getTime(),
          replydisplayname: '',
          filetype: item.filetype,
          experts: '',
          tagmessage: item.tagmessage,
          tagfileextension: item.tagfileextension,
          tagtime: item.tagtime,
          Tagsend: '',
          Tagto: '',
          Date: new Date(),
          tagfiletype: item.tagfiletype,
          Taglatitude: '',
          Taglocation: '',
          Filedate: new Date(),
          status: '1',
          Taskfrom: '',
          Taskto: '',
          channel: "android",
          opengroup: element.opengroup,
          forwardmsg: item.sentby,
          selectedColor: "none",
          showMore: false,
          edited: null

        }
        
        
        

        
        
        
        
        
        
        this.GruopProvider.getGroupinfo(element.groupkey).then(res => {

          console.log("offline_online 1  :" + JSON.stringify(res))
          this.groupmembers = [];
          this.groupmembers = res["member"];
          this.loadingdismiss();
          this.GruopChatProvider.createMessage(array1, element.groupcreated, this.groupmembers).then(res => {
            console.log("seneded")

            if (this.networkService.CurrentStatus == true) {
              
            }

            this.networkService.forwardFlow = true;

            this.modelctrl.dismiss();


          });
        })
      }



    });
  }
  creategroup() {
    this.TempArray = [];

    console.log("creategroup")
    var groupKey = this.guid();
    if (this.opengroup == true) {
      this.opengrp = true;
    }
    else {
      this.opengrp = false;
    }
    var groupPic1 = 'assets/imgs/groupIcon.png';

    var creatiedTime = new Date().getTime();
    var newgroup = {
      openGroup: this.opengrp,
      groupName: this.groupname,
      groupPic: groupPic1
    }
    console.log("creategroup 1")

    var array = {
      sendername: localStorage.getItem("username"),
      photourl: localStorage.getItem("photourl"),
      groupname: this.groupname,
      groupkey: groupKey,
      message: this.ApiserviceService.encryptText(" Created By " + localStorage.getItem("username")),
      sentby: localStorage.getItem("FlintauserID").toString(),
      username: localStorage.getItem("username"),
      timestamp: creatiedTime,
      replydisplayname: '',
      filetype: "title",
      status: 1,
      Filedate: new Date(),
    }

    var todo1 = {
      mobile: localStorage.getItem("FlintauserID").toString(),
      username: localStorage.getItem("username")
    }

    this.TempArray = [];
    this.TempArray.push(todo1)
    console.log("myfirearray :" + JSON.stringify(array))
    this.GruopChatProvider.createFirstMessage(array, "", this.TempArray, 1)


    this.GruopProvider.addgroup(groupKey, newgroup, this.contactsSelected, creatiedTime).then((res) => {
      this.TempArray = [];
      this.TempArray = this.contactsSelected;
      console.log("getArray1 :" + JSON.stringify(this.TempArray))



      
      console.log("getArray 2:" + JSON.stringify(this.TempArray))

      var count = 0;

      this.TempArray.forEach(element => {
        
        

        


        count++;
        if (element.mobile != localStorage.getItem("FlintauserID").toString()) {
          var array1 = {
            sendername: localStorage.getItem("username"),
            photourl: localStorage.getItem("photourl"),
            groupname: this.groupname,
            groupkey: groupKey,
            message: this.ApiserviceService.encryptText(" Added " + element.username),
            sentby: localStorage.getItem("FlintauserID").toString(),
            username: element.username,
            timestamp: new Date().getTime(),
            replydisplayname: '',
            filetype: "title",
            status: 1,
            Filedate: new Date(),
          }


          console.log("added group 22" + element.username);
          this.GruopChatProvider.createFirstMessage(array1, "", this.TempArray, count)
        }


      });

      this.showMessage(groupKey, newgroup, groupPic1);
    }).catch((err) => {

    })

    

  }

  
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + new Date().getTime() + s4() +
      s4() + s4() + s4() + s4();
  }

  ngOnInit() {
    this.settheme()
  }
  settheme() {
    var d = Number(new Date().getHours());

    if (d >= 6 && d < 18) {
      this.colorCode = "black"
      console.log("day mode" + this.colorCode);

      localStorage.setItem('theme', 'day');
    } else {
      this.colorCode = "#ffffff"
      console.log("night mode:" + this.colorCode);

      localStorage.setItem('theme', 'night');
    }
  }
  async presentLoading() {
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
