import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform, LoadingController, NavParams, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GruopChatProvider } from '../../providers/ServerDb/groupChat'
import { LoginProvider } from "../../providers/ServerDb/loginprovider";
import { GruopProvider } from "../../providers/ServerDb/group";
import { Socket } from 'ngx-socket-io';
import { ThemeSwitcherService } from '../theme-switcher.service';
import { ApiserviceService } from "../../app/apiservice.service";

@Component({
  selector: 'app-addgroupmember',
  templateUrl: './addgroupmember.page.html',
  styleUrls: ['./addgroupmember.page.scss'],
})
export class AddgroupmemberPage implements OnInit {
  contactList = [];
  groupname: any;
  groupKey: any;
  contactsSelected: any;
  selectedCount: any;
  selecteditem: any;
  opengroup: any;
  opengrp: boolean;
  myInfo: any;
  groupmembers;
  tempArray: any;
  groupinfor: any;
  colorCode: any;
  groupkey: any;
  groupImage: any;
  owner: any;
  groupcreated: any;
  TempArray:any;
  compid:any;
  constructor(private ApiserviceService:ApiserviceService, public alertController: AlertController, public modelctrl: ModalController, private navParams: NavParams, private ThemeSwitcherService: ThemeSwitcherService, private loadingCtrl: LoadingController, private socket: Socket, private activatedRoute: ActivatedRoute, private GruopProvider: GruopProvider, private LoginProvider: LoginProvider, private platform: Platform, public alertCtrl: AlertController, private groupservice: GruopChatProvider, public navCtrl: NavController) {
    this.colorCode = ThemeSwitcherService.DayColorCode;
    this.compid=localStorage.getItem('compid');
    this.activatedRoute.queryParams.subscribe((res) => {
      console.log("queryParams :" + JSON.stringify(res));
      this.groupinfor = res;

      this.contactsSelected = [];
      this.selectedCount = 0;

      this.GruopProvider.getGroupinfo(this.groupkey).then(res => {
        this.groupmembers = res["member"];
        this.getContacts();

      })


    })
    this.groupname = this.navParams.get("groupname");
    this.groupkey = this.navParams.get("groupkey");
    this.opengroup = this.navParams.get("opengroup");
    this.groupImage = this.navParams.get("groupImage");
    this.owner = this.navParams.get("owner");
    this.groupcreated = this.navParams.get("groupcreated");
    this.contactsSelected = [];
    this.selectedCount = 0;
    if(this.groupinfor.groupkey!=undefined){
    this.getGroupMember(this.groupinfor.groupkey);
  }
    
    
    
    
    
    
    
    

    

    
  }
  ngOnInit() {
    this.socket.connect();

  }
  getGroupMember(groupkey) {
    
    this.groupmembers = [];

    this.presentLoading();
    this.GruopProvider.getGroupinfo(groupkey).then(res => {
          var getarray: any;
        getarray = res["member"];
        getarray.forEach(element => {
         
          if(element.status=="1"){
            this.groupmembers.push(element)
          }
        });
      

     
      
      this.groupmembers.sort(function (a, b) {
        var nameA = a.username; 
        var nameB = b.username; 

        if (a.owner != null || b.owner != null) {

          return -1;
        }
        
        return 0;
      });
      this.groupmembers.sort(function (a, b) {
        if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1; }
        if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1; }
        return 0;
      })
      this.loadingdismiss();
      this.getContacts();
    }, err => {
      console.log(err);
      this.loadingdismiss();
    })
  }
  

  

  
  
  
  
  
  


  
  
  
  

  
  
  
  
  
  
  
  
     
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


  
  creategroup() {

    console.log("this.contactsSelected :" + JSON.stringify(this.contactsSelected))

    if (this.opengroup == true) {
      this.opengrp = true;
    }
    else {
      this.opengrp = false;
    }


    var opengroup = true;
    if (this.groupinfor.opengroup == "undefined") {
      opengroup = false
    }
    console.log("this.groupinfor.exitsgroup :" + this.groupinfor.exitsgroup)
    if (this.groupinfor.exitsgroup == null) {
      var array = {
        sendername: localStorage.getItem("username"),
        photourl: localStorage.getItem("photourl"),
        groupname: this.groupinfor.groupname,
        groupkey: this.groupinfor.groupkey,
        message: this.ApiserviceService.encryptText(" Created By " + localStorage.getItem("username")),
        sentby: localStorage.getItem("FlintauserID").toString(),
        username: localStorage.getItem("username"),
        timestamp: new Date().getTime(),
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
      this.groupservice.createFirstMessage(array, "", this.TempArray, 1)
    }


    this.presentLoading()
    var newgroup = {
      openGroup: opengroup,
      groupName: this.groupinfor.groupname,
      groupPic: this.groupinfor.groupImage,
      groupKey: this.groupinfor.groupkey
    }
    this.groupservice.addmember(this.myInfo, newgroup, this.contactsSelected, this.groupinfor.exitsgroup).then(res => {

      this.loadingdismiss()
      var obj =
      {
        groupimage: this.groupinfor.groupImage,
        ownerUid: this.groupinfor.owner,
        groupkey: this.groupinfor.groupkey,
        groupname: this.groupinfor.groupname,
        opengroup: this.groupinfor.opengroup,
        groupcreated: this.groupinfor.groupcreated,
        LoggedUser: localStorage.getItem("FlintauserID")
      }
      this.GruopProvider.initializegroup(obj)
      this.socket.emit('group_memberchange', obj);
      var todo = {
        uid: null,
        backclick: true
      }
      this.socket.emit('recentmessgae', todo);

      this.navCtrl.navigateForward('groupchat', {
        queryParams: obj,
      })
      this.TempArray = [];
      this.TempArray = this.contactsSelected;
      console.log("getArray1 :" + JSON.stringify(this.TempArray))


      console.log("getArray 2:" + JSON.stringify(this.TempArray))

      var count = 0;
      console.log("this.groupinfor.exitsgroup:" + this.groupinfor.exitsgroup)

      if(this.groupinfor.exitsgroup!=null){
      
        this.TempArray.forEach(element => {
         
  
          count++;
          if (element.mobile != localStorage.getItem("FlintauserID").toString()) {
            var array1 = {
              sendername: localStorage.getItem("username"),
              photourl: localStorage.getItem("photourl"),
              groupname: this.groupinfor.groupname,
              groupkey: this.groupinfor.groupkey,
              message: this.ApiserviceService.encryptText(" Added " + element.username),
              sentby: localStorage.getItem("FlintauserID").toString(),
              username: element.username,
              timestamp: new Date().getTime(),
              replydisplayname: '',
              filetype: "title",
              status: 1,
              Filedate: new Date(),
              uid:element.mobile,
              groupimage: this.groupinfor.groupImage,
              sender:localStorage.getItem("FlintauserID"),
              buddyid:element.mobile,
              messagecount:0,
              opengroup:this.groupinfor.opengroup,
              experts:element.experts
            }
  
  
            console.log("added group 22" +JSON.stringify(array1));
            this.groupservice.createFirstMessage1(array1)
          }
  
  
        });
  
      }

    }, err => {
      this.loadingdismiss()
    })


  }
  async presentAlert(tittle) {
    var alert = await this.alertController.create({

      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  ionViewWillEnter() {
    
    


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ContactsPage');
    this.getContacts();
  }
  
  getContacts() {
    console.log('groupmembers:' + this.groupmembers.length);
    this.presentLoading()
    this.contactList = [];
    this.LoginProvider.getUserInfo(this.compid).then((res) => {
      console.log("live changed load :" + JSON.stringify(res))

      this.tempArray = res;

      var getarray = this.removeItemAll(this.tempArray, this.groupmembers)
      console.log(" getarray:" + JSON.stringify(getarray))


      var temparray = [];
      getarray.forEach(element => {
        console.log("element :" + element.exits)
        if (element.exits == undefined && element.userstatus == "A" && element.username != undefined && element.username != "" && element.username != "undefined") {
          temparray.push(element)
        }
      });
      this.loadingdismiss()
      this.setContactList(temparray);


    })


  }
  removeItemAll(arr, value) {
    console.log("removeItemAll 111:" + JSON.stringify(arr))

    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < value.length; j++) {
        console.log("chk 111:" + arr[i].mobile + ":" + value[j].uid)
        if (arr[i].mobile == value[j].uid) {
          arr[i].exits = true;
          console.log("remvoed:" + arr[i].mobile);
        }
      }

    }
    return arr;
  }
  
  searchuser(searchbar) {
    
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {
      this.getContacts();
      return;
    }

    this.contactList = this.contactList.filter((v) => {
      if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {

        return false;

      }
    })
  }

  setContactList(arr) {

    console.log("aarr:" + JSON.stringify(arr))
    this.contactList = arr;
    
    this.contactList.sort(function (a, b) {
      if (a.username < b.username) { return -1; }
      if (a.username > b.username) { return 1; }
      return 0;
    })
    this.contactList.sort(function (a, b) {
      var nameA = a.username.toUpperCase(); 
      var nameB = b.username.toUpperCase(); 

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      
      return 0;
    });


  }


  change(contact) {


    console.log("checkl value:" + JSON.stringify(contact))
    if (contact.selected) {
      this.contactsSelected.push(contact);


    }
    else {
      this.contactsSelected.pop(contact);

    }

    console.log("contactsSelected : " + JSON.stringify(this.contactsSelected));
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
  closepoup() {
    this.modelctrl.dismiss();
  }
}


