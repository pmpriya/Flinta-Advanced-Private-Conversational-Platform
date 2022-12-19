import { Component, ViewChild, ChangeDetectorRef, OnInit, NgZone, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastController, NavController, PopoverController, MenuController, ActionSheetController, ModalController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { AssigntaskPage } from '../assigntask/assigntask.page';
import { start } from 'repl';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
// import { http } from '@angular/http';
import { SearchFilterPage } from "../search-filter/search-filter.page";
import { Base64 } from '@ionic-native/base64/ngx';
import { IonBackButtonDelegate } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { NetworkService } from "../network.service";
import { GruopProvider } from "../../providers/ServerDb/group";
import { GruopChatProvider } from "../../providers/ServerDb/groupChat";
import { Crop } from '@ionic-native/crop/ngx';


import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Network } from '@ionic-native/network/ngx'

import { FilePath } from '@ionic-native/file-path/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

import { File } from '@ionic-native/file/ngx';

declare var cordova: any;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { JsonPipe } from '@angular/common';
import { ThemeSwitcherService } from '../theme-switcher.service';
// import {AudiostartRecording,AudiostopRecording} from "../assets/js/Audio.js";
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
// import {EmojiPickerComponent} from "../../components/emoji-picker/emoji-picker";
// import { LoginProvider } from "../../providers/ServerDb/loginprovider";
declare var MediaRecorder: any;
// import { ServerDbSelfdestructProvider } from '../../providers/ServerDb/couch-db-selfdestruct'
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
// import * as io from 'socket.io-client';
import { GooglelocationPage } from "../googlelocation/googlelocation.page";
import { HttpClient } from '@angular/common/http/';
import { EventsService } from "../../app/events.service";
import { Subscription } from 'rxjs/internal/Subscription';
// import { GroupDatabaseProvider } from "../../providers/database/groupdatabase";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { GroupmenuComponent } from "../groupmenu/groupmenu.component";
import {GroupmemberPage} from '../groupmember/groupmember.page';
declare var $;
@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupchatPage implements OnInit {
  forwardFlag: boolean = false;
  deleteFlag: boolean = false;


  forwardClick: boolean = false;
  deleteClick: boolean = false;


  tempArrayList: any;
  activeGroup: boolean = true;
  datacheckflag: boolean = true;
  @ViewChild('content') private content: any;
  scrollValue: any;
  @ViewChild(IonBackButtonDelegate, { static: false }) backButton: IonBackButtonDelegate;
  groupcreated;
  showEmojiPicker = false;
  @ViewChild('chat_input') messageInput: ElementRef;
  protected interval: any;
  unreadCount = 0;
  isRemoved: boolean = false;
  slideBoolean: boolean = false;
  // @ViewChild('content') content: Content;
  // @ViewChild(Navbar) navBar: Navbar;
  mediaRecordFlag: boolean = false;
  mediaRecorder;
  groupMember: any;
  owner: boolean = false;
  groupname;
  groupImage;
  groupkey;
  multipledelete = [];
  newmessage;
  audio1 = [];
  pageAlive: boolean = false;
  searchinput: boolean = false;
  allgroupmsgs = [];
  photourl;
  alignuid: any;
  sendername;
  imgornot;
  replyMsg: boolean = false;
  userExperts: any;
  opengroup: boolean = false;
  offlineChatinfo = [];
  el: HTMLElement;
  titleStyle: any;
  showpop: any;
  mapshowpop: any;
  Tagsend;
  Tagto;
  tagmessage;
  tagtime;
  tagfileextension;
  filetype;
  latitude;
  location;
  gteMapLatLong: any;
  selfdestruct: boolean;
  newMsgBtn: boolean = true;
  fileName: string;
  sendRecord: any;
  audiofilePath: string;
  chatmessage = [];
  base64Image: any;
  audio: MediaObject;
  audioList: any[] = [];
  matches = [];
  theTimeout: any;
  nativepath: any;
  recording: boolean = false;
  multiplecheck: boolean = true;
  deletebtn: boolean = true;
  forwardbtn: boolean = true;
  addmessagehide: boolean;
  avatar: string;
  replydisplayname;
  maptitleStyle: any;
  Uid;
  mobileicon: boolean;
  webFileUploadfiletype: any;
  webFileUploadname: any;
  experts: any;
  temparray = [];
  groupmembers = [];
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true //Corrects Android orientation quirks
  }

  // You can add many other permissions
  PERMISSION = {
    CAMERA: this.diagnostic.permission.CAMERA,
    WRITE_EXTERNAL: this.diagnostic.permission.WRITE_EXTERNAL_STORAGE,
    READ_EXTERNAL: this.diagnostic.permission.READ_EXTERNAL_STORAGE,
  };
  BuddyTyping: boolean = false;
  BuddyTypingName: any;
  myTimerInterval: any;

  LocationPERMISSION = {

    ACCESS_COARSE_LOCATION: this.diagnostic.permission.ACCESS_COARSE_LOCATION,
  };
  private selecteItem: string;
  textIndex: string;
  getMap = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyD_Lmybdnx6s2TjMvPK57fD44xGjjJPA8A&'
  subscription: Subscription;
  message = '';
  limitCount = 10;
  private finishedLoading: boolean = false;
  tempMsg = '';
  taskmessageto;
  myChatinfo: any;
  public progress: number = 0;
  public pressState: string = "released";
  taskmessagefrom;
  buddy;
  colorCode: any;
  imageLink: any;
  RecentDBProvider: any;
  constructor(private popoverController: PopoverController, private themeSwitcher: ThemeSwitcherService,  private media: Media, private cd: ChangeDetectorRef, private speechRecognition: SpeechRecognition, private nativeAudio: NativeAudio, private fileOpener: FileOpener, private FileTransfer: FileTransfer, private network: Network, private Base64: Base64, private crop: Crop, private events: EventsService, private actionSheet: ActionSheetController, private photoViewer: PhotoViewer, private geolocation: Geolocation, private menu: MenuController, public ImagePicker: ImagePicker, private GruopChatProvider: GruopChatProvider, private GruopProvider: GruopProvider, private ImghandlerProvider: ImghandlerProvider, private filepath: FilePath, private http: HttpClient, private loadingCtrl: LoadingController, private file: File, private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy, private platform: Platform, private networkProvider: NetworkService, private camera: Camera, private diagnostic: Diagnostic, public sanitizer: DomSanitizer, public activatedRoute: ActivatedRoute, private socket: Socket, private toastCtrl: ToastController, private service: ApiserviceService, public navCtrl: NavController, public modalController: ModalController, public alertController: AlertController) {


    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('backButton Handler was called!');

      var todo = {
        uid: this.Uid,
        backclick: true
      }
      this.socket.emit('recentmessgae', todo);

      // this.navCtrl.navigateRoot(['/home']);
      this.navCtrl.navigateRoot(['/home'])

    })

    this.userExperts = null;
    this.showEmojiPicker = false;
    this.addmessagehide = false;
    this.pageAlive = true;
    this.isRemoved = false;
    if (localStorage.getItem('theme') == 'day') {
      this.imageLink = '../../assets/imgs/chatBackground.png'
    }
    if (localStorage.getItem('theme') == 'night') {
      this.imageLink = '../../assets/imgs/chatbg1.jpg'
    }

    console.log("get reoup:" + JSON.stringify(this.GruopProvider.group))
    this.groupname = this.GruopProvider.group['groupname'];
    this.groupkey = this.GruopProvider.group['groupkey'];
    this.groupImage = this.GruopProvider.group['groupimage'];
    this.groupcreated = this.GruopProvider.group['groupcreated'];
    this.opengroup = this.GruopProvider.group['opengroup'];

    console.log("this.opengroup :" + this.opengroup)
    this.GruopChatProvider.groupName = this.groupname;
    this.GruopChatProvider.groupImage = this.groupImage;
    this.GruopChatProvider.openGroup = this.GruopProvider.group['opengroup'];

    this.groupmember();


    this.subscription = this.events.getMessage().subscribe(text => {
      console.log("subscribe:" + JSON.stringify(text))
      console.log(text.created);
      if (text["emojis:created"] != 0 && text["emojis:created"] != undefined) {
        if (this.newmessage != undefined) {
          this.tempMsg = this.newmessage;
        }
        // console.log("emojis:created :"+emoji+"::"+this.tempMsg+":"+this.newmessage)
        this.newmessage = this.tempMsg + ' ' + text["emojis:created"];
        this.tempMsg = this.newmessage;

      }

    })


    this.Receive();
    this.network.onConnect().subscribe(() => {
      console.log("Online Buddychat")
      // this.offline_online();
    })
    this.platform.pause.subscribe(() => {

      this.unreadCount = 0;
      this.allgroupmsgs.forEach(element => {
        element.countStatus = "2";
        element.unreadMessageCount = null;
      });
    });
    // Get the list of supported languages
    this.speechRecognition.getSupportedLanguages()
      .then(
        (languages: string[]) => console.log(languages),
        (error) => console.log(error)
      )

    // })
  }
  speechTotext() {
    // Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission))

    // Request permissions
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening(options).subscribe(matches => {
      console.log("matches :" + JSON.stringify(matches))
      this.matches = matches;
      if (this.newmessage == undefined || this.newmessage == '') {
        this.newmessage = matches[0].toString(); // print text
        this.speechRecognition.stopListening()
        this.sendMessage() // sent messgae

      }
      this.cd.detectChanges();
    });

  }
 
  groupmember() {
    this.GruopProvider.getGroupinfo(this.groupkey).then(res => {
      console.log("getGroupinfo =----------- :" + JSON.stringify(res))
      this.groupmembers = res["member"];
      this.isRemoved = true;
      this.groupmembers.forEach(element => {
        console.log("Cahk :" + element.uid + ":" + this.Uid)

        if (element.uid == localStorage.getItem("LinkususerID")) {
          this.isRemoved = false;
        }
        if (element.owner != "undefined" && element.owner == localStorage.getItem("LinkususerID")) {
          this.owner = true;
        }
      });
      // console.log("this.groupmembers :" + this.groupmembers.length)
    })
  }

  async RemoveToast(removeBy) {

    this.activeGroup = false;
    const statusalert = await this.alertController.create({
      // header: 'Ad!',
      message: removeBy + " Removed from " + this.GruopProvider.currentgroupname,
      buttons: [

        {
          text: "Ok",
          // cssClass: "confirmbtn",
          handler: () => {


          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
  }
  Receive() {

    // Socket receiving method 
    this.socket.on('groupmessage', (data) => {
      console.log("Receive groupmessage" + JSON.stringify(data))
      var item = {};
      // check the sender id and change the style class

      if (this.activeGroup == true && this.isRemoved == false && this.pageAlive == true) {
        var experts = false;
        if (this.opengroup == true && this.experts != undefined) {
          experts = this.experts;
        }

        if (data.length != 0) {

          console.log("checking this.unreadCount :" + this.unreadCount)


          if (data.sentby != this.Uid && data.status == "1" && this.unreadCount != null) {
            this.unreadCount++;
            this.allgroupmsgs.forEach(element => {
              if (element.unreadCount != null) {
                element.unreadCount = this.unreadCount
              }
            });

            console.log("unreadCount :" + this.unreadCount)
          }

          if (this.opengroup == true || data.opengroup == "true") {
            console.log("this.opengroup 1:" + this.opengroup)

            // if (this.opengroup) {
            //   console.log("opengroup 1  :" + element.experts + ":" + this.Uid)
            //   if (element.experts == this.Uid || element.sentby == this.Uid || element.experts == "null" || element.experts == "undefined") {
            //     console.log("opengroup 12 :" + element.experts + ":" + this.Uid)


            if ((data.sentby != this.Uid && this.groupkey == data.groupkey) && (data.experts == this.Uid || data.experts == "null" || data.experts == "undefined")) {
              console.log("this.opengroup 2:" + this.opengroup)

              this.GruopChatProvider.updatechatmesage(this.groupkey, data.sentby).then(res => {
                console.log("status_change :" + JSON.stringify(res))

              })
              // if (this.platform.is('android')) {
              //   this.GroupDatabaseProvider.insertRecords(data, 2).then(res => {
              //   })
              // }
              var array = {
                groupkey: data.groupkey,
                message: data.message,
                sentby: data.sentby,
                sendername: data.sendername,
                fileextension: data.fileextension,
                photourl: data.photourl,
                groupimage: this.groupImage,
                timestamp: data.timestamp,
                location: data.location,
                replydisplayname: data.replydisplayname,
                filetype: data.filetype,
                tagmessage: data.tagmessage,
                tagfileextension: data.tagmessage,
                tagtime: data.tagtime,
                Tagsend: data.Tagsend,
                Tagto: data.Tagto,
                Date: data.Date,
                tagfiletype: data.tagfiletype,
                Taglatitude: data.Taglatitude,
                Taglocation: data.Taglocation,
                Filedate: data.Filedate,
                status: data.status,
                Taskfrom: data.Taskfrom,
                Taskto: data.Taskto,
                experts: data.experts,
                opengroup: data.opengroup,
                groupname: data.groupname,
                countStatus: data.status,
                unreadCount: this.unreadCount,
                forwardmsg: data.forwardmsg,
                selectedColor: "none",
                showMore: false
              }
              this.allgroupmsgs.push(array)

              if (this.unreadCount != null) {
                this.unreadMessageShow();
              }
              this.scrollToBottomOnInit();

              console.log("allgroupmsgs receive : " + JSON.stringify(this.allgroupmsgs));
            }
          }
          else if (data.sentby != this.Uid) {

            var array1 = {
              groupkey: data.groupkey,
              message: data.message,
              sentby: data.sentby,
              sendername: data.sendername,
              fileextension: data.fileextension,
              photourl: data.photourl,
              timestamp: data.timestamp,
              replydisplayname: data.replydisplayname,
              filetype: data.filetype,
              tagmessage: data.tagmessage,
              tagfileextension: data.tagfileextension,
              tagtime: data.tagtime,
              Tagsend: data.Tagsend,
              Tagto: data.Tagto,
              Date: data.Date,
              tagfiletype: data.tagfiletype,
              Taglatitude: data.Taglatitude,
              Taglocation: data.Taglocation,
              Filedate: data.Filedate,
              status: data.status,
              Taskfrom: data.Taskfrom,
              Taskto: data.Taskto,
              experts: experts,
              opengroup: data.opengroup,
              groupname: data.groupname,
              location: data.location,
              countStatus: data.status,
              unreadCount: this.unreadCount,
              forwardmsg: data.forwardmsg,
              selectedColor: "none",
              showMore: false
            }
            this.nativeAudio.play('receive', () => console.log('sent is done playing'));
            this.allgroupmsgs.push(array1);


            if (this.unreadCount != null) {
              this.unreadMessageShow();
            }
            this.showDatewise();
            console.log("allgroupmsgs receive 2 : " + JSON.stringify(this.allgroupmsgs));
            this.scrollToBottomOnInit();
          }
        }
      }


      // this.allgroupmsgs.push(msg);
      this.removeDups(this.allgroupmsgs);

    });

    this.socket.on('group_memberchange', (msg) => {
      console.log("receive group_memberchange :" + JSON.stringify(msg) + ":" + this.groupkey)
      if (this.activeGroup == true) {

        if (msg.groupkey == this.groupkey) {
          console.log("Call groupchat")
          this.groupmember();
          this.getchat(this.scrollValue);
        }
        if (msg.groupkey == this.groupkey && msg.removeUser == localStorage.getItem('LinkususerID')) {
          this.isRemoved = true;
          if (this.pageAlive == true) {
            this.RemoveToast(msg.removeBy)
            //deleteRecentDb
            // this.RecentDBProvider.deleteRecentDb(localStorage.getItem('LinkususerID'), this.groupkey)
          }

        }
      }
    })
    this.socket.on('groupinfo', (msg) => {
      console.log("receive groupinfo :" + JSON.stringify(msg) + ":" + this.groupkey)
      if (this.activeGroup == true) {

        if (msg.groupkey == this.groupkey) {
          console.log("Call groupchat")
          this.getGroupInformation()
        }
      }

    })
    // this.socket.on('removeGroupUser', (msg) => {
    //   console.log("receive removeGroupUser :" + JSON.stringify(msg) + ":" + this.groupkey)
    //   if (msg.groupkey == this.groupkey && msg.uid == localStorage.getItem('LinkususerID')) {
    //     this.isRemoved=true;

    //   }

    // })

    this.socket.on('group_user_typing', (msg) => {
      // console.log("receive group_user_typing :" + JSON.stringify(msg))

      // sender:this.Uid,
      // groupkey:this.groupkey,
      // typing:true

      // sender:this.Uid,
      //   groupkey:this.groupkey,
      //   senderName:localStorage.getItem('username'),
      //   typing:true
      if (this.activeGroup == true) {

        if (msg.sender != this.Uid && msg.groupkey == this.groupkey && msg.typing == true) {
          this.BuddyTyping = true;
          this.BuddyTypingName = msg.senderName + " is typing...";
        }
        if (msg.sender != this.Uid && msg.groupkey == this.groupkey && msg.typing == false) {
          this.BuddyTyping = false;
        }
        console.log("BuddyTyping :" + this.BuddyTyping)
      }
    })

  }
  getGroupInformation() {
    this.GruopProvider.getMyGroupinformation(this.groupkey).then(res => {
      console.log("getMyGroupinformation :" + JSON.stringify(res))
      this.GruopChatProvider.initializebuddy(res[0])
      this.GruopChatProvider.groupName = res[0].groupname;
      this.GruopChatProvider.groupImage = res[0].groupimage;
      this.groupname = res[0].groupname;
      this.groupImage = res[0].groupimage;
    })
  }
  showDatewise() {
    let currentLetter;
    this.allgroupmsgs.forEach((value, index) => {
      console.log("value :" + JSON.stringify(value))

      if (value != undefined) {
        var getStr = value.timestamp;
        var getdata = new Date(parseInt(value.timestamp));
        var today = new Date();
        var tday1 = new Date();
        //console.log("currentLetter 1:" + getdata + ":" + getStr)

        tday1.setDate(tday1.getDate() - 1);

        var yesterday1 = tday1.getDate() + '-' + (tday1.getMonth() + 1) + '-' + tday1.getFullYear();

        if (this.convertDateFormat(getdata) != currentLetter && 'Today' != currentLetter) {
          if (this.convertDateFormat(getdata) == this.convertDateFormat(today)) {
            currentLetter = "Today";
          }

          else {
            currentLetter = this.convertDateFormat(getdata);
          }

          console.log("new data" + currentLetter + ":" + this.convertDateFormat(getdata) + ":" + value.timestamp)
          value.timeset = currentLetter;

          console.log("value.timeset" + value.timeset);
        }

      }

    });
  }
  getUsersList() {
    console.log("doRefresh")
    this.scrollValue = parseInt(this.scrollValue) + 10;
    this.getchat(this.scrollValue);
  }
  guid() {
    function s4() {
      return Math.floor(Math.random() * Math.floor(10002));
    }
    return s4();
  }

  ionViewDidLeave() {
    this.loadingdismiss();
    //this.socket.emit('disconnect', {});
    this.txtKeyUp();
    this.networkProvider.forwardFlow = false;
    this.pageAlive = false
  }
  settheme() {
    var d = Number(new Date().getHours());

    if (d >= 6 && d < 18) {
      this.colorCode = "black"
      console.log("day mode" + this.colorCode);
      this.themeSwitcher.setTheme('day');
      localStorage.setItem('theme', 'day');
    } else {
      this.colorCode = "#ffffff"
      console.log("night mode:" + this.colorCode);
      this.themeSwitcher.setTheme('night');
      localStorage.setItem('theme', 'night');
    }
  }
  async ngOnInit() {

    this.settheme()

    var room = { sender: localStorage.getItem('mobile'), receiver: Date.now() + this.guid() };
    // this.socket.emit('connectionestablish', room);

    this.nativeAudio.preloadSimple('sent', 'assets/mp3/sent.mp3').then(res => {
    })

    this.nativeAudio.preloadSimple('receive', 'assets/mp3/receive.wav').then(res => {
    })

    this.scrollValue = 10;
    this.pageAlive == true;

    this.getchat(this.scrollValue);

    this.socket.connect();

  }

  scrollToBottomOnInit() {
    // this.content.scrollToBottom(100);
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(400);
      }
    }, 500);
  }

  forwardSelection(selectedValue, item) {


    console.log("forwardSelection :" + selectedValue + ":" + JSON.stringify(item))
    this.allgroupmsgs.forEach(element => {


      if (element.timestamp == item.timestamp && selectedValue == true) {
        console.log("forwardSelection 1:" + selectedValue + ":" + JSON.stringify(item))

        // element.selected=true;
        element.selectedColor = "rgb(0 150 136 / 8%)"
      }
      else if (element.timestamp == item.timestamp && selectedValue == false) {
        console.log("forwardSelection 2:" + selectedValue + ":" + JSON.stringify(item))

        // element.selected=false;
        element.selectedColor = "transparent"
      }
    });

    console.log("forwardClick :" + this.forwardClick)
    if (this.arrayAlreadyHasArray(this.allgroupmsgs) == true) {
      if (this.forwardClick == true) {
        this.forwardFlag = true;
        this.deleteFlag = false;
      }
      else {
        this.forwardFlag = false;
        this.deleteFlag = true;
      }
    }
    else {
      if (this.forwardClick == true) {
        this.forwardFlag = false;
      }
      else {
        this.deleteFlag = false;
      }
      this.forwardClick = false;
    }

  }

  arrayAlreadyHasArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      let checker = false

      if (arr[i].selected == true) {
        checker = true
      }

      if (checker) {
        return true
      }
    }
    return false
  }

  Event(item, i) {


    console.log("Event:" + JSON.stringify(item))

    let actionSheet = this.actionSheet.create({
      header: 'My Options',
      buttons: [
        // {
        //   text: 'Delete',
        //   role: 'destructive',
        //   icon: 'trash',
        //   handler: () => {
        //     console.log('Delete clicked');
        //   }
        // },
        // {
        //   text: 'Share',
        //   icon: 'share',
        //   handler: () => {
        //     console.log('Share clicked');
        //   }
        // },
        // {
        //   text: 'Play (open modal)',
        //   icon: 'arrow-dropright-circle',
        //   handler: () => {
        //     console.log('Play clicked');
        //   }
        // }, 
        {
          text: 'Reply',
          icon: 'repeat-outline',
          handler: () => {
            this.addmessagehide = true;
            this.Tagsend = item.sentby;
            this.Tagto = item.sentto;
            if (item.filetype != "image") {
              this.tagmessage = item.message.split('<div>')[0] + (item.message.indexOf("div") != -1 ? '...' : '');
            }
            else {
              this.tagmessage = item.message;
            }
            // tagmessage: this.tagmessage,
            // tagfileextension: this.tagfileextension,
            // tagtime: this.tagtime,
            // replydisplayname: this.replydisplayname,
            // tagfiletype: this.filetype,

            console.log("item.experts :" + JSON.stringify(item))
            // if (item.experts != undefined && item.uid == true) {
            //   this.userExperts = item.uid

            var obj = {
              "mobile": item.sentby
            }
            this.userExperts = null;
            this.service.PostRequest(this.service.mainAPI + '/getUserInfo', obj).then(res => {
              console.log("getUserInfo :" + JSON.stringify(res));
              if (res["status"] == null) {
                this.userExperts = res[0].mobile
              }

            }, err => {

            })

            this.replydisplayname = item.sendername;
            this.filetype = item.filetype;
            this.tagtime = item.timestamp;
            this.latitude = item.latitude;
            this.location = item.location;
            this.tagfileextension = item.fileextension;

            console.log("reply this.filetype :" + this.filetype)
          }
        },
        {
          text: 'Forward',
          icon: 'return-up-forward-outline',
          handler: () => {

            this.forwardClick = true;
            this.deleteFlag = false;
            item.selected = true;
            this.forwardSelection(item.selected, item)

            // console.log("Forward  :" + JSON.stringify(item))
            // var obj = {
            //   "forward": item,
            //   "chatinfo": this.buddy,
            //   "buddyInfo": this.buddydetails
            // }
            // this.navCtrl.navigateForward('groupcreation', {
            //   queryParams: obj,
            // })
          }
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          handler: () => {
            this.forwardFlag = false;
            this.deleteFlag = true;
            this.forwardClick = false;
            item.selected = true;
            this.forwardSelection(item.selected, item)

            // console.log("Forward  :" + JSON.stringify(item))
            // var obj = {
            //   "forward": item,
            //   "chatinfo": this.buddy,
            //   "buddyInfo": this.buddydetails
            // }
            // this.navCtrl.navigateForward('groupcreation', {
            //   queryParams: obj,
            // })
          }
        },
        {
          text: 'Create Task',
          icon: 'document',
          handler: () => {
            this.assigntask(item, i);
          }
        },
        {
          text: 'Filter Reply Message',
          icon: 'filter-outline',
          handler: () => {
            var getchatlist = this.allgroupmsgs;
            this.allgroupmsgs = [];
            getchatlist.forEach(element => {
              if (element.timestamp == item.timestamp || element.tagtime == item.timestamp) {
                this.allgroupmsgs.push(element)
              }
            });
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
    this.stopInterval();
  }
  deleteFunction() {
    // this.presentLoadingWithOptions();
    var deleteArray = [];
    this.allgroupmsgs.forEach(element => {
      if (element.selected == true) {
        deleteArray.push(element)
      }
    });
    console.log("deleteArray :" + deleteArray.length)
    this.GruopChatProvider.deleteMessage(deleteArray).then(res => {
      // this.forwardClick = false;
      this.deleteFlag = false;
      this.loadingdismiss();
      this.getchat(this.scrollValue)
    }).catch(erre => {
      this.loadingdismiss();
      this.getchat(this.scrollValue)
    })
  }
  forward() {
    var deleteArray = [];
    this.allgroupmsgs.forEach(element => {
      if (element.selected == true) {
        deleteArray.push(element)
      }
    });
    console.log("deleteArray :" + deleteArray.length)

    this.deleteFlag = false;
    this.forwardFlag = false;
    this.forwardClick = false;
    var obj = {
      "forward": deleteArray,
      "chatinfo": this.buddy,
      "flag": "group"
      // "buddyInfo": this.buddydetails
    }

    this.navCtrl.navigateForward('groupcreation', {
      queryParams: obj,
    })
  }
  async assigntask(msg, i) {
    console.log(msg, i);
    var data = {
      msg_data: msg,
      // buddy_mob: this.buddydetails.mobile,
      // buddy_name: this.buddydetails.username
    }

    const modal = await this.modalController.create({
      component: AssigntaskPage,
      componentProps: data
    });

    modal.onDidDismiss().then((dataReturned) => {
      this.allgroupmsgs = [];
      // this.selected_msg = [];
      // this.selection_status = false;
      this.getchat(this.scrollValue);
      this.scrollToBottomOnInit();
      // if (dataReturned !== null) {
      //   this.dataReturned = dataReturned.data;
      //   //alert('Modal Sent Data :'+ dataReturned);
      // }
    });

    return await modal.present();
    // this.navCtrl.navigateForward('assigntask',{
    //   queryParams:data
    //   })
  }
  removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }
  clearunreadmessage() {
    var data = {
      uid: this.Uid,
      groupkey: this.groupkey,
    }
    this.service.PostRequest(this.service.mainAPI + '/updateGroupUnreadtcount', data).then(res => {
      this.loadingdismiss();

    }).catch(erre => {
      this.loadingdismiss();

    });
  }


  getchat(scrollValue) {
    this.presentLoadingWithOptions();
    this.allgroupmsgs = [];
    console.log("calling getchat");

    this.groupname = this.GruopProvider.group['groupname'];
    this.groupkey = this.GruopProvider.group['groupkey'];
    this.groupImage = this.GruopProvider.group['groupimage'];
    this.groupcreated = this.GruopProvider.group['groupcreated'];
    this.opengroup = this.GruopProvider.group['opengroup'];


    this.Uid = localStorage.getItem('LinkususerID')

    this.alignuid = localStorage.getItem('LinkususerID')
    this.sendername = localStorage.getItem('username')
    this.experts = localStorage.getItem('experts');
    console.log("this.experts :" + this.experts)

    this.GruopChatProvider.data = [];
    this.clearunreadmessage();

    console.log("calling getchat 2");

    if (this.networkProvider.CurrentStatus == true) {
      this.GruopChatProvider.getGroupMessage(this.groupkey, this.groupname, scrollValue).then((data: any) => {
        // loading.dismiss();
        console.log("live changed load :" + JSON.stringify(data))
        this.loadingdismiss();


        data.forEach(element => {

          if (element.sentby != this.Uid) {
            this.GruopChatProvider.updatechatmesage(this.groupkey, element.sentby).then(res => {
              console.log("status_change :" + JSON.stringify(res))
              this.loadingdismiss();

            }).catch(err=>{
              this.loadingdismiss();

            })
          }
          if (element.sentby != this.Uid && element.status == "1") {
            this.unreadCount++;
          }
          console.log("this.unreadCount 1111111:" + this.unreadCount)


          console.log("opengroup checkig :" + this.opengroup)
          if (this.opengroup) {
            console.log("opengroup 1  :" + element.experts + ":" + this.Uid)
            if (element.experts == this.Uid || element.sentby == this.Uid || element.experts == "null" || element.experts == "undefined") {
              console.log("opengroup 12 :" + element.experts + ":" + this.Uid)

              var array = {
                groupkey: element.groupkey,
                message: element.message,
                groupname: this.groupname,
                sentby: element.sentby,
                sendername: element.sendername,
                fileextension: element.fileextension,
                photourl: element.photourl,
                groupimage: this.groupImage,
                timestamp: element.timestamp,
                location: element.location,
                replydisplayname: element.replydisplayname,
                filetype: element.filetype,
                tagmessage: element.tagmessage,
                tagfileextension: element.tagmessage,
                tagtime: element.tagtime,
                Tagsend: element.Tagsend,
                Tagto: element.Tagto,
                Date: element.Date,
                tagfiletype: element.tagfiletype,
                Taglatitude: element.Taglatitude,
                Taglocation: element.Taglocation,
                Filedate: element.Filedate,
                status: element.status,
                Taskfrom: element.Taskfrom,
                Taskto: element.Taskto,
                experts: element.experts,
                opengroup: element.opengroup,
                unreadCount: this.unreadCount,
                countStatus: element.status,
                forwardmsg: element.forwardmsg,
                selectedColor: "none",
                showMore: false
              }
              this.allgroupmsgs.push(array)
              if (this.platform.is('android')) {
                // this.GroupDatabaseProvider.insertRecords(array, element.status).then(res => {

                // })
              }
            }
          }
          else {
            console.log("else opengroup 1")

            var array1 = {
              groupkey: element.groupkey,
              message: element.message,
              groupname: this.groupname,
              sentby: element.sentby,
              sendername: element.sendername,
              photourl: element.photourl,
              groupimage: this.groupImage,
              timestamp: element.timestamp,
              replydisplayname: element.replydisplayname,
              filetype: element.filetype,
              fileextension: element.fileextension,
              tagmessage: element.tagmessage,
              tagfileextension: element.tagfileextension,
              tagtime: element.tagtime,
              Tagsend: element.Tagsend,
              Tagto: element.Tagto,
              Date: element.Date,
              tagfiletype: element.tagfiletype,
              Taglatitude: element.Taglatitude,
              Taglocation: element.Taglocation,
              Filedate: element.Filedate,
              status: element.status,
              Taskfrom: element.Taskfrom,
              Taskto: element.Taskto,
              opengroup: element.opengroup,
              location: element.location,
              unreadCount: this.unreadCount,
              countStatus: element.status,
              forwardmsg: element.forwardmsg,
              selectedColor: "none",
              showMore: false
            }
            this.allgroupmsgs.push(array1)

            // if (this.platform.is('android')) {
            //   this.GroupDatabaseProvider.insertRecords(array1, element.status).then(res => {

            //   })
            // }
          }
        });
        console.log("this.allgroupmsgs :" + this.allgroupmsgs.length)
        this.temparray = data;
        this.unreadMessageShow();
        this.allgroupmsgs.sort(function (a, b) {
          var c = new Date(parseInt(a.timestamp));
          var d = new Date(parseInt(b.timestamp));
          return c > d ? 1 : -1;
        });
        this.scrollToBottomOnInit();
        var currentLetter = null;

        this.allgroupmsgs.forEach((value) => {

          var getStr = value.timestamp;
          var getdata = new Date(parseInt(value.timestamp));
          var today = new Date();
          var tday1 = new Date();
          console.log("currentLetter 1:" + getdata + ":" + currentLetter)

          tday1.setDate(tday1.getDate() - 1);

          var yesterday1 = tday1.getDate() + '-' + (tday1.getMonth() + 1) + '-' + tday1.getFullYear();

          if (this.convertDateFormat(getdata) != currentLetter && "Today" != currentLetter) {
            if (this.convertDateFormat(getdata) == this.convertDateFormat(today)) {
              console.log("currentLetter 2 :" + currentLetter)
              currentLetter = "Today";

            }

            else {
              currentLetter = this.convertDateFormat(getdata);
            }

            // console.log("currentLetter 2:" + currentLetter + ":" + getdata + ":" + value.timestamp)

            value.timeset = currentLetter;

            console.log(" value.timeset" + value.timeset);
            this.removeDups(this.allgroupmsgs);
          }

        });


        if (this.platform.is('android')) {
          // this.offline_online();
        }
        this.loadingdismiss();



      }).catch(err => {
        console.log(err);
        this.loadingdismiss();
      })
    }
    else {
      if (this.platform.is('android') || this.platform.is('ios')) {
      }
    }

    // })
  }
  unreadMessageShow() {
    console.log("unreadMessageShow");
    var currentLetter = null;
    var today = new Date();

    var unreadMessageCount = 0;
    this.allgroupmsgs.forEach((value, index) => {

      if (currentLetter != "txt" && value.sentby != this.Uid && value.countStatus == "1") {
        currentLetter = "txt"
        value.unreadMessageCount = value.unreadCount + " UNREAD MESSAGE";
      }
      console.log("value.unreadMessageCount :" + value.countStatus + ":" + value.sentby + ":" + value.unreadMessageCount)

      if (value.status == "1") {
        value.status = "2"

        this.socket.emit('status_change', value);
      }

    });


  }
  //socket emit servbice

  send(msg) {

    console.log("Send item :" + JSON.stringify(msg))
    if (msg != '') {


      // Push the message through socket 
      this.socket.emit('groupmessage', msg);
    }
    this.newmessage = "";
    // this.chat_input='';
  }

  dataURLtoFile(dataURI, filename) {
    ////console.log(dataURI)
    ////console.log(filename)

    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  // Create a new name for the image
  private createFileName1() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".png";
    return newFileName;
  }

  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  Mappopover(latitude) {
    this.gteMapLatLong = latitude;
    this.maptitleStyle = '1';

    if (this.mapshowpop == 'false') {
      console.log("drag true")
      this.mapshowpop = 'true'
    }
    else {
      console.log("drag false")
      this.mapshowpop = 'false'
    }



    if (this.showpop == 'true') {
      this.showpop = 'false'
    }

  }
  ZoomFile(file) {
    // this.photoViewer.show(file);
    var obj = {
      src: file,
      images: this.allgroupmsgs,
    }
    //this.photoViewer.show(file);
    this.navCtrl.navigateRoot('zoom', {
      queryParams: obj,
    })
  }

  openLocation(val) {

    if (val == 0) {
      window.open('https://google.com/maps/?q=' + this.gteMapLatLong, '_system');
    }
    else {
      this.platform.ready().then(() => {

        this.geolocation.getCurrentPosition().then((position) => {

          if (this.platform.is('ios') || this.platform.is('android')) {
            // ios
            if (this.platform.is('ios')) {
              window.open('maps://?q=' + "Shared location" + '&daddr=' + this.gteMapLatLong, '_system');
            };
            // android
            if (this.platform.is('android')) {
              window.open('geo://' + '?q=' + this.gteMapLatLong + '(' + "Shared location" + ')', '_system');
            };
          }
          else {
            this.presentAlert('Mobile devices only supported')
          }

        });
      })
    }
  }
  closePopover() {
    if (this.showpop == 'true') {
      this.showpop = 'false'
    }

    if (this.mapshowpop == 'true') {
      this.mapshowpop = 'false'
    }
  }
  popover() {
    console.log("popover click:" + this.showpop)

    this.titleStyle = '1';

    if (this.showpop == 'false') {
      console.log("drag true")
      this.showpop = 'true'
    }
    else {
      console.log("drag false")
      this.showpop = 'false'
    }

    if (this.mapshowpop == 'true') {
      this.mapshowpop = 'false'
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
      // return "<u onclick=Window.myComponent.myfunction('https://www.cbd.ae/docs/default-source/default-document-library/unblock-mobile-app-v2.pdf')>Click here</u>";
      // return "<u style='color:blue' onclick=Window.myComponent.myfunction('" + gettdat1 + "')>Click here</u>";

      return ' <a href="' + gettdat1 + '" target="_blank">' + text + '</a> ';
    })
  }
  trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  }

  // sent text messgae
  sendMessage() {
    this.unreadCount = null;
    this.addmessagehide = false;
    this.txtKeyUp();
    this.allgroupmsgs.forEach(element => {
      if (element.unreadMessageCount != null) {
        element.unreadMessageCount = null;
      }
    });
    console.log("userExperts :" + this.userExperts)
    if (this.newmessage != null && this.newmessage != '') {

      var dateNow = new Date();

      // var d = new Date(this.allgroupmsgs[key].timestamp);
      var hours = dateNow.getHours();
      var minutes = "0" + dateNow.getMinutes();
      var month = dateNow.getMonth();
      var da = dateNow.getDate();

      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      var formattedTime = monthNames[month] + "-" + da + "-" + hours + ":" + minutes.substr(-2);
      var status = "0";
      if (this.networkProvider.CurrentStatus == true) {
        status = "1";
      }

      var sendDate = new Date();
      var experts = false;
      if (this.opengroup == true && this.experts != undefined) {
        experts = this.experts;
      }

      var array1 = {
        groupname: this.groupname,
        groupkey: this.groupkey,
        message: this.urlify(this.Textbold(this.newmessage)),
        sentby: this.Uid,
        sendername: this.sendername,
        photourl: this.photourl,
        groupimage: this.groupImage,
        timestamp: new Date().getTime(),
        replydisplayname: this.replydisplayname,
        filetype: "text",
        experts: this.userExperts,
        tagmessage: this.tagmessage,
        tagfileextension: this.tagfileextension,
        tagtime: this.tagtime,
        Tagsend: this.Tagsend,
        Tagto: this.Tagto,
        Date: new Date(),
        tagfiletype: this.filetype,
        Taglatitude: this.latitude,
        Taglocation: this.location,
        Filedate: new Date(),
        status: status,
        Taskfrom: '',
        Taskto: '',
        opengroup: this.opengroup,
        forwardmsg: null,
        selectedColor: "none",
        showMore: false

      }
      this.send(array1)
      this.allgroupmsgs.push(array1);
      this.scrollToBottomOnInit();

      //offline data insert
      // if (this.platform.is('android')) {
      //   // this.nativeAudio.play('sent', () => console.log('sent is done playing'));
      //   this.GroupDatabaseProvider.insertRecords(array1, status).then(res => {
      //   })
      // }
      this.GruopChatProvider.createMessage(array1, this.groupcreated, this.groupmembers).then(res => {
        console.log("seneded")
        // online data insert
        if (this.networkProvider.CurrentStatus == true) {
          // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
        }
      });

      // }

      this.userExperts = null;
      this.newmessage = '';
      this.tagmessage = '';
      this.tagtime = '';
      this.filetype = '';
      this.latitude = '';
      this.location = '';
      this.Tagsend = '';
      this.replydisplayname = '';
      this.tempMsg = '';
      this.showEmojiPicker = false;
      this.Replycancel();

    }





  }
  //priya
  startRecord() {
    this.newMsgBtn = false;

    if (this.platform.is('ios')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
      this.audiofilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.audiofilePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.mp3';
      this.audiofilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;

      this.audio = this.media.create(this.audiofilePath);

    }

    if (this.platform.is('ios') || this.platform.is('android')) {
      this.audio.startRecord();
      this.recording = true;
      //this.countTimeDuration(1);
      console.log("record duration :" + this.audio.getDuration() + " : " + this.audio.getCurrentPosition);
    }

  }
  stopRecord() {
    this.mediaRecordFlag = false;
    this.newMsgBtn = true;
    if (this.platform.is('ios') || this.platform.is('android')) {

      this.audio.stopRecord();
      let data = { filename: this.fileName };
      //this.audioList.push(data);
      //this.sendRecord = this.audio;
      //localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recording = false;
      //this.getAudioList();
      console.log("File path 1212:" + this.fileName + " : " + this.audiofilePath)


      //online sent
      this.saveRecord();

      //this.countTimeDuration(0);
    }

  }
  //priya
  cancelRecord() {
    this.mediaRecordFlag = true;
    this.newMsgBtn = true;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.audio.stopRecord();
      this.recording = false;
    }


  }
  // Audio Methods (priya)
  saveRecord() {
    let metadata = {
      contentType: 'audio/mp3',
    };
    let filePath = `${this.file.externalDataDirectory}` + `${this.fileName}`;
    var newPath = this.file.externalDataDirectory.replace(/file:\/\//g, 'app-file://') + this.fileName;
    console.log("filePath :" + filePath + ":" + newPath)
    var sendDate = new Date();
    this.file.readAsDataURL(this.file.externalDataDirectory, this.fileName).then((file) => {
      // loader.dismiss();

      var status = "0";
      if (this.networkProvider.CurrentStatus == true) {
        status = "1";
      }
      var experts = false;
      if (this.opengroup == true && this.experts != undefined && this.experts == true) {
        experts = this.experts;
      }
      var array = {
        groupkey: this.groupkey,
        message: file,
        sentby: this.Uid,
        sendername: this.sendername,
        photourl: this.photourl,
        groupimage: this.groupImage,
        timestamp: new Date().getTime(),
        filetype: "mp3",
        experts: null,
        tagmessage: this.tagmessage,
        tagfileextension: this.tagfileextension,
        tagtime: this.tagtime,
        replydisplayname: this.replydisplayname,
        tagfiletype: this.filetype,
        timeset: null,
        Tagsend: this.Tagsend,
        Tagto: this.Tagto,
        Date: new Date(),
        Taglatitude: this.latitude,
        Taglocation: this.location,
        Filedate: new Date(),
        status: status,
        Taskfrom: '',
        Taskto: '',
        opengroup: this.opengroup,
        groupname: this.groupname,
        forwardmsg: null,
        selectedColor: "none",
        showMore: false

      }
      this.send(array)
      this.allgroupmsgs.push(array);
      this.scrollToBottomOnInit();

      //offline data insert
      // if (this.platform.is('android')) {
      //   // this.nativeAudio.play('sent', () => console.log('sent is done playing'));
      //   this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
      //   })
      // }
      this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
        console.log("seneded")
        // online data insert
        if (this.networkProvider.CurrentStatus == true) {
          // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
        }
      });


    })

  }
  BackButtonAction() {
    console.log("BackButtonAction")
  }

  // Registering
  ionViewDidEnter() {
    console.log('ionViewDidEnter :' + this.networkProvider.forwardFlow);
    this.setUIBackButtonAction();
    if (this.networkProvider.forwardFlow == true) {
      this.scrollValue = 10;
      this.getchat(this.scrollValue)
    }

    // if(this.allgroupmsgs.length!=0){
    //   this.allgroupmsgs.forEach(element => {
    //     element.selectedColor="none"

    //   });
    // }
  }
  closeModal() {
    this.menu.enable(false, 'first');
    // this.menu.open('first');
  }
  setUIBackButtonAction() {
    this.backButton.onClick = () => {
      // handle custom action here
      console.log("back lcik")
      var todo = {
        uid: this.Uid,
        backclick: true
      }
      this.socket.emit('recentmessgae', todo);

      // this.navCtrl.navigateRoot(['/home']);
      this.navCtrl.navigateRoot(['/home'])

      // this.navCtrl.navigateRoot('home');

    };
  }

  Replycancel() {

    this.addmessagehide = false;
    this.tagmessage = null;
    this.tagtime = null;
    this.tagfileextension = null;

  }
  switchEmojiPicker() {

    if (this.showEmojiPicker == false) {
      console.log("drag true")
      this.showEmojiPicker = true;
    }
    else {
      this.showEmojiPicker = false;
    }

    this.scrollToBottomOnInit();
  }

  async liveLocation(groupkey1, groupkey, sendername) {
    this.showpop = 'false'

    console.log("liveLocation 1 :" + groupkey + ":" + sendername)
    if (this.platform.is('android') || this.platform.is('ios')) {


      const permissions = Object.keys(this.LocationPERMISSION).map(k => this.LocationPERMISSION[k]);
      this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
        console.log("requestAllPermissions :" + JSON.stringify(status));
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          console.log("canRequest :" + JSON.stringify(canRequest))
          if (canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                this.mobileLcoation(groupkey, groupkey, sendername)
              },
              error => {
                this.presentAlert("Please allow permission to access your location")
              }
            );
          }

        });


      }, error => {
        console.log('requestAllPermissions Error: ' + error);

      });

    }
    else {
      var status = "0";
      if (this.networkProvider.CurrentStatus == true) {
        status = "1";
      }
      console.log("groupkey 11 :" + groupkey + ":" + sendername)
      const modal = await this.modalController.create({
        component: GooglelocationPage,
        componentProps: {
          buddy: groupkey,
          locationValue: groupkey,
          buddyname: sendername,
        }
      });


      modal.present();
      modal.onWillDismiss().then(data => {
        console.log("data:" + JSON.stringify(data))

        if (data != undefined && data["data"]["currlatLng"] != undefined) {
          console.log("before send ahat1")

          var array = {
            groupname: this.groupname,
            groupkey: this.groupkey,
            message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
            sentby: this.Uid,
            sendername: this.sendername,
            photourl: this.photourl,
            groupimage: this.groupImage,
            timestamp: new Date().getTime(),
            replydisplayname: this.replydisplayname,
            filetype: "map",
            tagmessage: this.tagmessage,
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            Tagto: this.Tagto,
            Date: new Date(),
            experts: null,
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            Taglocation: this.location,
            Filedate: new Date(),
            status: status,
            Taskfrom: '',
            Taskto: '',
            opengroup: this.opengroup,
            forwardmsg: null,
            selectedColor: "none",
            showMore: false


          }

          this.send(array)
          this.allgroupmsgs.push(array);
          this.scrollToBottomOnInit();

          //offline data insert
          // if (this.platform.is('android')) {
          //   // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

          //   this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
          //   })
          // }
          this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
            console.log("seneded")
            // online data insert
            if (this.networkProvider.CurrentStatus == true) {
              // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
            }
          });


        }
      });

    }


  }
  txtKeyUp() {
    console.log("txtKeyUp:" + this.message)
    var obj = {
      sender: this.Uid,
      senderName: localStorage.getItem('username'),
      groupkey: this.groupkey,
      typing: false
    }
    this.socket.emit('group_user_typing', obj);
  }
  searchshow() {
    this.searchinput = true;
    this.tempArrayList = [];
    this.tempArrayList = this.allgroupmsgs;
    console.log("this.tempArrayList :" + this.tempArrayList.length)

  }

  onCancel(event) {
    this.searchinput = false;
    this.scrollValue = 10;
    this.getchat(this.scrollValue)
  }
  StyleChange(data) {
    // console.log("StyleChange :" + data)
    if (data.length > 0) {

      var obj = {
        sender: this.Uid,
        groupkey: this.groupkey,
        senderName: localStorage.getItem('username'),
        typing: true
      }
      this.socket.emit('group_user_typing', obj);
    }
    else {
      this.txtKeyUp();
    }
    if (data.trim() != "") {
      // console.log(data);
      // var splitString = data.split(' ')[0];
      // var lastword = splitString.slice(-1);
      // var actualmessge = splitString.slice(1, length - 1);
      // var contentBold = actualmessge.bold();
      var range = [];

      for (var i = 0; i < data.split(' ').length; i++) {
        range.push(data.split(' ')[i]);
      }


      // console.log("range 1  :" + range + "  : " + range.length);
      // console.log("range 2:" + range.join(' '));
      var rangespace = range.join(' ');
      // console.log("rangespace 1:" + JSON.stringify(rangespace))
      // debugger;


      for (i = 0; i < rangespace.length; i++) {
        if (range[i] != undefined && range.length != 0) {
          // console.log("rangespace ==" + range[i].charAt(0) + " : " + range[i].charAt(range[i].length - 1))
          if ((range[i].charAt(0) == '*' && range[i].length > 2) && (range[i].charAt(range[i].length - 1) == '*' && range[i].length > 2)) {
            var contentBold = range[i].slice(1, length - 1);
            var sliceText = contentBold.bold();
            range[i] = sliceText;
            this.newmessage = range.join(' ');
            // console.log("final :" + this.newmessage);


          }
          else if ((range[i].charAt(0) == '_' && range[i].length > 2) && (range[i].charAt(range[i].length - 1) == '_' && range[i].length > 2) || range[i] == '\n') {
            var contentBold = range[i].slice(1, length - 1);
            var sliceText = contentBold.italics();
            range[i] = sliceText;
            this.newmessage = range.join(' ');
            // console.log("final 1:" + this.newmessage);
          }
          else if ((range[i].charAt(0) == '_' && range[i].length > 2) && (range[i].charAt(range[i].length - 1) == '_' && range[i].length > 2)) {
            var contentBold = range[i].slice(1, length - 1);
            var sliceText = contentBold.italics();
            range[i] = sliceText;
            this.newmessage = range.join(' ');
            // console.log("final 2:" + this.newmessage);
          }
          else if ((range[i].charAt(0) == '$' && range[i].length > 1) && (range[i].charAt(range[i].length - 1) == '$' && range[i].length > 1)) {
            var contentBold = range[i].slice(1, length - 1);
            var temp = '<u>' + contentBold + '</u>';
            range[i] = temp;
            this.newmessage = range.join(' ');
            // console.log("final 3:" + this.newmessage);
          }
        }


      }
    }



  }
  updateScroll() {
    console.log('updating scroll')
    this.scrollToBottomOnInit()
  }
  // camera 
  sendPicCamera() {

    if (this.showpop == 'true') {
      this.showpop = 'false'
    }

    this.presentLoadingWithOptions();
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true //Corrects Android orientation quirks
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log("sendPicCamera :" + imageData)
      // let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.crop.crop(imageData, { quality: 100 })
        .then(
          newImage => {

            this.Base64.encodeFile(newImage).then((base64File: string) => {
              var base64result = base64File.split(',')[1]
              console.log("sendPicCamera 2 :" + base64result);


              var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

              var imagename = "linkus" + imagecif + ".jpg";
              var profilepic = "data:image/jpeg;base64," + base64result;
              var file = this.dataURLtoFile(profilepic, imagename);
              var url = this.service.mainAPI + '/uploadlinkusimage';
              const formData: any = new FormData();
              formData.append("upload", file, imagename);

              var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

              console.log("sendPicCamera 2222 :" + imagename);

              //offline data insert
              if (this.networkProvider.CurrentStatus == false) {
                this.loadingdismiss();

                var sendDate = new Date();
                var status1 = "0";

                var array1 = {
                  groupname: this.groupname,
                  groupkey: this.groupkey,
                  message: profilepic,
                  sentby: this.Uid,
                  sendername: this.sendername,
                  photourl: this.photourl,
                  groupimage: this.groupImage,
                  timestamp: new Date().getTime(),
                  fileextension: this.createFileName(),
                  replydisplayname: this.replydisplayname,
                  filetype: "image",
                  experts: null,
                  tagmessage: this.tagmessage,
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  Filedate: new Date(),
                  status: status1,
                  Taskfrom: '',
                  Taskto: '',
                  opengroup: this.opengroup,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false

                }

                this.allgroupmsgs.push(array1);
                this.scrollToBottomOnInit();
                if (this.platform.is('android')) {
                  // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

                  console.log("before sending :" + JSON.stringify(array1))
                  // this.GroupDatabaseProvider.insertRecords(array1, status1).then(res => {
                  //   console.log("Sending susess insertRecords")

                  // })
                  this.GruopChatProvider.createMessage(array1, "1", this.groupmembers);

                }
              }
              else {
                console.log("sendPicCamera 333 :" + imagename);

                this.http.post(url, formData)

                  .subscribe(
                    (value) => {
                      console.log("sendPicCamera 3");

                      // this.CompanyLogo = this.IpaddressProvider.ImagePath + imagename;
                      // console.log("subscribe value1:" + this.CompanyLogo + ":" + JSON.stringify(value));
                      this.loadingdismiss();


                    },
                    // success,
                    (err) => {
                      // this.CompanyLogo = this.callservice.ImagePath + imagename;
                      // console.log("subscribe value2:" + this.CompanyLogo + ":" + JSON.stringify(err));
                      // myDialog.close()
                      this.loadingdismiss();
                      console.log("sendPicCamera 4");

                      var sendDate = new Date();
                      var status = "0";
                      if (this.networkProvider.CurrentStatus == true) {
                        status = "1";
                      }
                      var array = {
                        groupname: this.groupname,
                        groupkey: this.groupkey,
                        message: this.service.ImagePath + imagename,
                        sentby: this.Uid,
                        sendername: this.sendername,
                        photourl: this.photourl,
                        groupimage: this.groupImage,
                        timestamp: new Date().getTime(),
                        fileextension: this.createFileName(),
                        replydisplayname: this.replydisplayname,
                        filetype: "image",
                        experts: null,
                        tagmessage: this.tagmessage,
                        tagfileextension: this.tagfileextension,
                        tagtime: this.tagtime,
                        Tagsend: this.Tagsend,
                        Tagto: this.Tagto,
                        Date: new Date(),
                        tagfiletype: this.filetype,
                        Taglatitude: this.latitude,
                        Taglocation: this.location,
                        Filedate: new Date(),
                        status: status,
                        Taskfrom: '',
                        Taskto: '',
                        opengroup: this.opengroup,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false

                      }


                      this.send(array)
                      this.allgroupmsgs.push(array);
                      this.scrollToBottomOnInit();
                      console.log("sendPicCamera 5");

                      //offline data insert
                      if (this.platform.is('android')) {
                        // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

                        // this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
                        // })
                      }
                      console.log("sendPicCamera 6");

                      this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
                        console.log("sendPicCamera 7");
                        // online data insert
                        if (this.networkProvider.CurrentStatus == true) {
                          // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                        }
                      });


                    })
              }


            }).catch((err) => {
              this.loadingdismiss();

            })
          }, (err) => {
            this.loadingdismiss();

            console.log(err);
            console.error('Error cropping image', err);
          });


    }, (err) => {
      this.loadingdismiss();

      // Handle error
      //loader.dismiss();
      console.log(err)
    })

  }

  // gallery
  addGallery() {
    this.presentLoadingWithOptions();
    if (this.showpop == 'true') {
      this.showpop = 'false'
    }
    console.log("addGallery 1")
    let options1 = {
      maximumImagesCount: 8,
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
    }

    console.log("addGallery 2")

    var sendDate = new Date();
    this.ImagePicker.getPictures(options1).then((results) => {
      console.log("Selected file list :" + JSON.stringify(results));

      if (results.length == 0) {
        this.loadingdismiss();
      }
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);

        this.filepath.resolveNativePath(results[i])
          .then(filePath => {
            console.log("galleryPicMsg 2:" + JSON.stringify(filePath))
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            var currentName = filePath.substr(filePath.lastIndexOf("/") + 1);

            this.file.readAsDataURL(correctPath, currentName).then((file) => {
              console.log("file 3:" + file)


              var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

              var imagename = "linkus" + imagecif + ".jpg";
              var profilepic = file;
              var file1 = this.dataURLtoFile(profilepic, imagename);
              var url = this.service.mainAPI + '/uploadlinkusimage';
              const formData: any = new FormData();
              formData.append("upload", file1, imagename);

              //offline data insert
              if (this.networkProvider.CurrentStatus == false) {
                this.loadingdismiss();

                var status1 = "0";

                var array1 = {
                  groupname: this.groupname,
                  groupkey: this.groupkey,
                  message: profilepic,
                  sentby: this.Uid,
                  sendername: this.sendername,
                  photourl: this.photourl,
                  groupimage: this.groupImage,
                  timestamp: new Date().getTime(),
                  fileextension: this.createFileName(),
                  replydisplayname: this.replydisplayname,
                  filetype: "image",
                  experts: null,
                  tagmessage: this.tagmessage,
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  Filedate: new Date(),
                  status: status1,
                  Taskfrom: '',
                  Taskto: '',
                  opengroup: this.opengroup,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false

                }

                this.allgroupmsgs.push(array1);
                this.scrollToBottomOnInit();
                if (this.platform.is('android')) {
                  // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

                  console.log("before sending :" + JSON.stringify(array1))
                  // this.GroupDatabaseProvider.insertRecords(array1, status1).then(res => {
                  //   console.log("Sending susess insertRecords")

                  // })
                  this.GruopChatProvider.createMessage(array1, "1", this.groupmembers);

                }


              }
              else {

                this.http.post(url, formData)

                  .subscribe(
                    (value) => {
                      this.loadingdismiss();



                      console.log("galleryPicMsg 4")
                    },
                    // success,
                    (err) => {
                      this.loadingdismiss();

                      var status = "0";
                      if (this.networkProvider.CurrentStatus == true) {
                        status = "1";
                      }
                      var array = {
                        groupname: this.groupname,
                        groupkey: this.groupkey,
                        message: this.service.ImagePath + imagename,
                        sentby: this.Uid,
                        sendername: this.sendername,
                        photourl: this.photourl,
                        groupimage: this.groupImage,
                        timestamp: new Date().getTime(),
                        fileextension: this.createFileName(),
                        replydisplayname: this.replydisplayname,
                        filetype: "image",
                        experts: null,
                        tagmessage: this.tagmessage,
                        tagfileextension: this.tagfileextension,
                        tagtime: this.tagtime,
                        Tagsend: this.Tagsend,
                        Tagto: this.Tagto,
                        Date: new Date(),
                        tagfiletype: this.filetype,
                        Taglatitude: this.latitude,
                        Taglocation: this.location,
                        Filedate: new Date(),
                        status: status,
                        Taskfrom: '',
                        Taskto: '',
                        opengroup: this.opengroup,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false

                      }

                      this.send(array)
                      this.allgroupmsgs.push(array);
                      this.scrollToBottomOnInit();

                      //offline data insert
                      // if (this.platform.is('android')) {
                      //   // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

                      //   this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
                      //   })
                      // }
                      this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
                        console.log("seneded")
                        // online data insert
                        if (this.networkProvider.CurrentStatus == true) {
                          // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                        }
                      });


                      // loader.dismiss();
                      console.log("galleryPicMsg 4")
                    })
              }
            })


          });


      }

    }, (err) => {
      this.loadingdismiss();

    });

  }
  async AllowedFormats() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "File Format Only Images are allowed (  PNG | JPEG | GIF | dotx | xls | PDF | TXT | flv | avi | mp4)",
      buttons: [
        // {
        //   text: 'No',
        //   handler: (blah) => {
        //     console.log('Confirm Cancel: blah');
        //   }
        // },
        {
          text: 'Yes',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();

  }
  //  Gallery file updated (priya)(new)
  galleryPicMsg() {


    if (this.platform.is('android') || this.platform.is('ios')) {
      this.presentLoadingWithOptions();
      const permissions = Object.keys(this.PERMISSION).map(k => this.PERMISSION[k]);
      this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
        console.log("requestAllPermissions :" + JSON.stringify(status));
        if (status != undefined && status.CAMERA != "DENIED") {
          if (this.showpop == 'true') {
            this.showpop = 'false'
          }
          // let loader = this.loadingCtrl.create({
          //   content: 'Loading  media...'
          // });
          // loader.present();

          this.ImghandlerProvider.fileChooser().then((filePath) => {
            console.log("galleryPicMsg 1:" + JSON.stringify(filePath))
            var getinfo = filePath["Type"].split('/')
            var getfileExtention = filePath["fileExtention"];
            var FileURL = filePath["FileURL"]
            var sendDate = new Date();

            

            if (getinfo[0] == 'potx' || getinfo[0] == 'pptx' || getinfo[0] == 'ppa' || getinfo[0] == 'pps' ||
              getinfo[0] == 'PDF' || getinfo[0] == 'pdf' || getinfo[0] == 'xla' || getinfo[0] == 'xlt' ||
              getinfo[0] == 'xlsx' || getinfo[0] == 'xls' || getinfo[0] == 'docx' || getinfo[0] == 'dot' ||
              getinfo[0] == 'doc' || getinfo[0] == 'dotx' || getinfo[0] == 'flv' || getinfo[0] == 'avi' || getinfo[0] == 'mp4' ||
              getinfo[0] == 'GIF' || getinfo[0] == 'gif' || getinfo[0] == 'jpeg' || getinfo[0] == 'JPEG' ||
              getinfo[0] == 'PNG' || getinfo[0] == 'png' || getinfo[0] == 'jpg' || getinfo[0] == 'JPG' || getinfo[0] == 'application' || getinfo[0] == 'dotx' || getinfo[0] == 'doc' || getinfo[0] == 'dot' || getinfo[0] == 'docx' || getinfo[0] == 'xls' || getinfo[0] == 'xlsx' || getinfo[0] == 'xlt' || getinfo[0] == 'xla' || getinfo[0] == 'pdf' || getinfo[0] == 'PDF' || getinfo[0] == 'pps' || getinfo[0] == 'ppa' || getinfo[0] == 'pptx' || getinfo[0] == 'potx' || getinfo[0] == 'txt' || getinfo[0] == 'TXT') {

              console.log("galleryPicMsg 2:" + JSON.stringify(filePath))


              // this.filepath.resolveNativePath(getURL["FileURL"])
              //   .then(filePath => {

              console.log("galleryPicMsg 2:" + JSON.stringify(filePath))
              let correctPath = filePath["filepath"]
              var currentName = filePath["fileExtention"]
              // loader.dismiss();


              // this.filepath.resolveNativePath(filePath)
              // .then(filePath => {
              //   console.log("galleryPicMsg 2:" + JSON.stringify(filePath))
              //   let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              //   var currentName = filePath.substr(filePath.lastIndexOf("/") + 1);
              console.log("galleryPicMsg 3:" + correctPath + ":" + currentName)

              this.file.readAsDataURL(correctPath, currentName).then((file) => {
                console.log("galleryPicMsg 4:" + JSON.stringify(file))


                var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

                var imagename = currentName;
                var profilepic = file;
                var file1 = this.dataURLtoFile(profilepic, imagename);
                var url = this.service.mainAPI + '/uploadlinkusimage';
                const formData: any = new FormData();
                formData.append("upload", file1, imagename);

                //offline data insert
                if (this.networkProvider.CurrentStatus == false) {
                  this.loadingdismiss();

                  var status = "0";

                  var array1 = {
                    groupname: this.groupname,
                    groupkey: this.groupkey,
                    message: profilepic,
                    sentby: this.Uid,
                    sendername: this.sendername,
                    photourl: this.photourl,
                    groupimage: this.groupImage,
                    timestamp: new Date().getTime(),
                    replydisplayname: this.replydisplayname,
                    filetype: getinfo[0],
                    experts: null,
                    fileextension: currentName,
                    tagmessage: this.tagmessage,
                    tagfileextension: this.tagfileextension,
                    tagtime: this.tagtime,
                    Tagsend: this.Tagsend,
                    Tagto: this.Tagto,
                    Date: new Date(),
                    tagfiletype: this.filetype,
                    Taglatitude: this.latitude,
                    Taglocation: this.location,
                    Filedate: new Date(),
                    status: status,
                    Taskfrom: '',
                    Taskto: '',
                    opengroup: this.opengroup,
                    forwardmsg: null,
                    selectedColor: "none",
                    showMore: false

                  }

                  this.allgroupmsgs.push(array1);
                  this.scrollToBottomOnInit();
                  if (this.platform.is('android')) {
                    // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

                    console.log("before sending :" + JSON.stringify(array1))
                    // this.GroupDatabaseProvider.insertRecords(array1, status).then(res => {
                    //   console.log("Sending susess insertRecords")

                    // })
                    this.GruopChatProvider.createMessage(array1, "1", this.groupmembers);

                  }

                }
                else {

                  this.http.post(url, formData)

                    .subscribe(
                      (value) => {
                        this.loadingdismiss();

                        var status = "0";
                        if (this.networkProvider.CurrentStatus == true) {
                          status = "1";
                        }
                        var array = {
                          groupname: this.groupname,
                          groupkey: this.groupkey,
                          message: this.service.ImagePath + imagename,
                          sentby: this.Uid,
                          sendername: this.sendername,
                          photourl: this.photourl,
                          groupimage: this.groupImage,
                          fileextension: currentName,
                          timestamp: new Date().getTime(),
                          replydisplayname: this.replydisplayname,
                          filetype: getinfo[0],
                          experts: null,
                          tagmessage: this.tagmessage,
                          tagfileextension: this.tagfileextension,
                          tagtime: this.tagtime,
                          Tagsend: this.Tagsend,
                          Tagto: this.Tagto,
                          Date: new Date(),
                          tagfiletype: this.filetype,
                          Taglatitude: this.latitude,
                          Taglocation: this.location,
                          Filedate: new Date(),
                          status: status,
                          Taskfrom: '',
                          Taskto: '',
                          opengroup: this.opengroup,
                          forwardmsg: null,
                          selectedColor: "none",
                          showMore: false

                        }
                        this.send(array)
                        this.allgroupmsgs.push(array);
                        this.scrollToBottomOnInit();

                        //offline data insert
                        if (this.platform.is('android')) {
                          // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

                          // this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
                          // })
                        }
                        this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
                          console.log("seneded")
                          // online data insert
                          if (this.networkProvider.CurrentStatus == true) {
                            // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                          }
                        });


                        console.log("galleryPicMsg 4")
                      },
                      // success,
                      (err) => {
                        this.loadingdismiss();

                        var status = "0";
                        if (this.networkProvider.CurrentStatus == true) {
                          status = "1";
                        }
                        var array = {
                          groupname: this.groupname,
                          groupkey: this.groupkey,
                          message: this.service.ImagePath + imagename,
                          sentby: this.Uid,
                          sendername: this.sendername,
                          photourl: this.photourl,
                          fileextension: currentName,
                          groupimage: this.groupImage,
                          timestamp: new Date().getTime(),
                          replydisplayname: this.replydisplayname,
                          filetype: getinfo[0],
                          experts: null,
                          tagmessage: this.tagmessage,
                          tagfileextension: this.tagfileextension,
                          tagtime: this.tagtime,
                          Tagsend: this.Tagsend,
                          Tagto: this.Tagto,
                          Date: new Date(),
                          tagfiletype: this.filetype,
                          Taglatitude: this.latitude,
                          Taglocation: this.location,
                          Filedate: new Date(),
                          status: status,
                          Taskfrom: '',
                          Taskto: '',
                          opengroup: this.opengroup,
                          forwardmsg: null,
                          selectedColor: "none",
                          showMore: false
                        }

                        this.send(array)
                        this.allgroupmsgs.push(array);
                        this.scrollToBottomOnInit();

                        //offline data insert
                        // if (this.platform.is('android')) {
                        //   // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

                        //   this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
                        //   })
                        // }
                        this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
                          console.log("seneded")
                          // online data insert
                          if (this.networkProvider.CurrentStatus == true) {
                            // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                          }
                        });

                      })
                }
              },
                // success,
                (err) => {
                  console.log("galleryPicMsg err:" + JSON.stringify(err))
                  this.loadingdismiss();

                })

            }
            else {
              this.AllowedFormats();
              this.loadingdismiss();
            }

          }).catch((err) => {
            this.loadingdismiss();
            console.log('fileChooser Error2: ' + JSON.stringify(err));
            // loader.dismiss();
          })

        } else {
          alert("Please allow permission to access your media files")
        }

      }, error => {
        console.log('requestAllPermissions Error: ' + error);

      });

    }
  }

  getPermission(url, fileName, filetype) {

    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.downloadFile(url, fileName, filetype);
        }
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                this.downloadFile(url, fileName, filetype);
              }
            });
        }
      });
  }
  downloadFile(url, fileName, filetype) {

    const fileTransfer: FileTransferObject = this.FileTransfer.create();

    fileTransfer.download(url, this.file.externalRootDirectory +
      '/Download/' + fileName).then()
    let fileExtn = fileName.split('.').reverse()[0];
    let fileMIMEType = this.getMIMEtype(fileExtn);
    this.fileOpener.open("file:///storage/emulated/0/download/" + fileName + "", fileMIMEType)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));


  }
  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      'txt': 'text/plain',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'bmp': 'image/bmp',
      'png': 'image/png',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf': 'application/rtf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }
  convertDate(date) {
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'agu', 'sep', 'oct', 'nov', 'dec'];
    var day = date.getDate();
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    return day + "-" + month + "-" + year;
  }
  convertDateFormat(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    return (dd + "-" + mm + "-" + yyyy);

  }
  clickEVent() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  addMember() {

    var obj = {
      groupname: this.groupname,
      groupkey: this.groupkey,
      opengroup: this.opengroup,
      groupImage: this.groupImage,
    }


    this.navCtrl.navigateForward('addgroupmember', {
      queryParams: obj,
    })
  }

  groupInfo() {
    var obj = {
      groupname: this.groupname,
      groupkey: this.groupkey,
      opengroup: this.opengroup,
      groupImage: this.groupImage,
    }


    this.navCtrl.navigateForward('groupmember', {
      queryParams: obj,
    })
  }
  fileFilter() {
    var obj = {
      "message": this.allgroupmsgs,
      groupname: this.groupname,
      groupkey: this.groupkey,
      opengroup: this.opengroup,
      groupImage: this.groupImage,
      groupmembers: this.groupmembers
    }
    this.navCtrl.navigateForward('file-filter', {
      queryParams: obj,
    })
  }

  async chatfilter(chatmemberlist) {

    if (this.datacheckflag == true) {
      this.datacheckflag = false;
      this.tempArrayList = this.allgroupmsgs;
    }


    var data = {
      groupmembers: chatmemberlist,
    }


    const model = await this.modalController.create({
      component: SearchFilterPage,
      componentProps: data
    });

    model.present();
    model.onWillDismiss().then(data => {

      console.log("onDidDismiss : " + JSON.stringify(data));

      if (data != undefined) {

        if (data["data"]["fromdate"] != undefined) {
          var fromDate = new Date(data["data"]["fromdate"]);

          var date1 = new Date().toISOString();
          var fromDate1 = new Date(date1);
          fromDate.setHours(0);
          fromDate.setMinutes(0)
          fromDate.setSeconds(0);

          var toDate = new Date(data["data"]["todate"]);
          toDate.setHours(0);
          toDate.setMinutes(0)
          toDate.setSeconds(0);

          // if (toDate < fromDate) {
          if (fromDate > toDate) {
            this.presentAlert('Enter valid date');

          }
          else if (toDate > fromDate1) {
            this.presentAlert('Enter valid date');
          }
          else {
            var mainarray = [];
            this.allgroupmsgs = []
            this.tempArrayList.forEach(element => {
              var getdata = new Date(parseInt(element.timestamp))
              getdata.setHours(0);
              getdata.setMinutes(0);
              getdata.setSeconds(0);

              console.log("check:" + getdata + ":" + fromDate + ":" + toDate)

              if (this.dateCheck(this.convertDateFormat1(fromDate), this.convertDateFormat1(toDate), this.convertDateFormat1(getdata)) == true) {

                mainarray.push(element);
                this.allgroupmsgs.push(element);
                console.log("filan :" + JSON.stringify(this.allgroupmsgs))

                if (data["data"]["person"][0] != undefined) {
                  this.allgroupmsgs = mainarray.filter((v) => {
                    for (var i = 0; i < data["data"]["person"].length; i++) {
                      console.log("person :" + v.sentby + ":" + data["data"]["person"][i].uid)
                      if (v.sentby.indexOf(data["data"]["person"][i].uid) > -1) {
                        return true;
                      }

                    }

                  })
                }
                else {
                  this.allgroupmsgs = mainarray;
                }
              }

            });

          }

        }
        else {

          this.allgroupmsgs = this.tempArrayList;
          console.log("filan :" + JSON.stringify(this.allgroupmsgs))

        }
      }


    });
  }

  dateCheck(from, to, check) {

    var fDate, lDate, cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if ((cDate <= lDate && cDate >= fDate)) {
      return true;
    }
    return false;
  }
  convertDateFormat1(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    return (yyyy + "-" + mm + "-" + dd);
  }

  //exit group (priya)

  async exitGroup() {
    if (this.isRemoved == true) {
      this.service.presentToast("You are not part of this Group,You alreday exit from the group");
    }
    
    
    else{
    const statusalert = await this.alertController.create({
      // header: 'Ad!',
      message: "Do you want exit '" + this.groupname + "' group?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "cancelbtn",
          handler: () => {
            //something to do 
          }
        },
        {
          text: "Ok",
          // cssClass: "confirmbtn",
          handler: () => {

            //  Deleted group
            var timestamp=new Date().getTime();
            this.GruopProvider.Exitgroup(this.Uid, this.groupkey,timestamp).then(() => {
              // this.navCtrl.pop();
              // this.RecentDBProvider.deleteRecentDb(localStorage.getItem('LinkususerID'), this.groupkey)
              var todo = {
                uid: this.Uid,
                backclick: true
              }
              this.socket.emit('recentmessgae', todo);

              this.navCtrl.navigateForward('home', {
              })

            }).catch((err) => {
              console.log(err);
            })

          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
  }
  }
  async presentAlert(tittle) {
    var alert = await this.alertController.create({

      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
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

  updateImage() {
    let actionSheet = this.actionSheet.create({
      header: 'Choose options',
      buttons: [
        {
          text: 'Take photo',
          icon: 'camera-outline',
          handler: () => {
            this.cameraImage();
          }
        },
        {
          text: 'Choose photo from Gallery',
          icon: 'aperture-outline',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }


  //Poopandi camera  

  openGallery() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true //Corrects Android orientation quirks
    }
    this.presentLoadingWithOptions();

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      this.crop.crop(imageData, { quality: 100 })
        .then(
          newImage => {

            this.Base64.encodeFile(newImage).then((base64File: string) => {
              var base64result = base64File.split(',')[1]
              console.log("base64File :" + base64result);
              var base64Image = "data:image/jpeg;base64," + base64result;

              this.loadingdismiss();
              this.udpateImage(base64Image);


            }).catch((err) => {

            })
          }, (err) => {
            this.loadingdismiss();

            console.log(err);
            console.error('Error cropping image', err);
          });

    },
      error => {
        this.loadingdismiss();

        console.error('Erro gally image', error);
      }
    );

  }

  onPress($event, item, i) {
    this.stopInterval();

    this.selecteItem = item;
    this.textIndex = i;

    console.log("onPress", $event);
    this.pressState = 'pressing';
    this.startInterval();
  }

  onPressUp($event) {
    this.progress = 0;
    console.log("onPressUp", $event);
    this.pressState = 'released';
    this.stopInterval();
  }


  startInterval() {
    const self = this;
    this.interval = setInterval(function () {
      self.progress = self.progress + 1;
      console.log("self.progress:" + self.progress)
      if (self.progress == 5) {
        console.log("click :" + self.progress)
        self.Event(self.selecteItem, self.textIndex);
      }
    }, 50);
  }

  stopInterval() {
    if (this.interval != undefined) {
      clearInterval(this.interval);

    }
  }
  stopLocation(message, timestamp, sentby) {
    this.presentAlertConfirm('', 'Stop Sharing Live Location?', timestamp, sentby)

  }
  async presentAlertConfirm(heading, tittle, timestamp, sentby) {
    const alert = await this.alertController.create({
      header: heading,
      message: tittle,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Stop',
          handler: () => {
            clearInterval(this.myTimerInterval);



            this.GruopChatProvider.updatechatlocationmesage(this.groupkey, timestamp, sentby).then(res => {
              console.log("status_change :" + JSON.stringify(res))
              this.getchat(this.scrollValue);
            }).catch(err => {
              this.getchat(this.scrollValue);

            })

          }
        }
      ]

    });

    await alert.present();
  }
  async mobileLcoation(locationValue, groupkey, sendername) {
    console.log("mobileLcoation 2 :" + groupkey + ":" + sendername)

    const model = await this.modalController.create({
      component: GooglelocationPage,
      componentProps: {
        locationValue: locationValue,
        buddyname: sendername,
        buddy: groupkey
      }
    });

    model.present();
    model.onWillDismiss().then(data => {
      if (data != undefined && data["data"]["currlatLng"] != undefined) {
        var mapType = "map"

        if (data["data"]["live"] == true) {
          mapType = "map live";

          var self = this;
          this.myTimerInterval = setInterval(function () {
            var options = {
              maximumAge: 3000,
              enableHighAccuracy: true
            };

            self.locationAccuracy.request(self.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                // When GPS Turned ON call method to get Accurate location coordinates
                self.geolocation.getCurrentPosition().then((pos) => {

                  const location = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    time: new Date(),
                    uid: groupkey,
                    type: "2",
                    sender: groupkey,
                    receiver: groupkey
                  };
                  console.log('live_location sharing..', location);

                  self.socket.emit('live_location', location);

                }, (err: PositionError) => {
                  console.log("getCurrentPosition error : " + err.message);
                });


              },
              error => console.log(" getCurrentPosition Error:" + error)
            );

          }, 10000); //300000

        }
        var status = "0";
        if (this.networkProvider.CurrentStatus == true) {
          status = "1";
        }

        var array = {
          groupname: this.groupname,
          groupkey: this.groupkey,
          message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
          sentby: this.Uid,
          sendername: this.sendername,
          photourl: this.photourl,
          groupimage: this.groupImage,
          timestamp: new Date().getTime(),
          replydisplayname: this.replydisplayname,
          filetype: mapType,
          experts: null,
          tagmessage: this.tagmessage,
          tagfileextension: this.tagfileextension,
          tagtime: this.tagtime,
          Tagsend: this.Tagsend,
          Tagto: this.Tagto,
          Date: new Date(),
          tagfiletype: this.filetype,
          Taglatitude: this.latitude,
          Taglocation: this.location,
          Filedate: new Date(),
          status: status,
          Taskfrom: '',
          Taskto: '',
          opengroup: this.opengroup,
          livelocation: true,
          forwardmsg: null,
          selectedColor: "none",
          showMore: false

        }

        //this.send(array);
        this.send(array)
        this.allgroupmsgs.push(array);
        this.scrollToBottomOnInit();

        //offline data insert
        // if (this.platform.is('android')) {
        //   // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

        //   this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
        //   })
        // }
        this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
          console.log("seneded")
          // online data insert
          if (this.networkProvider.CurrentStatus == true) {
            // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
          }
        });



        // this.chatservice.addnewmessage("googleLoc:" + data.currlatLng + ':' + data.currlatLongng, "map", this.tagmessage, this.tagtime, this.filetype, this.latitude, this.location, null, new Date(), this.tagfileextension, "", "", "").then(() => {
        //   this.newmessage = '';
        // })
        // this.content.scrollToBottom();

      }
    });
  }

  //priya
  async addMarker() {
    this.showpop = 'false'

    if (this.platform.is('android') || this.platform.is('ios')) {


      const permissions = Object.keys(this.LocationPERMISSION).map(k => this.LocationPERMISSION[k]);
      this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
        console.log("requestAllPermissions :" + JSON.stringify(status));
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          console.log("canRequest :" + JSON.stringify(canRequest))
          if (canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                this.mobileLcoation("", "", "");
              },
              error => {
                this.presentAlert("Please allow permission to access your location")
              }
            );
          }

        });


      }, error => {
        console.log('requestAllPermissions Error: ' + error);

      });

    }
    else {
      var status = "0";
      if (this.networkProvider.CurrentStatus == true) {
        status = "1";
      }
      console.log("Call model")
      const modal = await this.modalController.create({
        component: GooglelocationPage,
        componentProps: {

        }
      });


      modal.present();
      modal.onWillDismiss().then(data => {
        console.log("data:" + JSON.stringify(data))
        var mapType = "map"

        if (data != undefined && data["data"]["currlatLng"] != undefined) {
          console.log("before send ahat1")
          if (data["data"]["live"] == true) {
            mapType = "map live";
          }

          var array = {
            groupname: this.groupname,
            groupkey: this.groupkey,
            message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
            sentby: this.Uid,
            sendername: this.sendername,
            photourl: this.photourl,
            groupimage: this.groupImage,
            timestamp: new Date().getTime(),
            replydisplayname: this.replydisplayname,
            filetype: mapType,
            tagmessage: this.tagmessage,
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            Tagto: this.Tagto,
            Date: new Date(),
            experts: null,
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            Taglocation: this.location,
            Filedate: new Date(),
            status: status,
            Taskfrom: '',
            Taskto: '',
            opengroup: this.opengroup,
            livelocation: true,
            forwardmsg: null,
            selectedColor: "none",
            showMore: false

          }

          this.send(array)
          this.allgroupmsgs.push(array);
          this.scrollToBottomOnInit();

          //offline data insert
          // if (this.platform.is('android')) {
          //   // this.nativeAudio.play('sent', () => console.log('sent is done playing'));

          //   this.GroupDatabaseProvider.insertRecords(array, status).then(res => {
          //   })
          // }
          this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
            console.log("seneded")
            // online data insert
            if (this.networkProvider.CurrentStatus == true) {
              // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
            }
          });


        }
      });

    }
  }

  udpateImage(base64Image) {

    this.presentLoadingWithOptions();
    console.log("base64Image :" + base64Image)
    this.groupImage = base64Image;
    var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

    var imagename = "Linkus_profile" + imagecif + ".jpg";
    var file = this.dataURLtoFile(base64Image, imagename);
    var url = this.service.mainAPI + '/uploadlinkusimage';
    const formData: any = new FormData();
    formData.append("upload", file, imagename);

    this.http.post(url, formData)

      .subscribe(
        (value) => {
          this.loadingdismiss();
          var obj = {
            groupkey: this.groupkey
          }
          this.GruopProvider.updateGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
            this.socket.emit('groupinfo', obj);

          }).catch(err => {
            this.socket.emit('groupinfo', obj);
          })

          this.GruopProvider.updateRecentChatGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {


          })
        },
        // success,
        (err) => {
          this.loadingdismiss();

          this.GruopProvider.updateGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
            this.loadingdismiss();
          }).catch(err => {
            this.loadingdismiss();
          })
        })
  }

  async changeGroupName() {
    const alert1 = await this.alertController.create({
      header: 'Confirmation!',
      inputs: [
        {
          name: 'input1',
          type: 'text',
          value: this.groupname,
          max: 10,
          // maxlength:'10',
          placeholder: 'Please Enter Group Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            //console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            //console.log(alertData.input1);
            if (alertData.input1 != undefined && alertData.input1 != "") {
              // this.presentLoadingWithOptions();
              var obj = {
                groupname: alertData.input1,
                groupkey: this.groupkey
              }
              this.GruopProvider.updateGroupName(alertData.input1, this.groupkey).then(res => {
                this.socket.emit('groupinfo', obj);

              }).catch(err => {
                this.socket.emit('groupinfo', obj);
              })


            }

          }
        }
      ]
    });
    await alert1.present();
  }
  cameraImage() {


    this.presentLoadingWithOptions();
    this.camera.getPicture(this.optionsCamera).then((imageData) => {
      console.log("sendPicCamera :" + imageData)
      this.loadingdismiss();
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.udpateImage(base64Image);

    }, (err) => {
      // Handle error
      //loader.dismiss();
      this.loadingdismiss();
      console.log("err:" + JSON.stringify(err))
    })
  }
  async group_call() {

    const modal = await this.modalController.create({
      component: GroupmemberPage,
      componentProps: {
        groupname: this.groupname,
      groupkey: this.groupkey,
      opengroup: this.opengroup,
      groupImage: this.groupImage,
      "group_call": true,
      }
    });

    modal.onDidDismiss().then((dataReturned) => {

    });
  }
  async menuCLick() {

    const popover = await this.popoverController.create({
      component: GroupmenuComponent,
      cssClass: 'pop',
      // event: ev
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      console.log("menuCLick onDidDismiss : " + JSON.stringify(data));
      if (data["data"].buddyinfo == "1") {
        this.clickEVent(); //open slide bar
      }
      else if (data["data"].buddyinfo == "2") {
        this.fileFilter(); //open file filter
      }
      else if (data["data"].buddyinfo == "3") {

        this.filterChatList();

      }
      else if (data["data"].buddyinfo == "4") {

      }
    })
  }

  filterChatList() {
    var contactList = [];
    if (this.allgroupmsgs.length != 0) {
      this.allgroupmsgs.forEach(element => {
        if (contactList.indexOf(element.sentby) == -1) {
          contactList.push(element.sentby)
        }
      });
      console.log("contactList :" + JSON.stringify(contactList))

      var chatmemberlist = [];
      this.groupmembers.forEach(element1 => {
        contactList.forEach(element => {
          if (element1.uid == element) {
            chatmemberlist.push(element1)
          }
        });
      });


      this.chatfilter(chatmemberlist); //open chat filter

    }
  }
}
