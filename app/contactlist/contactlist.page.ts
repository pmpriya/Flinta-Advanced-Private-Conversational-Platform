import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { element } from 'protractor';
import { Socket } from 'ngx-socket-io';
import { NavParams, ModalController, LoadingController } from '@ionic/angular';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { NetworkService } from '../network.service';
import { ThemeSwitcherService } from '../theme-switcher.service';
import { GruopProvider } from "../../providers/ServerDb/group";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { GruopChatProvider } from "../../providers/ServerDb/groupChat";
@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.page.html',
  styleUrls: ['./contactlist.page.scss'],
})
export class ContactlistPage implements OnInit {
  groupmembers: any;
  isRemoved: boolean;
  tagmessage: any;
  contacts: any;
  tempcontacts:any;

  mynumber: any;
  invite_contacts = [];
  eventdata: any;
  Uid = localStorage.getItem("FlintauserID").toString();
  currentUser = localStorage.getItem("FlintauserID").toString();
  selectall: any;
  indstate: boolean;
  invitedcontacts = [];
  invites: any;
  view: boolean = false;
  searchstring: any = '';
  selected = [];
  colorCode: any;
  allmygroups = [];
  experts: any;
  allgroupmsgs = [];
  owner: boolean;
  compid:any;
  constructor(private loadingCtrl: LoadingController, private GruopChatProvider: GruopChatProvider, public sanitizer: DomSanitizer, private GruopProvider: GruopProvider, private ThemeSwitcherService: ThemeSwitcherService, private service: ApiserviceService, private navParams: NavParams, private socket: Socket, private modalController: ModalController, private BuddyChatProvider: BuddyChatProvider, private networkProvider: NetworkService,) {
    this.mynumber = localStorage.getItem('mobile');
    this.experts = localStorage.getItem('experts');
    this.compid=localStorage.getItem('compid');

    this.eventdata = this.navParams.data;
    this.colorCode = ThemeSwitcherService.DayColorCode;

    this.selected = this.eventdata.attendees;
    console.log(this.eventdata, this.selected);
  }

  ngOnInit() {
  }
  onlinegroupdata() {

    this.GruopProvider.getGroupContactlist().then(data => {
      
      var getdta: any;
      getdta = data;
      getdta.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });
      if (data["flag"] == null) {
        this.groupInfo(data);


        
        
        
        

        

      }
    }).catch(res => {
      this.onlinegroupdata();
      
      

    })
  }
  
  groupInfo(mainList) {
    console.log('mainList :' + JSON.stringify(mainList));
    this.allmygroups = [];

    if (mainList != null) {
      mainList.forEach(value => {
        this.allmygroups.push(value)
      });
    }


  }
  searchuser(searchbar) {
    
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {

      this.contacts = [];

      this.getConatctlist();
      this.onlinegroupdata();
      return;
    }
    if(this.contacts.length==0){
      this.contacts=this.tempcontacts;
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
  onCancel(event) {

    this.getConatctlist();
    this.onlinegroupdata();
  }
  getConatctlist() {
    this.tempcontacts=[];
    this.contacts = [];
    var data={
      compid:this.compid
    }
      this.service.PostRequest(this.service.mainAPI + '/getUserMstComp',data).then(res => {
        if(res['status']!=0){
      console.log(res);
      this.contacts = res;
      this.tempcontacts=this.contacts ;
      this.contacts.sort(function (a, b) {
        if (a.username < b.username) { return -1; }
        if (a.username > b.username) { return 1; }
        return 0;
      })
      this.contacts.sort(function (a, b) {
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

      if (this.eventdata.event == 'mom') {
        

        this.contacts.forEach(element => {
          console.log(this.selected);
          if ((this.selected.length != 0 || this.selected.length != undefined) && this.selected.some(contact => contact.username == element.username) || this.selected.some(contact => contact.groupname == element.groupname)) {
            console.log('contains selected');
            element.isChecked = true;
          } else {
            element.isChecked = false;
          }
        })
      } else {
        this.contacts.forEach(element => {
          element.isChecked = false;
        });
        

        this.contacts.sort(function (a, b) {
          if (a.username < b.username) { return -1; }
          if (a.username > b.username) { return 1; }
          return 0;
        })
        this.contacts.sort(function (a, b) {
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
    }
    }).catch(err => {
      if (this.eventdata.event == 'mom') {
        
      }

      console.log(err);
    })
  }
  ionViewDidEnter() {

    this.getConatctlist();
    this.onlinegroupdata();
  }

  async getinvited() {
    this.invitedcontacts = [];
    var data = {
      eventkey: this.eventdata.eventkey,
      
      
      
    }
    await this.service.PostRequest(this.service.mainAPI + '/get_eventlist', data).then(res => {
      console.log("get_eventlist " + res);
      if (res != "no data found") {

        this.invites = res;


        for (var i = 0; i < this.contacts.length; i++) {
          for (var j = 0; j < this.invites.length; j++) {
            if (this.contacts[i].mobile == this.invites[j].buddyid) {
              this.contacts.splice(i, 1);
              break;
            }
          }
        }



        
        
        

        
        

        
        
        
        
        this.invites.forEach(element => {
          if (element.mobile != localStorage.getItem('FlintauserID')) {
            this.invitedcontacts.push(element);
          }
        });
        this.invitedcontacts.sort((a, b) => a.createdby_name.localeCompare(b.createdby_name))
      }
      console.log("invitedcontacts :" + this.invitedcontacts.length);
    }).catch(err => {
      console.log(err);
      console.log("catch invitedcontacts:" + this.invitedcontacts.length);

    })


  }

  toggleview() {
    this.view = !this.view;
  }

  changeselect() {
    setTimeout(() => {
      this.contacts.forEach(item => {
        item.isChecked = this.selectall;
      });
    });
  }
  getCheckboxValues(ev, data) {
    console.log(ev, data);


    if (ev.detail.checked) {
      
      this.invite_contacts.push(data);

    } else {
      let removeIndex = this.invite_contacts.findIndex(itm => itm === data);

      if (removeIndex !== -1)
        this.invite_contacts.splice(removeIndex, 1);
    }

    
    
    console.log(this.invite_contacts);
  }

  
  
  
  
     
  
  
  

  

  


  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  


  
  
  
  
  
  
  
  

  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  


  

  
  


  

  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  

  

  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  


  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  

  

  
  

  

  
  
  
  
  
  
  
  sendinvite() {
    
    var sendata = new Date();
    if (this.eventdata.event == 'mom') {

      this.modalController.dismiss(this.invite_contacts);
      this.loadingCtrl.dismiss();
    } else {

      for (let i = 0; i < this.invite_contacts.length; i++) {

        console.log("this.invite_contacts 1:" + JSON.stringify(this.invite_contacts[i]))


        if (this.eventdata.share_event == "file") {
          
          this.loadingdismiss();
          console.log("this.eventdata.filedata :" + JSON.stringify(this.eventdata.filedata))
          var sendata = new Date();

          for (let i = 0; i < this.invite_contacts.length; i++) {
            if (this.invite_contacts[i].groupkey != null) {
              var experts = false;
              if (this.invite_contacts[i].opengroup == true && localStorage.getItem('experts') != undefined) {
                experts = this.experts;
              }
              var array3 = {
                groupname: this.invite_contacts[i].groupname,
                groupkey: this.invite_contacts[i].groupkey,
                message: this.service.encryptText(this.eventdata.filedata.message),
                sentby: localStorage.getItem("FlintauserID"),
                sendername: localStorage.getItem('username'),
                photourl: this.invite_contacts[i].groupkey,
                groupimage: this.invite_contacts[i].groupimage,
                timestamp: new Date().getTime(),
                replydisplayname: '',
                filetype: this.eventdata.filedata.filetype,
                attachtext: this.service.encryptText(null),
                experts: experts,
                tagmessage: this.service.encryptText(''),
                tagfileextension: '',
                fileextension: this.eventdata.filedata.fileextension,
                tagtime: '',
                Tagsend: '',
                Tagto: '',
                Date: new Date(),
                tagfiletype: '',
                Taglatitude: '',
                Taglocation: '',
                Filedate: new Date(),
                status: status,
                Taskfrom: '',
                Taskto: '',
                opengroup: this.invite_contacts[i].opengroup,
                forwardmsg: null,
                selectedColor: "none",
                showMore: false

              }
              var array4 = {
                groupname: this.invite_contacts[i].groupname,
                groupkey: this.invite_contacts[i].groupkey,
                message: this.service.encryptText(this.eventdata.filedata.message),
                sentby: localStorage.getItem("FlintauserID"),
                sendername: localStorage.getItem('username'),
                photourl: this.invite_contacts[i].groupimage,
                groupimage: this.invite_contacts[i].groupimage,
                timestamp: new Date().getTime(),
                replydisplayname: '',
                filetype: this.eventdata.filedata.filetype,
                attachtext: this.service.encryptText(null),
                experts: experts,
                tagmessage: this.service.encryptText(''),
                tagfileextension: '',
                fileextension: this.eventdata.filedata.fileextension,
                tagtime: '',
                Tagsend: '',
                Tagto: '',
                Date: new Date(),
                tagfiletype: '',
                Taglatitude: '',
                Taglocation: '',
                Filedate: new Date(),
                status: status,
                Taskfrom: '',
                Taskto: '',
                opengroup: this.invite_contacts[i].opengroup,
                forwardmsg: null,
                selectedColor: "none",
                showMore: false

              }


              this.groupsend(array3)
              this.allgroupmsgs.push(array4);
              this.GruopProvider.getGroupinfo(this.invite_contacts[i].groupkey).then(res => {
                console.log("getGroupinfo =----------- :" + JSON.stringify(res))
                this.groupmembers = res["member"];
                this.isRemoved = true;
                this.groupmembers.forEach(element => {
                  console.log("Cahk :" + element.uid + ":" + localStorage.getItem("FlintauserID"))

                  if (element.uid == localStorage.getItem("FlintauserID")) {
                    this.isRemoved = false;
                  }
                  if (element.owner != "undefined" && element.owner == localStorage.getItem("FlintauserID")) {
                    this.owner = true;
                  }
                });

                this.GruopChatProvider.createMessage(array3, this.invite_contacts[i].groupcreated, this.groupmembers).then(res => {
                  console.log("seneded")
                  this.loadingdismiss();
                  
                  if (this.networkProvider.CurrentStatus == true) {
                    
                  }
                });
                
              })

            }
            else {
              this.loadingdismiss();
              console.log("status :" + status)
              var array11 = {
                buddyid: this.invite_contacts[i].mobile,
                message: this.service.encryptText(this.eventdata.filedata.message),
                sentby: localStorage.getItem("FlintauserID"),
                username: this.invite_contacts[i].username,
                buddyImage: this.invite_contacts[i].photourl,
                message_id: localStorage.getItem("FlintauserID") + "_" + this.invite_contacts[i].mobile,
                timestamp: sendata.getTime(),
                deviceid: this.invite_contacts[i].deviceid,
                sentto: this.invite_contacts[i].mobile,
                location: false,
                latitude: undefined + ',' + undefined,
                status: '1',
                filetype: this.eventdata.filedata.filetype,
                fileextension: this.eventdata.filedata.fileextension,
                chatType: "1",
                tagmessage: this.service.encryptText(''),
                attachtext: this.service.encryptText(null),
              }
              console.log(array11)

              this.send(array11);

              var array2 = {
                buddyid: this.invite_contacts[i].mobile,
                message: this.service.encryptText(this.eventdata.filedata.message),
                sentby: localStorage.getItem("FlintauserID"),
                username: this.invite_contacts[i].username,
                buddyImage: this.invite_contacts[i].photourl,
                message_id: localStorage.getItem("FlintauserID") + "_" + this.invite_contacts[i].mobile,
                timestamp: sendata.getTime(),
                deviceid: this.invite_contacts[i].deviceid,
                sentto: this.invite_contacts[i].mobile,
                location: false,
                latitude: undefined + ',' + undefined,
                status: '1',
                filetype: this.eventdata.filedata.filetype,
                tagmessage: this.service.encryptText(''),
                attachtext: this.service.encryptText(null),
                fileextension: this.eventdata.filedata.fileextension,
                chatType: "1",
              }
              this.BuddyChatProvider.createMessage(array2, "1").then(res => {
                this.loadingdismiss();
                
                console.log(res);

              });
            }


            

            
          }


          this.modalController.dismiss();

        } else {
          this.loadingdismiss();
          var data = {
            message_id: localStorage.getItem('mobile') + '_' + this.invite_contacts[i].mobile,
            message: this.eventdata.title + " - " + this.eventdata.desc + " by " + this.eventdata.startTime + " to " + this.eventdata.endTime,
            sentby: localStorage.getItem('mobile'),
            sentto: this.invite_contacts[i].mobile,
            fileType: 'event',
            status: 1,
            timestamp: new Date().getTime()
          }

          var shareevent = {
            eventkey: this.eventdata.eventkey,
            buddyid: this.invite_contacts[i].mobile,
            buddyname: this.invite_contacts[i].username
          }

          this.BuddyChatProvider.eventSharedList(shareevent);

          if (this.invite_contacts[i].groupkey != null) {
            console.log("this.invite_contacts 1:" + JSON.stringify(this.invite_contacts[i]))

            var experts = false;
            if (this.invite_contacts[i].opengroup == true && localStorage.getItem('experts') != undefined) {
              experts = this.experts;
            }
            var array33 = {
              groupname: this.invite_contacts[i].groupname,
              groupkey: this.invite_contacts[i].groupkey,
              message: this.service.encryptText(this.urlify(this.Textbold(data.message.trim()))),
              sentby: localStorage.getItem("FlintauserID"),
              sendername: localStorage.getItem('username'),
              photourl: this.invite_contacts[i].groupkey,
              groupimage: this.invite_contacts[i].groupimage,
              timestamp: new Date().getTime(),
              replydisplayname: '',
              filetype: 'event',
              attachtext: this.service.encryptText(null),
              experts: experts,
              tagmessage: this.service.encryptText(''),
              tagfileextension: '',
              fileextension: this.invite_contacts[i].fileextension,
              tagtime: '',
              Tagsend: '',
              Tagto: '',
              Date: new Date(),
              tagfiletype: '',
              Taglatitude: '',
              Taglocation: '',
              Filedate: new Date(),
              status: status,
              Taskfrom: '',
              Taskto: '',
              opengroup: this.invite_contacts[i].opengroup,
              forwardmsg: null,
              selectedColor: "none",
              showMore: false

            }
            var array44 = {
              groupname: this.invite_contacts[i].groupname,
              groupkey: this.invite_contacts[i].groupkey,
              message: this.service.encryptText(this.urlify(this.Textbold(data.message.trim()))),
              sentby: localStorage.getItem("FlintauserID"),
              sendername: localStorage.getItem('username'),
              photourl: this.invite_contacts[i].groupimage,
              groupimage: this.invite_contacts[i].groupimage,
              timestamp: new Date().getTime(),
              replydisplayname: '',
              filetype: 'event',
              attachtext: this.service.encryptText(null),
              experts: experts,
              tagmessage: this.service.encryptText(''),
              tagfileextension: '',
              fileextension: this.invite_contacts[i].fileextension,
              tagtime: '',
              Tagsend: '',
              Tagto: '',
              Date: new Date(),
              tagfiletype: '',
              Taglatitude: '',
              Taglocation: '',
              Filedate: new Date(),
              status: status,
              Taskfrom: '',
              Taskto: '',
              opengroup: this.invite_contacts[i].opengroup,
              forwardmsg: null,
              selectedColor: "none",
              showMore: false

            }


            this.groupsend(array33)
            this.allgroupmsgs.push(array44);
            this.GruopProvider.getGroupinfo(this.invite_contacts[i].groupkey).then(res => {
              console.log("getGroupinfo =----------- :" + JSON.stringify(res))
              this.groupmembers = res["member"];
              this.isRemoved = true;
              this.groupmembers.forEach(element => {
                console.log("Cahk :" + element.uid + ":" + localStorage.getItem("FlintauserID"))

                if (element.uid == localStorage.getItem("FlintauserID")) {
                  this.isRemoved = false;
                }
                if (element.owner != "undefined" && element.owner == localStorage.getItem("FlintauserID")) {
                  this.owner = true;
                }
              });
              
            })
            this.GruopChatProvider.createMessage(array33, this.invite_contacts[i].groupcreated, this.groupmembers).then(res => {
              this.loadingdismiss();
            });
          }
          else {
            console.log("this.invite_contacts 2")
            var array1 = {
              buddyid: this.invite_contacts[i].mobile,
              message: this.service.encryptText(this.eventdata.title + " - " + this.eventdata.desc + " by " + this.eventdata.startTime + " to " + this.eventdata.endTime),
              sentby: localStorage.getItem("FlintauserID"),
              username: this.invite_contacts[i].username,
              buddyImage: this.invite_contacts[i].photourl,
              message_id: localStorage.getItem("FlintauserID") + "_" + this.invite_contacts[i].mobile,
              timestamp: sendata.getTime(),
              deviceid: this.invite_contacts[i].deviceid,
              sentto: this.invite_contacts[i].mobile,
              location: false,
              latitude: undefined + ',' + undefined,
              status: '1',
              filetype: 'event',
              tagmessage: this.service.encryptText(''),
              attachtext: this.service.encryptText(null),
              chatType: "1",
              fileextension: this.invite_contacts[i].fileextension
            }

            this.send(array1);
            this.BuddyChatProvider.createMessage(array1, "1").then(res => {
              this.loadingdismiss();
              
              console.log(res);

            });

            console.log(this.invite_contacts);
          }

          console.log(data);

        }
      }
      this.loadingdismiss();
      if (this.eventdata.share_event == "file") {
        this.service.presentToast("File Sent Successfully!");
      }
      else {
        this.service.presentToast("Invitation sent Successfully!");
      }
      this.modalController.dismiss();
    }
  }
  sendMessage(data) {

  }
  async presentLoadingWithOptions() {
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
  groupsend(msg) {

    console.log("Send item :" + JSON.stringify(msg))
    if (msg != '') {


      
      this.socket.emit('groupmessage', msg);
    }

  }
  Textbold(text) {
    var bold = /\*([^\s][^\*]+?[^\s])\*/gm;
    var html = text.replace(bold, '<strong>$1</strong>');
    return html;
  }
  urlify(text) {

    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;


    return text.replace(urlRegex, function (url, b, c) {
      var url2 = (c == 'www.') ? 'http://' + url : url;
      var gettdat = url2.replace('(', '');
      var gettdat1 = gettdat.replace(')', '');
      
      

      return ' <a href="' + gettdat1 + '" target="_blank">' + text + '</a> ';
    })
  }

  send(msg) {
    console.log("Send item :" + JSON.stringify(msg))
    if (msg != '') {

      
      this.socket.emit('chatmessage', msg);
    }

    
  }

  closemodal() {
    this.modalController.dismiss(this.invite_contacts);
  }

}
