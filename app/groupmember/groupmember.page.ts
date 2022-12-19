import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController,NavParams } from '@ionic/angular';
import { GruopProvider } from "../../providers/ServerDb/group";
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { GruopChatProvider } from '../../providers/ServerDb/groupChat'
import { ThemeSwitcherService } from '../theme-switcher.service';
import { VideocallPage } from "../videocall/videocall.page";
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { ApiserviceService } from "../apiservice.service";
@Component({
  selector: 'app-groupmember',
  templateUrl: './groupmember.page.html',
  styleUrls: ['./groupmember.page.scss'],
})
export class GroupmemberPage implements OnInit {
  groupmembers;
  groupKey: any;
  groupName: any
  owerInfo: boolean = false;
  groupinfor: any;
  contactsSelected: any;
  myInfo: any;
  colorCode: any;
  group_call: boolean = false;
  owener: boolean = false;
  constructor(private ApiserviceService:ApiserviceService, public navParams:NavParams,private BuddyChatProvider: BuddyChatProvider, private modalController: ModalController, private ThemeSwitcherService: ThemeSwitcherService, private loadingCtrl: LoadingController, private GruopChatProvider: GruopChatProvider, private socket: Socket, private activatedRoute: ActivatedRoute, private GruopProvider: GruopProvider, public navCtrl: NavController,
    private alertCtrl: AlertController,) {
    this.colorCode = ThemeSwitcherService.DayColorCode;

    
    
    
    
    
    
    
    
    

    
    

if(this.navParams.get('groupname')!=null){
  this.group_call = true;
}
else{
  this.group_call = false;
}
this.getGroupMember();

    
    
    
    
    





  }

  ngOnInit() {
  }

  getGroupMember() {
    this.contactsSelected = [];

    this.groupmembers = [];

    this.presentLoading();
    this.GruopProvider.getGroupinfo(this.navParams.get('groupkey')).then(res => {
      console.log("getGroupMember :" + JSON.stringify(res))


      if (this.group_call == true) {
        var getarray: any;
        getarray = res["member"];
        getarray.forEach(element => {

          if (element.uid != localStorage.getItem("FlintauserID")) {
            this.groupmembers.push(element)
          }
        });
      }
      else {
        var getarray: any;
        getarray = res["member"];
        getarray.forEach(element => {
          if (element.owner == localStorage.getItem("FlintauserID")) {
            this.owener = true
          }
          this.groupmembers.push(element)
        });
      }

      this.loadingdismiss();
      this.groupmembers.forEach(element => {
        if (this.group_call == true && element.uid == localStorage.getItem("FlintauserID")) {
          this.groupmembers.splice(element)
        }
        else {


          if (element.ower == localStorage.getItem("FlintauserID")) {
            this.owerInfo = true;
          }
        }
      });
      this.groupmembers.sort(function (a, b) {
        if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1; }
        if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1; }
        return 0;
      })
      
      this.groupmembers.sort(function (a, b) {
        var nameA = a.username; 
        var nameB = b.username; 

        if (a.owner != null || b.owner != null) {

          return -1;
        }
        
        return 0;
      });

      console.log("this.groupmembers :" + this.groupmembers.length)
    }, err => {
      console.log(err);
      this.loadingdismiss();
    })
  }
  ionViewWillLeave() {
    
  }

  async Deletemember(item) {
    const statusalert = await this.alertCtrl.create({
      
      message: "Are you sure want to remove " + item.username + " from " + this.GruopProvider.currentgroupname + " Group?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "cancelbtn",
          handler: () => {
            
          }
        },
        {
          text: "Ok",
          
          handler: () => {

            console.log("deldete :" + JSON.stringify(item))

            var newgroup = {
              opengroup: this.navParams.get('opengroup'),
              groupname: this.navParams.get('groupname'),
              groupimage: this.navParams.get('groupImage'),
              groupkey: this.navParams.get('groupkey'),
              removeUser: item.uid,
              removeBy: localStorage.getItem("username")
            }

            var array = {
              sendername: localStorage.getItem("username"),
              photourl: localStorage.getItem("photourl"),
              groupname: newgroup.groupname,
              groupkey: newgroup.groupkey,
              message: this.ApiserviceService.encryptText(" Removed " + item.username),
              sentby: localStorage.getItem("FlintauserID").toString(),
              username: item.username,
              timestamp: new Date().getTime(),
              replydisplayname: '',
              filetype: "title",
              status: 1,
              Filedate: new Date(),
              attachtext:this.ApiserviceService.encryptText(null),
              tagmessage: this.ApiserviceService.encryptText(''),        

              livelocation: false
            }


            

            var timestamp=new Date().getTime();

            this.GruopProvider.Exitgroup(item.uid, this.navParams.get('groupkey'),timestamp).then(res => {
              console.log("deletemember :" + JSON.stringify(res))
              this.getGroupMember();
              this.socket.emit('group_memberchange', newgroup);


            });

          }
        }]
    });
    
    
    await statusalert.present();
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

    console.log("contactsSelected length 2: " + this.contactsSelected.length);

    console.log("contactsSelected : " + JSON.stringify(this.contactsSelected));
  }

  async videoCall() {


    var data = {

      group_call: true,
      buddyname: this.navParams.get('groupname'),
      buddyimage: this.navParams.get('groupImage'),
      contacts: this.contactsSelected,
      typeCall: "Video",
      myid: localStorage.getItem("FlintauserID")
    }

    const model = await this.modalController.create({
      component: VideocallPage,
      componentProps: data
    });

    model.present();
    model.onWillDismiss().then(data => {
      var obj =
      {
        opengroup: this.navParams.get('opengroup'),
        groupname: this.navParams.get('groupname'),
        groupimage: this.navParams.get('groupImage'),
        groupkey: this.navParams.get('groupkey'),
      }

      this.navCtrl.navigateForward('groupchat', {
        queryParams: obj,
      })

    });
  }
  async audioCall() {

    var data = {
      group_call: true,
      buddyname: this.navParams.get('groupname'),
      buddyimage: this.navParams.get('groupImage'),
      contacts: this.contactsSelected,
      typeCall: "Voice",
      myid: localStorage.getItem("FlintauserID")
    }

    const model = await this.modalController.create({
      component: VideocallPage,
      componentProps: data
    });

    model.present();
    model.onWillDismiss().then(data => {


      var obj =
      {
        opengroup: this.navParams.get('opengroup'),
        groupname: this.navParams.get('groupname'),
        groupimage: this.navParams.get('groupImage'),
        groupkey: this.navParams.get('groupkey'),
      }

      this.navCtrl.navigateForward('groupchat', {
        queryParams: obj,
      })
    });
  }
}