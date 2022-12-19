/**
 * Imports
 */

import { UserProvider } from "../../providers/user/user";

import { BuddyRecentDBProvider } from "../../providers/ServerDb/buddyRecentDB";
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

import { GruopProvider } from "../../providers/ServerDb/group";

import { AuthenticationService } from '././../services/Authentication.service';


import { Component, ViewChild, OnInit, NgZone, HostListener, ElementRef, ChangeDetectorRef, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { formatDate } from '@angular/common';

import { PopoverController, ToastController, NavController, ModalController, ActionSheetController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { AssigntaskPage } from '../assigntask/assigntask.page';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
// import { http } from '@angular/http';
import { IonBackButtonDelegate } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
// import { IonicPage, NavController, NavParams, App, ActionSheet, Events, Content, ToastController, LoadingController, MenuController, ModalController, ActionSheetController, Platform, Img, AlertController, TextInput } from 'ionic-angular';
// import { ChatProvider } from '../../providers/chat/chat';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { NetworkService } from "../network.service";
import { Network } from '@ionic-native/network/ngx'

// import { NetworkService } from '../../providers/network/NetworkService';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
// import $ from 'jquery'
// import { Clipboard } from '@ionic-native/clipboard';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Geolocation, PositionError } from '@ionic-native/geolocation/ngx';

import { File } from '@ionic-native/file/ngx';
// import 'rxjs/add/observable/interval';
// declare var cordova: any;
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { JsonPipe } from '@angular/common';
// import {AudiostartRecording,AudiostopRecording} from "../assets/js/Audio.js";
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { LoginProvider } from "../../providers/ServerDb/loginprovider";
declare var MediaRecorder: any;
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { DoubleTapDirective } from '../directives/double-tap.directive';

// import { ServerDbSelfdestructProvider } from '../../providers/ServerDb/couch-db-selfdestruct'
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
// import * as io from 'socket.io-client';
import { GooglelocationPage } from "../googlelocation/googlelocation.page";
import { SearchFilterPage } from "../search-filter/search-filter.page";
import { HttpClient } from '@angular/common/http/';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject, Observable } from 'rxjs';

import { EventsService } from "../events.service";
import { BuddymenuComponent } from "../buddymenu/buddymenu.component";
//local db
import { NativeAudio } from '@ionic-native/native-audio/ngx';
// import { VideoPage } from "../video/video.page";
import { VideocallPage } from "../videocall/videocall.page";
// import { async } from '@angular/core/testing';
// import { isNgTemplate, TransitiveCompileNgModuleMetadata } from '@angular/compiler';

import { TakephotoPage } from '../takephoto/takephoto.page';
import { MultipleimageuploadPage } from '../multipleimageupload/multipleimageupload.page';
import { GroupmenuComponent } from "../groupmenu/groupmenu.component";
import { GruopChatProvider } from "../../providers/ServerDb/groupChat";
import { MenuController } from '@ionic/angular';
import { AddgroupmemberPage } from '../addgroupmember/addgroupmember.page';
import { Storage } from '@ionic/storage';
import { CalendarComponent } from 'ionic2-calendar';
import { ContactlistPage } from '../contactlist/contactlist.page';
import { ViewphotoPage } from '../viewphoto/viewphoto.page';
import { GroupcreationPage } from '../groupcreation/groupcreation.page';
import { FileFilterPage } from '../file-filter/file-filter.page';
import { ChangepwdPage } from '../changepwd/changepwd.page';
import { ZoomPage } from '../zoom/zoom.page';
import { GallerylistComponent } from '../gallerylist/gallerylist.component';
import { GroupgallerylistComponent } from '../groupgallerylist/groupgallerylist.component';
import { GroupmemberPage } from '../groupmember/groupmember.page';
import { GrouplistPage } from '../grouplist/grouplist.page';
declare var window;
import { DeleterecentComponent } from '../deleterecent/deleterecent.component'
import { CopyTextComponent } from "../copy-text/copy-text.component";
import { MainmenuComponent } from '../mainmenu/mainmenu.component';
import { CustomizeComponent } from '../customize/customize.component';
declare var $;


@Component({
  selector: 'app-webchat',
  templateUrl: './webchat.page.html',
  styleUrls: ['./webchat.page.scss'],
})

/**
 * Start of the class & initializing global variables
 */


export class WebchatPage implements OnInit {
  @ViewChild('inputId', { static: false }) ionInput: { setFocus: () => void; };
  @ViewChild('inputId1', { static: false }) ionInput1: { setFocus: () => void; };

  chatfilterValue: boolean = false;
  statusreadarray = [];
  contactsselect = [];
  singleChatActive: boolean = false;
  groupChatActive: boolean = false;
  @ViewChild("textarea1") textarea1: ElementRef;
  @ViewChild("textarea2") textarea2: ElementRef;
  audioWeb: any;
  myJoinedTimeStamp: any;

  searchTerms: any;
  myGroupTimestamp: any;
  cleartimestamp: any;
  profileInfo: any;
  files: any;
  nofiles: boolean = false;
  my_no: any = localStorage.getItem('LinkususerID');
  sent_files = [];
  received_files = [];
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
  favouritechat: any;
  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  myeventres: any;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  @ViewChild('imgRenderer') imgRenderer: ElementRef;
  emp_description: any;

  mytask: any;
  mytask_res: any;
  taskmsg: any;
  assigned_by: any;
  assigned_to: any;
  status: any;
  assigned_on: any;
  due_at: any;
  notask: boolean = false;
  statusoption = [
    { name: "Assign", value: "1" },
    { name: "Reopen", value: "2" },
    { name: "Accepted", value: "3" },
    { name: "Resolved", value: "4" },
    { name: "Closed", value: "5" },
  ];
  statusoption1 = [
    { name: "Reopen", value: "2" },
    { name: "Closed", value: "5" },
  ];
  statusoption2 = [
    { name: "Accepted", value: "3" },
    { name: "Resolved", value: "4" },
  ]
  // clicked:boolean = false;
  clicked = [];

  clickedIndex: any;
  searchstring: any = '';
  // date:any = new Date(Date.now()).toLocaleDateString();
  date: any;
  day: number = Date.now();
  public backgroundLive;
  public backgroundAll;
  public fontcolorlive;
  public fontcolorall
  myprofilekey: boolean;
  calendarpage: boolean;
  myshelfpage: boolean;
  mompage: boolean;
  birthdaypage: boolean;
  projectmilestonepage: boolean;
  starredmessage: boolean;
  milestones = [];
  tcreate: boolean;
  tview: boolean = false;
  projectname: any;
  request: any = 0;
  projectid: any;
  allprojects: any;
  project: any;
  projectstat: any;
  statusview = [];
  progress1: any;

  admin: any;
  private FilterValue = 0;
  contacts = [];
  Tempcontacts = [];
  mynumber: any;
  totalcontacts: boolean;
  totalgroups: boolean;
  aboutuskey: boolean;
  myrequests: any;
  myfriends;
  tempmyfriends: any;
  Tempmdata: any;
  allmygroups = [];
  opengrps = [];
  pageActive: boolean = false;
  //
  colorCode: any;
  buddies: boolean;
  buddychatright: boolean;
  @ViewChild(IonBackButtonDelegate, { static: false }) backButton: IonBackButtonDelegate;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('content') private content: any;
  buddydetails: any;
  userName: any;
  tarea_size: any = 3;
  tarea_size_min: any = 1;
  mom_msg = '';
  message = '';
  allmessages = [];
  currentUser = '';
  message_id: any;
  message_id1: any;
  old_message: any;
  selected_msg = [];
  selection_status: boolean = false;
  pressed: boolean = false;
  sentby_name: any;
  sentto_name: any;
  unreadCount = 0;

  BuddyTyping: boolean = false;
  buddyblocked: boolean = false;
  myblocked: boolean = false;

  // video call 
  forwardFlag: boolean = false;
  deleteFlag: boolean = false;


  forwardClick: boolean = false;
  deleteClick: boolean = false;


  showCall: boolean;
  showHangup: boolean;
  showAnswer: boolean;
  showReject: boolean;
  showStatus: boolean;
  showRemoteVideo: boolean = true;
  showMyVideo: boolean = true;
  groupmembers1: any;
  groupmembers2: any;
  session;
  webRTCClient;
  incomingCallId = 0;
  myCallId;

  calleeId;
  myTimerInterval: any;
  slideBoolean: boolean = false;
  datacheckflag: boolean = true;
  //
  groupmembers: any;
  showEmojiPicker = false;

  webFileUploadname: any;
  webFileUploadFileType: any;

  mediaRecordFlag: boolean = false;
  mediaRecorder;
  // file save local folder
  private win: any = window;
  localfileName: any;
  FileBase64: any;
  Uid: any;
  replyId: any;
  // Audio play variable
  nativepath: any;
  recording: boolean = false;
  audiofilePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  theTimeout: any;
  audio1 = [];
  recordedAudio;
  rec;
  blockId;
  blockRev;
  newMsgBtn: boolean = true;


  public progress: number = 0;
  public pressState: string = "released";

  // Interval function
  protected interval: any;

  sendRecord: any;

  // @ViewChild(Content) contentArea: Content;
  // @ViewChild(Navbar) navBar: Navbar;
  buddy: any;
  imgornot;
  imgornottag
  videohide: boolean = true;
  viewStatus: boolean = false;
  blockkEY: boolean = false;
  block: any;
  openGroup: any;
  language: any;
  selfdestruct: boolean;
  disappear: boolean;
  Tagsend;
  Tagto;
  tagmessage;
  tagtime;
  tagfileextension;
  filetype;
  latitude;
  location;
  addmessagehide: boolean;
  forwardmessage;
  blockedcontact: boolean = false;
  multiplecheck: boolean = true;
  chatmessage: any;
  timeself;
  messagecheck: boolean = false;
  deletebtn: boolean = true;
  forwardbtn: boolean = true;
  selfdestructmessage: boolean = false;
  multipledelete = [];
  mobileicon: boolean;
  showpopSingle: boolean = false;
  showpopGroup: boolean = false;
  showpopGroup1: boolean = false;
  group_call1: boolean = false;
  titleStyle: any;

  mapshowpop: any;
  maptitleStyle: any;
  gteMapLatLong: any;
  buddyinfo: any;
  selfId: any;
  selfRev: any;
  callid: any;
  callName: any;
  // set google map API
  pageAlive: boolean = false;
  getMap = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyD_Lmybdnx6s2TjMvPK57fD44xGjjJPA8A&'
  // private optionsGallery: CameraOptions = {
  //   quality: 100,
  //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }
  taskmessageto;
  taskmessagefrom;
  webimagename: any;
  owenertask: boolean;
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true //Corrects Android orientation quirks
  }

  // Poopandi
  // You can add many other permissions
  PERMISSION = {
    WRITE_EXTERNAL: this.diagnostic.permission.WRITE_EXTERNAL_STORAGE,
    READ_EXTERNAL: this.diagnostic.permission.READ_EXTERNAL_STORAGE,
    CAMERA: this.diagnostic.permission.CAMERA
  };

  LocationPERMISSION = {
    ACCESS_COARSE_LOCATION: this.diagnostic.permission.ACCESS_COARSE_LOCATION,
  };
  // Interval function
  // protected interval: any;

  limitCount = 10;
  offset = 0;
  private finishedLoading: boolean = false;

  tempMsg = '';
  displayName: any;
  photourl: any;
  temparray = [];
  matches = [];
  scrollValue: any;
  tempArrayList = [];
  searchinput: boolean = false;
  private selecteItem: string;
  textIndex: string;
  subscription: Subscription;
  self_destruct: boolean = false;
  imageLink: any;
  temp_disable: boolean = false;
  groupchat: boolean;


  //group chat

  activeGroup: boolean = true;
  groupcreated;


  isRemoved: boolean = false;

  groupMember: any;
  owner: boolean = false;
  groupname;
  groupImage;
  groupkey;

  newmessage;
  TempgroupMessage: any;
  allgroupmsgs = [];
  starredallmessages = [];
  alignuid: any;
  sendername;

  replyMsg: boolean = false;
  userExperts: any;
  opengroup: boolean = false;
  offlineChatinfo = [];
  el: HTMLElement;

  base64Image: any;

  avatar: string;
  replydisplayname;

  webFileUploadfiletype: any;

  experts: any;

  BuddyTypingName: any;
  showdraghome: any;

  myChatinfo: any;
  UserName: any;
  designation: any;
  profileImg: any;
  rightmember: boolean;

  groupKey: any;
  groupName: any
  owerInfo: boolean = false;
  groupinfor: any;
  contactsSelected: any;
  myInfo: any;

  owener: boolean = false;

  tones = [{ name: 'Calling', value: 'calling' }, { name: 'Flame', value: 'flame' }, { name: 'Hello', value: 'hello' }, { name: 'Lumia', value: 'lumia' }];
  calltone = localStorage.getItem('callertone');
  oldtone = localStorage.getItem('callertone');
  public employee_details: any = [];

  calledby: any;
  agenda: any;
  attendes: any;
  attendes1: any;
  discussion: any;
  conclusion: any;
  contact_res: any;

  tot_attendes: any = '';
  groupmom: any;

  me = localStorage.getItem('LinkususerID');

  mycontacts = [];
  sortedcontacts = [];
  showloading: boolean = false;
  contacts1: any;
  nodata: boolean;
  mytaskpage: boolean = false;
  groupmembersinlist: boolean;
  // messages: Array<Message> = [];
  // message: string = '';
  lastMessageId;
  showEmojis = false;
  score = {
    tone: '',
    score: 0,
  };
  projectlist1 = [];
  private scrollDepthTriggered = false;
  deleteFlag1: boolean;
  compid: any;

  /**
 * end of the global variables & starting of constructor
 */


  constructor(public router: Router, public actionSheetController: ActionSheetController, private Storage: Storage, private LoginProvider: LoginProvider, private activatedRoute: ActivatedRoute, private GruopChatProvider: GruopChatProvider, private popoverController: PopoverController, private actionSheet: ActionSheetController, private toastCtrl: ToastController, private fileOpener: FileOpener, private FileTransfer: FileTransfer, private file: File, public ImagePicker: ImagePicker, private media: Media, private ImghandlerProvider: ImghandlerProvider, private filepath: FilePath, private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy, private localNotifications: LocalNotifications, private menu: MenuController, private geolocation: Geolocation, private http: HttpClient, private service: ApiserviceService, private crop: Crop, private Base64: Base64, private cd: ChangeDetectorRef, private speechRecognition: SpeechRecognition, @Inject(LOCALE_ID) private locale: string, public modalController: ModalController, public alertController: AlertController, private events: EventsService, private camera: Camera, private diagnostic: Diagnostic, private photoViewer: PhotoViewer, private nativeAudio: NativeAudio, private networkProvider: NetworkService, private network: Network, private authService: AuthenticationService, private socket: Socket, private ApiserviceService: ApiserviceService, private GruopProvider: GruopProvider, private BuddyChatProvider: BuddyChatProvider, private BuddyRecentDBProvider: BuddyRecentDBProvider, public sanitizer: DomSanitizer, private platform: Platform, private loadingCtrl: LoadingController, public navCtrl: NavController,


    public alertCtrl: AlertController) {
    this.compid = localStorage.getItem('compid');
    this.scrollValue = 70;
    this.groupmembers1 = [];
    this.menu.enable(false, 'second');
    this.menu.open('second');
    this.showdraghome = 'false';
    this.nodata = true;
    this.buddies = true;
    this.pageActive = true;
    //   this.colorCode=this.ThemeSwitcherService.DayColorCode;
    this.receiveRecentChat();
    this.forwardFlag = false
    this.deleteFlag = false
    this.deleteFlag1 = false

    console.log("constructor")

    this.network.onConnect().subscribe(() => {
      //  this.onlinedata(this.scrollValue);
    })


    this.UserName = localStorage.getItem("name");
    this.designation = localStorage.getItem("designation");
    this.profileImg = localStorage.getItem("photourl");

    this.date = new Date().toISOString().split('T')[0];

    this.getmytask();
  }
  /**
   * Setting scrollbar value
   */


  myFunction($event) {

    if (this.scrollDepthTriggered) {
      return;
    }
    var elmnt = document.getElementById("messagesContent");
    var x = elmnt.scrollLeft;
    var y = elmnt.scrollTop;

    console.log("scroll :" + y);

    if (y == 0 && this.searchinput == false) {
      // this.getUsersList();
      this.scrollValue = parseInt(this.scrollValue) + 10;
      this.scrollrefresh(this.scrollValue, 550);
    }


    // this.getUsersList();
    // this.scrollValue = parseInt(this.scrollValue) + 10;
    // this.scrollrefresh(this.scrollValue, 550);

  }

  /**
 * Setting scrol value after loading the list
 */

  scrollrefresh(scrollValue, scrollpoint) {
    // this.presentLoadingWithOptions();

    var data = {
      message_id: this.message_id,
      message_id1: this.message_id1,
      limit: scrollValue
    }


    this.cleartimestamp = null;
    console.log("onlinedata called:" + this.networkProvider.CurrentStatus)
    if (this.networkProvider.CurrentStatus == true) {
      // this.presentLoadingWithOptions();
      this.service.PostRequest(this.service.mainAPI + '/buddy_chatlist', data).then(res => {
        console.log(res);
        this.loadingdismiss();

        this.old_message = res;
        this.allmessages = [];


        this.unreadCount = 0;
        this.old_message.forEach(async element => {
          if ((element.mydelete != "1" && element.sentby == localStorage.getItem('LinkususerID')) || (element.sentby != localStorage.getItem('LinkususerID') && (element.mydelete != "1" && element.buddydelete != "1"))) {

            // if ((element.mydelete != "1" && element.sentby == localStorage.getItem('LinkususerID')) || (element.sentby != localStorage.getItem('LinkususerID') && element.buddydelete != "1")) {

            // this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180605T034427Z.91af97712fd4c7f6.993ff04220e6d494d3d4ea4f43259d296031b85d&text=' + element.message + '&lang=ta').subscribe(resp => {

            //   var obj = JSON.parse(resp['_body'])

            //   if (obj.text.length > 0) {

            if (element.sentby != this.Uid && element.status == "1") {
              this.unreadCount++;
            }
            console.log("this.unreadCount 1111111:" + this.unreadCount)

            var messgaetxt = null;
            if (element.sentby == this.Uid) {
              if (this.ApiserviceService.decryptText(element.message).indexOf('UnBlocked') > -1) {
                messgaetxt = "You UnBlocked " + this.buddydetails.username;
              }
              else if (this.ApiserviceService.decryptText(element.message).indexOf('Blocked') > -1) {
                messgaetxt = "You Blocked " + this.buddydetails.username;
              }
              else {
                messgaetxt = this.ApiserviceService.decryptText(element.message)
              }
            }
            else {
              if (this.ApiserviceService.decryptText(element.message).indexOf('UnBlocked') > -1) {
                messgaetxt = this.buddydetails.username + " UnBlocked You";
              }
              else if (this.ApiserviceService.decryptText(element.message).indexOf('Blocked') > -1) {
                messgaetxt = this.buddydetails.username + " Blocked You";
              }
              else {
                messgaetxt = this.ApiserviceService.decryptText(element.message)
              }
            }

            var item = {
              createdAt: element.timestamp,
              filetype: element.filetype,
              msgtype: element.filetype,
              message: messgaetxt,
              sentby: element.sentby,
              message_id: element.message_id,
              timestamp: element.timestamp,
              sentto: element.sentto,
              status: element.status,
              countStatus: element.status,
              fileextension: element.fileextension,
              tagmessage: this.ApiserviceService.decryptText(element.tagmessage),
              tagfileextension: element.tagfileextension,
              tagfiletype: element.tagfiletype,
              tagtime: element.tagtime,
              unreadCount: this.unreadCount,
              livelocation: element.livelocation,
              location: element.location,
              forwardmsg: element.forwardmsg,
              selected: false,
              attachtext: this.ApiserviceService.decryptText(element.attachtext),
              selectedColor: "none",
              showMore: false
            }

            if (element.cleartimestamp != null && element.sentby == localStorage.getItem('LinkususerID')) {
              this.cleartimestamp = element.cleartimestamp;
            }

            if (this.cleartimestamp != null) {

              var getdate1 = new Date(parseInt(this.cleartimestamp))
              var getdata = new Date(parseInt(element.timestamp))
              console.log("myGroupTimestamp :" + getdate1 + ":" + getdata)

              if (getdata >= getdate1) {
                this.allmessages.push(item);
              }
            }
            else {
              this.allmessages.push(item);
            }

            var obj = {
              receiver: this.Uid,
              buddy: this.buddyinfo.mobile,
              Status: "2"
            }
            this.socket.emit('status_change', obj);

            console.log('this.allmessages' + JSON.stringify(this.allmessages));

            if (element.selfdestruct == "true" && element.status == "2" && element.sentto == this.Uid) {
              let msg = element.message;

              var matches = msg.match(/[\w\d\’\'-]+/gi);
              // return matches ? matches.length : 0;
              console.log(matches.length);

              setTimeout(() => {
                const index = this.allmessages.indexOf(item);
                if (index > -1) {
                  this.allmessages.splice(index, 1);

                }
              });
            }
            //Code block to hide incoming selfdestruct message after certain interval By:Akshai 
            if (element.selfdestruct == "true" && element.status == "1" && element.sentto == this.Uid) {
              let msg = element.message;

              var matches = msg.match(/[\w\d\’\'-]+/gi);
              // return matches ? matches.length : 0;
              console.log(matches.length);

              setTimeout(() => {
                const index = this.allmessages.indexOf(item);
                if (index > -1) {
                  this.allmessages.splice(index, 1);
                }
              }, 462 * matches.length);
            }

            if (element.filetype == "event") {
              console.log(element.message);
              var str = element.message.split(" - ");
              var title = str[0];
              element.event_title = title;
              element.message = str[1];
              // console.log(msg,title);
              var str = element.message.split(" by ");
              var description = str[0];
              element.message = str[1];
              // console.log(msg,description);
              var str = element.message.split(" to ");
              var start_time = str[0];
              var end_time = str[1];
              // console.log(start_time,end_time);
              var data = {
                title: title,
                startTime: new Date(start_time).toISOString(),
                endTime: new Date(end_time).toISOString(),
                desc: description,
                createdby: element.sentto,
                // createdby_name: senttoname,
              }
              console.log(data);

              await this.service.PostRequest(this.service.mainAPI + '/check_accepted_events', data).then(res => {
                console.log(res);
              }, err => {
                if (err.error.text == "event accepted") {
                  element.event_accepted = 'true';
                  this.localNotifications.schedule({
                    text: data.title,
                    trigger: { at: new Date(new Date(data.startTime).getTime() - 300000) },
                    led: 'FF0000',
                  });
                } else {
                  element.event_accepted = 'false';
                }
              })
            }

          }


        });

        this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
          console.log("updatechatmesage :" + JSON.stringify(res))
          this.dataLoad();
          // this.textarea1.nativeElement.focus();
          this.textarea1.nativeElement.focus();

        })
        this.removeDups(this.allmessages);
        this.allmessages.sort(function (a, b) {
          var c = new Date(parseInt(a.timestamp));
          var d = new Date(parseInt(b.timestamp));
          return c > d ? 1 : -1;
        });
        this.datewiseshow();
        this.unreadMessageShow();

        this.scrollToBottomOnInit();
        // this.loadingdismiss();

        console.log("this.allmessages:" + JSON.stringify(this.allmessages));
      }, err => {
        this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
          console.log("updatechatmesage err :" + JSON.stringify(res))
          this.dataLoad();
          // this.textarea1.nativeElement.focus();
          this.textarea1.nativeElement.focus();

        }).catch(err => {
          this.textarea1.nativeElement.focus();

        })
        this.loadingdismiss();
        console.log(err);
      })
    }


  }

  /**
 * Search Project
 */


  SearchValue(searchbar) {
    console.log("this.empSerach.length :" + this.project.length)

    if (this.project == undefined || this.project.length == 0 || this.project.length < 2) {
      this.projectlist1 = []
      //this.selectempCode = null;
    }
    else {
      this.projectlist1 = this.allprojects;

      this.projectlist1 = this.projectlist1.filter((item) => {
        return (item.projectname.toLowerCase().indexOf(this.project.toLowerCase()) > -1);
      })
      console.log("serach value" + this.project)
    }

  }
  /**
 * Updating the selected values
 */

  selectedvalue(projecid, projectname) {

    this.projectlist1 = []
    this.project = projectname;
    this.getprojectstat(projecid);

  }

  /**
 * After canceling the search
 */


  onCancelsearch(event) {
    console.log('CANCEL', event);
    this.projectlist1 = []
    this.project = undefined;

  }

  /**
 * Drag & Drop functionalities
 */


  async dragoption(ev: any) {

    // dragoption() {
    event.preventDefault();

    if (this.showdraghome == 'false') {
      console.log("drag true")
      this.showdraghome = 'true'
    }
    else {
      console.log("drag false")
      this.showdraghome = 'false'
    }
  }

  /**
 * Zoom functionality
 */

  zoomImage(image) {
    console.log("zoomImage :" + image)
    this.photoViewer.show(image);
  }

  // clickEVent() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }
  /**
   * Recent chats
   */

  receiveRecentChat() {
    this.socket.on('profile_changes', (msg) => {
      console.log("profile_changes")
      this.dataLoad();
    })
    this.socket.on('recentmessgae', (msg) => {
      console.log("recentmessgae 1:" + JSON.stringify(msg))

      if (msg.group == "true" && msg.uid == localStorage.getItem("LinkususerID")) {
        this.dataLoad();
      }
      else if (msg.uid == localStorage.getItem("LinkususerID") && msg.backclick != null) {
        this.dataLoad();
      }
      else if (msg.uid == localStorage.getItem("LinkususerID")) {
        this.dataLoad();

        console.log("receiveRecentChat recive :" + JSON.stringify(msg))
        if (this.pageActive == true) {

          console.log("singleChatActive :" + this.singleChatActive)

          if (this.singleChatActive == false && msg.message != null && msg.sender != localStorage.getItem("LinkususerID") && (msg.buddyid == localStorage.getItem("LinkususerID") || msg.sentby == localStorage.getItem("LinkususerID"))) {
            console.log("receiveRecentChat audio")
            this.audioWeb = new Audio();
            this.audioWeb.src = 'assets/mp3/receive.wav';
            this.audioWeb.load();
            this.audioWeb.play();
          }
          else if (this.groupChatActive == false && msg.groupkey != null && msg.sender != localStorage.getItem("LinkususerID")) {
            this.audioWeb.play();
          }

        }


        if (this.platform.is('android')) {

        }
        else {
          console.log("recentmessgae 3")

          this.BuddyRecentDBProvider.getrecentdb(localStorage.getItem("LinkususerID").toString()).then((data) => {
            // this.RecentDBProvider.insertRecords(msg);
            if (data["flag"] == null) {
              this.Tempmdata = data;
              console.log("recent ionViewDidEnter 2:" + JSON.stringify(data))
              // this.myfriends = [];
              this.setRecentItem(this.Tempmdata);
              this.authService.loginFLow == true;
            }

          });
        }

      }

    })

  }

/**
 * Remove tags if present in the chats
 */

  removeTags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/(<([^>]+)>)/ig, '');
  }
  /**
   * Update Recent chats tab with latest conversations
   */

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
        mesage = "<b>" + element.groupsendername + ":</b>" + this.ApiserviceService.decryptText(element.message);
      }
      else {
        chatType = "1"
        mesage = this.ApiserviceService.decryptText(element.message);
        username = element.username;
      }


      if (element.UnreadMsg != 0) {
        Msgcount = element.UnreadMsg;
      }
      console.log("recent add:" + mesage + ":" + username + ":" + element.messagecount)
      //        buddyimage: element.buddyimage.toString().replace('app-file://', ''),

      // alert("Msgcount :"+Msgcount);
      // if (this.platform.is('core')) {

      if (element.filetype == "mom" || element.filetype =="MOM") {
        mesage = null;
        mesage = "MOM"
      }
      if (element.userstatus == undefined || element.userstatus == "A") {
        this.myfriends.push({
          buddyid: element.buddyid,
          mobile: element.buddyid,
          username: username,
          buddyimage: element.buddyimage,
          status: element.status,
          uid: element.uid,
          date: element.Filedate,
          message: mesage,
          titlemessage: this.removeTags(mesage),
          filetype: element.filetype,
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
          empstatus: element.status
        });
      }

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
      this.tempmyfriends = this.myfriends
      this.myfriends.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });


    });

  }


  /**
   * Update current status of the user
   */

  dataLoad() {
    this.BuddyChatProvider.updatemystatus(localStorage.getItem("LinkususerID"), "online", new Date().getTime(), this.networkProvider.DeviceId);
    this.recentonlinedata();
  }

/**
 * Updating with Recent data
 */

  recentonlinedata() {
    console.log("recentonlinedata")
    // this.presentToast();
    if (localStorage.getItem("LinkususerID") != null) {


      this.BuddyRecentDBProvider.getrecentdb(localStorage.getItem("LinkususerID").toString()).then((data) => {
        // //this.loadingdismiss();
        console.log("recentonlinedata 1 :" + JSON.stringify(data))
        this.BuddyChatProvider.updatemystatus(localStorage.getItem("LinkususerID"), "online", new Date().getTime(), this.networkProvider.DeviceId)

        if (data["flag"] == null) {

          this.Tempmdata = data;
          if (this.Tempmdata.length != 0) {
            this.myfriends = [];
            this.setRecentItem(this.Tempmdata);
          }

        }


        //this.loadingdismiss();
        this.authService.loginFLow == true;
      }, err => {
        console.log(err);
        //this.loadingdismiss();
      })
    }
  }


  ionViewDidLoad1() {


  }

  /**
   * Date functions
   */

  convertDate(date) {
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'agu', 'sep', 'oct', 'nov', 'dec'];
    var day = date.getDate();
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    return day + "-" + month + "-" + year;
  }

  /**
   * Dataurl to canvas format
   */

  // convert to data url to canvas
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

/**
 * Event fored when we exit from the page
 */

  ionViewDidLeave() {
    this.pageActive = false;
    // this.loadingdismiss();
    //this.socket.emit('disconnect', {});
    this.txtKeyUp();
    this.networkProvider.forwardFlow = false;
    this.pageAlive = false;
    this.stoptone()
    // this.events.unsubscribe('Recentnewmessage');
  }
  /**
   * Chatting with friend
   */

  //Open single Chat
  buddychat(buddy) {

    this.BuddyChatProvider.updatemystatus(localStorage.getItem("LinkususerID"), "online", new Date().getTime(), this.networkProvider.DeviceId);

    this.cleartimestamp = null;
    this.searchinput = false;
    this.searchTerms = ''
    this.scrollValue = 70;
    this.showdraghome = false;
    this.groupkey = null;
    this.message = '';
    this.tagmessage = null;
    this.groupmembersinlist = false
    this.ApiserviceService._content = ''
    this.events.subject = new Subject<any>();
    console.log("clcik :" + JSON.stringify(buddy))
    // this.buddydetails=[];
    this.groupname = '';
    this.userName = ''
    if (buddy.chatType == "1") {
      // $("textarea:empty,input:text[value='']").first().focus();

      this.userName = buddy.username;
      this.singleChatActive = true;
      this.groupChatActive = false;

      this.BuddyChatProvider.buddy = buddy;
      console.log("BuddyChatProvider :" + JSON.stringify(this.BuddyChatProvider.buddy));
      this.buddychatright = true;
      this.groupchat = false;
      this.rightmember = false;
      this.nodata = false;

      // this.platform.backButton.subscribeWithPriority(10, () => {
      //   console.log('backButton Handler was called!');

      //   var todo = {
      //     uid: this.Uid,
      //     backclick: true
      //   }
      //   this.socket.emit('recentmessgae', todo);

      //   // this.navCtrl.navigateRoot(['/home']);
      //   this.navCtrl.navigateRoot(['/home'])

      // })
      this.BuddyTyping = false;
      if (localStorage.getItem('theme') == 'day') {
        this.imageLink = '../../assets/imgs/chatBackground.png'
      }
      if (localStorage.getItem('theme') == 'night') {
        this.imageLink = '../../assets/imgs/chatbg1.jpg'
      }
      this.Uid = localStorage.getItem("LinkususerID").toString();
      this.currentUser = localStorage.getItem("LinkususerID").toString();
      this.buddydetails = this.BuddyChatProvider.buddy;

      this.buddy = this.BuddyChatProvider.buddy;
      this.buddyinfo = this.buddydetails;
      this.showEmojiPicker = false;
      this.pageAlive = true;

      this.callid = 0;
      this.callName = 0;

      this.message_id = localStorage.getItem('LinkususerID') + '_' + this.buddydetails.mobile;
      this.message_id1 = this.buddydetails.mobile + '_' + localStorage.getItem('LinkususerID');
      console.log("this.buddydetails :" + JSON.stringify(this.buddydetails))

      var myinfo = {
        "username": localStorage.getItem("username"),
        "mobile": localStorage.getItem("LinkususerID"),
      }


      this.groupmembers = [];
      this.groupmembers.push(myinfo);


      this.networkProvider.initializeNetworkEvents();
      this.showEmojiPicker = false;
      // this.InitializeApiRTC();

      // this.socket = io(this.IpaddressProvider.socketconfig);


      console.log("this.buddyinfo", this.buddyinfo)

      this.tempMsg = '';


      if (this.platform.is('android') || this.platform.is('ios')) {
        this.mobileicon = true;
      }
      this.mapshowpop = 'false'

      this.allmessages = [];
      this.tempArrayList = [];
      // audio variable
      this.sendRecord = null;

      this.viewStatus = true;
      this.chatmessage = [];

      console.log("this.buddy :" + JSON.stringify(this.buddy))
      this.BuddyChatProvider.getMyinfo(this.buddy["mobile"]).then(res => {
        console.log("buddydetails 2 :" + JSON.stringify(res))
        this.buddydetails = res[0]
        this.buddyinfo = this.buddydetails;
        this.groupmembers.push(res[0]);
      }).catch(err => {
        this.BuddyChatProvider.getMyinfo(this.buddy["mobile"]).then(res => {
          console.log("buddydetails 2 :" + JSON.stringify(res))
          this.buddydetails = res[0]
          this.buddyinfo = this.buddydetails;
          this.groupmembers.push(res[0]);
        }).catch(err => {

        })
      })

      this.addmessagehide = false;


      this.subscription = this.events.getMessage().subscribe(text => {
        console.log("subscribe:" + JSON.stringify(text))
        console.log(text.created);
        if (text["emojis:created"] != 0 && text["emojis:created"] != undefined) {
          if (this.message != undefined) {
            this.tempMsg = this.message;
          }

          this.isTyping();
          // console.log("emojis:created :"+emoji+"::"+this.tempMsg+":"+this.newmessage)
          this.message = this.tempMsg + ' ' + text["emojis:created"];
          this.tempMsg = this.message;

        }
      })
      // this.Receive(); //receive 1

      this.network.onConnect().subscribe(() => {
        console.log("Online Buddychat")

      })

      this.platform.pause.subscribe(() => {

        this.unreadCount = 0;
        this.allmessages.forEach(element => {
          element.countStatus = "2";
          element.unreadMessageCount = null;
        });
      });

      // Get the list of supported languages


      this.clearunreadmessage();

      var room = { sender: localStorage.getItem('LinkususerID'), receiver: this.buddydetails.mobile };
      // this.socket.emit('connectionestablish', room);
      this.nativeAudio.preloadSimple('sent', 'assets/mp3/sent.mp3').then(res => {
      })

      this.nativeAudio.preloadSimple('receive', 'assets/mp3/receive.wav').then(res => {
      })

      this.scrollValue = 70;
      this.pageAlive = true;
      this.checkblocked();
      this.getchat(this.scrollValue);
      this.dataLoad();

      this.socket.connect();


      console.log("this.buddydetails :" + JSON.stringify(this.buddydetails))
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

        // this.navCtrl.navigateForward('buddychat-room', {
        //   queryParams: buddyinfo,
        // })
      }

      // this.chatservice.initializebuddy(buddy);
      // this.app.getRootNav().push('BuddychatPage', { buddyinfo: buddyinfo });
    }
    else {
      // this.groupKey=buddy.groupKey;
      this.groupname = buddy.username;

      this.singleChatActive = false;
      this.groupChatActive = true;
      this.groupkey = buddy.groupKey;
      this.groupchat = true;
      this.buddychatright = false;
      this.rightmember = false;
      this.nodata = false;
      this.GruopProvider.currentgroupKey = buddy.groupKey;
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

            setTimeout(() => {
              if (this.textarea2 != undefined) {
                this.textarea2.nativeElement.focus();
              }
            }, 100);
          }

        })


        this.platform.pause.subscribe(() => {

          this.unreadCount = 0;
          this.allgroupmsgs.forEach(element => {
            element.countStatus = "2";
            element.unreadMessageCount = null;
          });
        });

      }

      // this.getgroupchat(this.scrollValue);

    }

  }
  /**
 * Event fired after selecting the emoji
 */

  selectEmoji(e) {
    const emoji = String.fromCodePoint(e);
    this.message += ` ${emoji}`;

  }
  selectEmoji1(e) {
    const emoji = String.fromCodePoint(e);
    console.log('emoji :' + this.newmessage);

    this.newmessage += ` ${emoji}`;

  }
/**
 * Pop Messages
 */

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

  /**
 * Showing Wait Messages
 */


  async presentToast() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',

      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',

    });
    return await loading.present();
  }


  active() {
    // alert("active");
  }
  released() {
    // alert("released");
  }

  /**
   * Search User
   */

  searchuser(searchbar) {
    //this.filteredusers = ;

    let el = document.getElementsByTagName('ion-searchbar');
    el[0].classList.add('MY-CUSTOM-CLASS')

    var q = searchbar.target.value;




    console.log("searchuser :" + q + ":" + q.length)

    if (q != undefined && q.trim() == '') {
      this.recentonlinedata();
      return;
    } else {
      console.log("searchuser 11:" + q + ":" + this.myfriends.length)

      if (this.myfriends.length == 0) {
        this.myfriends = this.tempmyfriends;
      }
      this.myfriends = this.myfriends.filter((v) => {
        if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          console.log("searchuser true :" + q + ":" + q.length)

          return true;
        }
        else {
          console.log("searchuser else :" + q + ":" + q.length)


          return false;

        }
      })
    }
    if (q.length == 0) {
      this.recentonlinedata();
    }


  }

  /**
   * Show trusted text
   */

  getHtmlText(text) {
    return this.sanitizer.bypassSecurityTrustHtml(text)
  }

  /**
 * Voice message to text
 */

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
      this.message = '';
      this.message = matches[0].toString(); // print text
      this.speechRecognition.stopListening()
      this.sendMessage() // sent messgae

      this.cd.detectChanges();
    });

  }
  /**
   * After search
   */

  searchshow() {
    this.searchinput = true;
    this.tempArrayList = [];
    this.tempArrayList = this.allmessages;
    console.log("this.tempArrayList :" + this.tempArrayList.length)

  }
  onCancel2(event) {
    console.log('CANCEL', event);
    this.recentonlinedata();
  }
  onCancel(event) {
    this.searchTerms = '';
    this.searchinput = false;
    this.scrollValue = 70;
    this.getchat(this.scrollValue)
  }
  /**
 * Search Text
 */

  searchText(ev) {

    console.log("this.tempArrayList :" + this.tempArrayList.length)
    var q = ev.target.value;
    if (q == '') {

      this.allmessages = this.tempArrayList;
    }
    if (q != undefined) {

      this.allmessages = this.tempArrayList.filter((v) => {
        let startIndex = v.message.toLowerCase().indexOf(q.toLowerCase());
        if (startIndex != -1) {
          let endLength = q.length;
          let matchingString = v.message.substr(startIndex, endLength);
          console.log("matchingString " + matchingString.toString().trim());
          // return v.message.replace(matchingString, "<mark>" + matchingString + "</mark>");
          // this.heighlight(item, searchedText);
          return v.message.replace(matchingString, '<span style="color:red">' + matchingString + '</span>')
        }
      });
    }
  }

  /**
 * Highlighting text
 */

  heighlight(pTag: any, text: any) {
    var r = pTag.innerHTML.replace(text, '<span style="color:red">' + text + '</span>');
    console.log(r);
  }
  searchText12(ev) {
    let searchedText = ev.target.value;
    if (searchedText && searchedText.trim() != '') {
      this.allmessages = Array.from(this.content.nativeElement.getElementsByTagName('p'));
      this.allmessages = this.allmessages.filter((item) => {
        if (item.innerHTML.toLowerCase().includes(searchedText.toLowerCase())) {
          item.scrollIntoView();
          this.heighlight(item, searchedText);
          return true;
        }
        return false;
      })
    }
  }
  async ZoomFile(file) {


    const model = await this.modalController.create({
      component: ZoomPage,
      cssClass: 'fullscreenmodal',
      componentProps: {
        src: file,
        images: this.allmessages,
      }
    });

    model.present();
    model.onWillDismiss().then(data => {

    });

  }

  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    // if (event.detail.deltaY > 0 && this.footerHidden) return;
    // if (event.detail.deltaY < 0 && !this.footerHidden) return;
    if (event.detail.deltaY > 0) {
      console.log("scrolling down, hiding footer...");
      // this.footerHidden = true;
    } else {
      console.log("scrolling up, revealing footer...");
      // this.footerHidden = false;
    };
  };

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



    if (this.showpopSingle == true) {
      this.showpopSingle = false
    }

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
    if (this.showpopSingle == true) {
      this.showpopSingle = false
    }

    if (this.mapshowpop == 'true') {
      this.mapshowpop = 'false'
    }
  }
  async popover(ev: any, item) {
    console.log("popover click1:" + this.showpopSingle)

    this.titleStyle = '1';

    console.log("this.myblocked  :" + this.myblocked)
    const popover = await this.popoverController.create({
      component: GallerylistComponent,
      cssClass: "popover_class",
      event: ev,
      translucent: true
      // event: ev
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      if (data["data"].buddyinfo == "1") {
        this.webcamera();
      }
      else if (data["data"].buddyinfo == "2") {
        $('#imgupload2').trigger('click')
      }
      else if (data["data"].buddyinfo == "3") {
        $('#imgupload').trigger('click')
      }
      else if (data["data"].buddyinfo == "4") {

        this.addMarker(); //block//unblock
      }

    });
  }

  async deleteFunction1() {
    const statusalert = await this.alertController.create({
      header: 'Delete Message?',
      buttons: [
        {
          text: "Delete For me",
          cssClass: "deletebtn",
          handler: () => {
            var deleteArray = [];
            var temparray = this.allmessages
            var lengthpositionValue = null;

            for (var i = 0; i < this.allmessages.length; i++) {

              console.log("this.allmessages[i].selected  :" + this.allmessages[i].selected)
              if (this.allmessages[i].selected == true) {
                console.log("positon:" + this.allmessages.length + ":" + i + ":" + (this.allmessages.length - 1))
                deleteArray.push(this.allmessages[i])
                if ((this.allmessages.length - 1) == i) {
                  lengthpositionValue = this.allmessages[(i - 1)].message
                }
              }
            }
            console.log("lengthpositionValue 1:" + lengthpositionValue)
            this.allmessages = this.removeItemAll(this.allmessages)

            if (lengthpositionValue != null) {
              var getLastIndex = this.allmessages.length;
              console.log("lengthpositionValue 2:" + getLastIndex)

              lengthpositionValue = this.allmessages[(getLastIndex - 1)]

              lengthpositionValue = this.allmessages[(getLastIndex - 1)]
              // var obj = JSON.stringify(lengthpositionValue)
              console.log("lengthpositionValue 13:" + lengthpositionValue.sender + ":" + JSON.stringify(lengthpositionValue))

              var sendarray = {
                "sender": localStorage.getItem('LinkususerID'),
                "message_id": lengthpositionValue.message_id,
                "buddyid": this.buddydetails.mobile,
                "sentby": localStorage.getItem('LinkususerID'),
                "sentto": lengthpositionValue.sentto,
                "uid": localStorage.getItem('LinkususerID'),
                "username": this.buddydetails.username,
                "buddyImage": this.buddydetails.photourl,
                "messagecount": 0,
                "fileType": lengthpositionValue.msgtype,
                "filetype": lengthpositionValue.msgtype,
                "message": this.service.encryptText("You deleted this message"),
                "openGroup": false,
                "timestamp": lengthpositionValue.timestamp,
                "fileextension": lengthpositionValue.fileextension
              }

              console.log("lengthpositionValue 13:" + + JSON.stringify(sendarray))

              this.BuddyChatProvider.createMyRecentMessage(sendarray);
              console.log("deleteArray :" + deleteArray.length)

            }

            this.BuddyChatProvider.deleteforme(deleteArray).then(res => {
              // this.forwardClick = false;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
              this.loadingdismiss();
              this.getchat(this.scrollValue)
            }).catch(erre => {
              this.loadingdismiss();
              this.getchat(this.scrollValue)
            })
          }
        },
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "deletebtn",
          handler: () => {
            //something to do 



          }
        },

      ]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();

  }
  removeItemAll(arr) {
    var temparray = [];
    for (var i = 0; i < arr.length; i++) {

      if (arr[i].selected == false || arr[i].selected == undefined) {
        temparray.push(arr[i])
      }
    }
    return temparray;
  }
  async deleteFunction() {
    const statusalert = await this.alertController.create({
      header: 'Delete Message?',
      buttons: [
        {
          text: "Delete For me",
          cssClass: "deletebtn",
          handler: () => {
            var deleteArray = []
            console.log("this.allmessages 1:" + JSON.stringify(this.allmessages))
            var temparray = this.allmessages
            var lengthpositionValue = null;

            for (var i = 0; i < this.allmessages.length; i++) {

              console.log("this.allmessages[i].selected  :" + this.allmessages[i].selected)
              if (this.allmessages[i].selected == true) {
                console.log("positon:" + this.allmessages.length + ":" + i + ":" + (this.allmessages.length - 1))
                deleteArray.push(this.allmessages[i])
                if ((this.allmessages.length - 1) == i) {
                  lengthpositionValue = this.allmessages[(i - 1)].message
                }
              }
            }
            console.log("lengthpositionValue 1:" + lengthpositionValue)
            this.allmessages = this.removeItemAll(this.allmessages)

            if (lengthpositionValue != null) {
              var getLastIndex = this.allmessages.length;
              console.log("lengthpositionValue 2:" + getLastIndex)

              lengthpositionValue = this.allmessages[(getLastIndex - 1)]

              lengthpositionValue = this.allmessages[(getLastIndex - 1)]
              // var obj = JSON.stringify(lengthpositionValue)
              console.log("lengthpositionValue 13:" + lengthpositionValue.sender + ":" + JSON.stringify(lengthpositionValue))
              var sendarray = {
                "sender": localStorage.getItem('LinkususerID'),
                "message_id": lengthpositionValue.message_id,
                "buddyid": lengthpositionValue.sentto,
                "sentby": localStorage.getItem('LinkususerID'),
                "sentto": lengthpositionValue.sentto,
                "uid": localStorage.getItem('LinkususerID'),
                "username": this.buddydetails.username,
                "buddyImage": this.buddydetails.photourl,
                "messagecount": 0,
                "fileType": lengthpositionValue.msgtype,
                "filetype": lengthpositionValue.msgtype,
                "message": this.service.encryptText("You deleted this message"),
                "openGroup": false,
                "timestamp": lengthpositionValue.timestamp,
                "fileextension": lengthpositionValue.fileextension
              }

              console.log("lengthpositionValue 13:" + + JSON.stringify(sendarray))

              this.BuddyChatProvider.createMyRecentMessage(sendarray);
              console.log("deleteArray :" + deleteArray.length)

            }

            console.log("this.allmessages 2:" + JSON.stringify(this.allmessages))

            this.BuddyChatProvider.deleteforme(deleteArray).then(res => {
              // this.forwardClick = false;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
              this.loadingdismiss();
              this.getchat(this.scrollValue)
            }).catch(erre => {
              this.loadingdismiss();
              this.getchat(this.scrollValue)
            })
          }
        },
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "deletebtn",
          handler: () => {
            //something to do 



          }
        },
        {
          //single
          text: "Delete For Everyone",
          cssClass: "deletebtn",
          // cssClass: "confirmbtn",
          handler: () => {
            var deleteArray = [];
            var temparray = this.allmessages
            var lengthpositionValue = null;

            for (var i = 0; i < this.allmessages.length; i++) {

              console.log("this.allmessages[i].selected  :" + this.allmessages[i].selected)
              if (this.allmessages[i].selected == true) {
                console.log("positon:" + this.allmessages.length + ":" + i + ":" + (this.allmessages.length - 1))
                deleteArray.push(this.allmessages[i])
                if ((this.allmessages.length - 1) == i) {
                  lengthpositionValue = this.allmessages[(i - 1)].message
                }
              }
            }
            console.log("lengthpositionValue 1:" + lengthpositionValue)
            this.allmessages = this.removeItemAll(this.allmessages)

            if (lengthpositionValue != null) {
              var getLastIndex = this.allmessages.length;
              console.log("lengthpositionValue 2:" + getLastIndex)

              lengthpositionValue = this.allmessages[(getLastIndex - 1)]

              lengthpositionValue = this.allmessages[(getLastIndex - 1)]
              // var obj = JSON.stringify(lengthpositionValue)
              console.log("lengthpositionValue 13:" + lengthpositionValue.sender + ":" + JSON.stringify(lengthpositionValue))


              var sendarrayMine = {
                "sender": localStorage.getItem('LinkususerID'),
                "message_id": lengthpositionValue.message_id,
                "buddyid": lengthpositionValue.sentto,
                "sentby": localStorage.getItem('LinkususerID'),
                "sentto": lengthpositionValue.sentto,
                "uid": localStorage.getItem('LinkususerID'),
                "username": this.buddydetails.username,
                "buddyImage": this.buddydetails.photourl,
                "messagecount": 0,
                "fileType": lengthpositionValue.msgtype,
                "filetype": lengthpositionValue.msgtype,
                "message": this.service.encryptText("You deleted this message"),
                "openGroup": false,
                "timestamp": new Date().getTime(),
                "fileextension": lengthpositionValue.fileextension
              }

              var addnewdataFriend = {
                "sender": localStorage.getItem('LinkususerID'),
                "message_id": this.buddydetails.mobile + "_" + localStorage.getItem('LinkususerID'),
                "buddyid": localStorage.getItem('LinkususerID'),
                "sentby": localStorage.getItem('LinkususerID'),
                "sentto": lengthpositionValue.sentto,
                "uid": this.buddydetails.mobile,
                "username": localStorage.getItem('username'),
                "buddyImage": localStorage.getItem('photourl'),
                "messagecount": 0,
                "fileType": lengthpositionValue.msgtype,
                "filetype": lengthpositionValue.msgtype,
                "message": this.service.encryptText("This message was deleted"),
                "openGroup": false,
                "timestamp": new Date().getTime(),
                "fileextension": lengthpositionValue.fileextension
              }


              console.log("sendarrayMine 13:" + + sendarrayMine)

              this.BuddyChatProvider.createRecentMessage(sendarrayMine).then(res => {

                console.log("addnewdataFriend 13:" + + addnewdataFriend)
                this.BuddyChatProvider.createRecentMessage(addnewdataFriend);
              });

              console.log("deleteArray :" + deleteArray.length)

            }
            this.BuddyChatProvider.deleteforEveryone(deleteArray).then(res => {
              // this.forwardClick = false;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
              this.loadingdismiss();
              //  this.getchat(this.scrollValue)
            }).catch(erre => {
              this.loadingdismiss();
              // this.getchat(this.scrollValue)
            })
          }
        }
      ]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();



    // this.presentLoadingWithOptions();

  }
  async forward() {
    var deleteArray = [];
    this.allmessages.forEach(element => {
      if (element.selected == true) {
        deleteArray.push(element)
      }
    });
    console.log("deleteArray :" + deleteArray.length)

    this.deleteFlag = false;
    this.deleteFlag1 = false;
    this.forwardFlag = false;
    this.forwardClick = false;

    const modal = await this.modalController.create({
      component: GroupcreationPage,
      componentProps: {
        forward: deleteArray,
        chatinfo: this.buddy,
        flag: "single",
        buddyInfo: this.buddydetails
      }
    });
    modal.present();
    modal.onDidDismiss().then((buddy) => {
      this.getchat(this.scrollValue)
    });



    // this.navCtrl.navigateForward('groupcreation', {
    //   queryParams: obj,
    // })
  }
  forwardSelection(selectedValue, item) {

    if (selectedValue == true) {
      this.contactsselect.push(item);
    }
    else {
      this.contactsselect.splice(item, 1);

    }

    console.log("forwardSelection :" + selectedValue + ":" + JSON.stringify(item))
    this.allmessages.forEach(element => {


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
    if (this.arrayAlreadyHasArray(this.allmessages) == true) {
      if (this.forwardClick == true) {
        this.forwardFlag = true;
        this.deleteFlag = false;
        this.deleteFlag1 = false;

      }
      else {
        this.forwardFlag = false;

        this.statusreadarray = [];
        this.contactsselect.forEach(val => {

          if (val.status == '2') {

            if (val.selected == true) {
              this.statusreadarray.push(item)
            }
            else {
              this.statusreadarray.splice(item, 1)
            }
          }


        });


        if (this.statusreadarray.length == 0) {

          this.deleteFlag = true;
          this.deleteFlag1 = false;
        }
        else {

          this.deleteFlag1 = true;
          this.deleteFlag = false;
        }

      }
    }
    else {
      if (this.forwardClick == true) {
        this.forwardFlag = false;
      }
      else {
        this.deleteFlag = false;
        this.deleteFlag1 = false;
      }
      this.forwardClick = false;
    }

  }

  arrayAlreadyHasArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      let checker = false
      // for(var j = 0; j<arr[i].length; j++){
      //     if(arr[i][j] === true){
      //         checker = true
      //     } else {
      //         checker = false
      //         break;
      //     }
      // }
      if (arr[i].selected == true) {
        checker = true
      }

      if (checker) {
        return true
      }
    }
    return false
  }

  Receive() {
    // this.socket.connect()
    // Socket receiving method 
    this.socket.on('chatmessage', (msg) => {

      console.log("ChatReceivemessage 1:" + JSON.stringify(msg));
      //Code block to hide incoming selfdestruct message after certain interval By:Akshai 
      if (msg.selfdestruct == "true" && msg.status == "1" && msg.sentto == this.Uid) {
        let rec_msg = msg.message;

        var matches = rec_msg.match(/[\w\d\’\'-]+/gi);
        // return matches ? matches.length : 0;
        console.log(matches.length);

        setTimeout(() => {
          const index = this.allmessages.indexOf(item);
          if (index > -1) {
            this.allmessages.splice(index, 1);
          }
        }, 462 * matches.length);
      }

      // separate the salted message with "#" tag 
      // let saletdMsgArr = msg.split('_');
      console.log("ChatReceivemessage 2:" + JSON.stringify(msg));
      var item = {};
      // check the sender id and change the style class


      if (this.singleChatActive == true && (msg["message_id"] == this.Uid + "_" + this.buddy.mobile || msg["message_id"] == this.buddy.mobile + "_" + this.Uid)) {
        console.log("check messag id :" + msg["message_id"] + ":" + this.Uid + ":" + this.buddy.mobile)

        // if (msg["message_id"] == this.buddy.mobile + "_" + this.Uid) {
        //   this.BuddyChatProvider.createMessage(msg, "2").then(res => {
        //   });
        // }

        // && msg["messageid"] == null && msg["status"] != 2
        if (msg["sentby"] == this.Uid && msg["channel"] != "web" && msg["status"] == 1) {

          var messgaetxt = null;
          if (this.service.decryptText(msg["message"]).indexOf('UnBlocked') > -1) {
            messgaetxt = "You UnBlocked " + this.buddydetails.username;
          }
          else if (this.service.decryptText(msg["message"]).indexOf('Blocked') > -1) {
            messgaetxt = "You Blocked " + this.buddydetails.username;
          }
          else {
            messgaetxt = this.service.decryptText(msg["message"])
          }

          var item122 = {

            message: messgaetxt,
            sentby: msg["sentby"],
            username: msg["username"],
            photourl: msg["photourl"],
            message_id: msg["message_id"],
            timestamp: msg["timestamp"],
            sentto: msg["sentto"],
            location: msg["location"],
            latitude: msg["latitude"],
            status: msg["status"],
            filetype: msg["filetype"],
            tagmessage: this.ApiserviceService.decryptText(msg["tagmessage"]),
            tagfileextension: msg["tagfileextension"],
            tagtime: msg["tagtime"],
            Tagsend: msg["Tagsend"],
            Tagto: msg["Tagto"],
            Date: msg["Date"],
            attachtext: gattachtext,
            tagfiletype: msg["tagfiletype"],
            Taglatitude: msg["Taglatitude"],
            Taglocation: msg["Taglocation"],
            fileextension: msg["fileextension"],
            Taskfrom: msg["Taskfrom"],
            Taskto: msg["Taskto"],
            chatType: msg["chatType"],
            countStatus: msg["status"],
            unreadCount: this.unreadCount,
            selected: false,
            forwardmsg: msg["forwardmsg"],
            livelocation: msg["livelocation"],
            selectedColor: "none",
            showMore: false
          }


          console.log("Receive my chatmessage 111" + JSON.stringify(item122))

          this.allmessages.push(item122);

          this.allmessages.push(item1);
          this.removeDups(this.allmessages);

          if (this.unreadCount != null) {
            this.unreadMessageShow();
          }
          this.scrollToBottomOnInit();


        }
        else if (msg["sentby"] == this.Uid && msg["messageid"] == null && msg["status"] == 2) {
          console.log("ChatReceivemessage 3:" + JSON.stringify(msg));

          this.allmessages.forEach(element => {
            console.log("Receive chatmessage timestamp" + element.timestamp + ":" + msg["timestamp"])
            console.log("element.timestamp : " + element.timestamp == msg["timestamp"]);
            if (element.timestamp == msg["timestamp"]) {
              this.BuddyChatProvider.updateStatusMessage(this.allmessages);

              element["status"] = "2";


              if (element.filetype == "event") {
                console.log(element.message);
                var str = element.message.split(" - ");
                var title = str[0];
                element.message = str[1];
                // console.log(msg,title);
                var str = element.message.split(" by ");
                var description = str[0];
                element.message = str[1];
                // console.log(msg,description);
                var str = element.message.split(" to ");
                var start_time = str[0];
                var end_time = str[1];
                // console.log(start_time,end_time);
                var data = {
                  title: title,
                  startTime: new Date(start_time).toISOString(),
                  endTime: new Date(end_time).toISOString(),
                  desc: description,
                  createdby: element.sentto,
                  // createdby_name: senttoname,
                }
                console.log(data);

                this.service.PostRequest(this.service.mainAPI + '/check_accepted_events', data).then(res => {
                  console.log(res);
                }, err => {
                  if (err.error.text == "event accepted") {
                    element.event_accepted = 'true';
                  } else {
                    element.event_accepted = 'false';
                  }
                })
              }

              if (this.selfdestruct == true) {
                var temp = {
                  messagetimestamp: element.timestamp,
                  timestamp: new Date().getTime()
                }
                this.temparray.push(temp);
                console.log("this.temparray :" + JSON.stringify(this.temparray))
                // this.selfarray();

              }
            }

          });
          console.log("this.allmessages :" + JSON.stringify(this.allmessages))
          //timestamp
        }
        else {
          console.log("checking this.unreadCount :" + this.unreadCount)
          if (msg["sentby"] != this.Uid && msg["status"] == "1" && this.unreadCount != null) {
            this.unreadCount++;
            this.allmessages.forEach(element => {
              if (element.unreadCount != null) {
                element.unreadCount = this.unreadCount
              }
            });

            console.log("unreadCount :" + this.unreadCount)
          }
          if (msg["sentby"] == this.buddy.mobile && msg["status"] != 2) {
            console.log("Friend chat:" + this.buddy.mobile + ":" + msg["sentby"] + ":" + this.Uid);
            var gattachtext = null;
            if (msg["attachtext"] != null) {
              gattachtext = this.ApiserviceService.decryptText(msg["attachtext"])
            }

            var messgaetxt = null;
            if (this.service.decryptText(msg["message"]).indexOf('UnBlocked') > -1) {
              messgaetxt = this.buddydetails.username + " UnBlocked You";
            }
            else if (this.service.decryptText(msg["message"]).indexOf('Blocked') > -1) {
              messgaetxt = this.buddydetails.username + " Blocked You";
            }
            else {
              messgaetxt = this.service.decryptText(msg["message"])
            }


            var item1 = {

              message: messgaetxt,
              sentby: msg["sentby"],
              username: msg["username"],
              photourl: msg["photourl"],
              message_id: msg["message_id"],
              timestamp: msg["timestamp"],
              sentto: msg["sentto"],
              location: msg["location"],
              latitude: msg["latitude"],
              // status: msg["status"],
              filetype: msg["filetype"],
              tagmessage: this.ApiserviceService.decryptText(msg["tagmessage"]),
              tagfileextension: msg["tagfileextension"],
              tagtime: msg["tagtime"],
              Tagsend: msg["Tagsend"],
              Tagto: msg["Tagto"],
              Date: msg["Date"],
              attachtext: gattachtext,
              tagfiletype: msg["tagfiletype"],
              Taglatitude: msg["Taglatitude"],
              Taglocation: msg["Taglocation"],
              fileextension: msg["fileextension"],
              Taskfrom: msg["Taskfrom"],
              Taskto: msg["Taskto"],
              chatType: msg["chatType"],
              "status": "2",
              countStatus: msg["status"],
              unreadCount: this.unreadCount,
              selected: false,
              forwardmsg: msg["forwardmsg"],
              livelocation: msg["livelocation"],
              selectedColor: "none",
              showMore: false
            }


            console.log("Receive my friend chatmessage 222" + JSON.stringify(item1))
            this.audioWeb.play();

            this.allmessages.push(item1);
            this.removeDups(this.allmessages);

            if (this.unreadCount != null) {
              this.unreadMessageShow();
            }


            var messageid = msg["message_id"];

            var obj = {
              receiver: this.Uid,
              buddy: this.buddyinfo.mobile,
              Status: "2"
            }
            this.socket.emit('status_change', obj);

            this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
              console.log("updatechatmesage :" + JSON.stringify(res))
              this.scrollToBottomOnInit();
            })


            // if (this.allmessages.length != 0) {

            //   var checkflag = false;
            //   this.allmessages.forEach(element => {
            //     console.log("new add" + element.timestamp + ":" + msg["timestamp"])

            //     if (element.timestamp == msg["timestamp"]) {
            //       checkflag = true;
            //     }

            //   });

            //   console.log("checkflag :" + checkflag);
            //   if (checkflag == false) {

            //     if (localStorage.getItem("Language") != undefined && localStorage.getItem("Language") != "en" && localStorage.getItem("Language").trim() != "English") {

            //       this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180605T034427Z.91af97712fd4c7f6.993ff04220e6d494d3d4ea4f43259d296031b85d&text=' + msg["message"] + '&lang=' + localStorage.getItem("Language")).subscribe(resp => {
            //         var obj = JSON.parse(resp['_body'])

            //         if (obj.text.length > 0) {
            //           var item = {

            //             message: obj.text[0],
            //             sentby: msg["sentby"],
            //             displayName: msg["displayName"],
            //             photourl: msg["photourl"],
            //             message_id: msg["message_id"],
            //             timestamp: msg["timestamp"],
            //             sentto: msg["sentto"],
            //             location: msg["location"],
            //             latitude: msg["latitude"],
            //             status: msg["status"],
            //             filetype: msg["filetype"],
            //             tagmessage: msg["tagmessage"],
            //             tagfileextension: msg["tagfileextension"],
            //             tagtime: msg["tagtime"],
            //             Tagsend: msg["Tagsend"],
            //             Tagto: msg["Tagto"],
            //             Date: msg["Date"],
            //             tagfiletype: msg["tagfiletype"],
            //             Taglatitude: msg["Taglatitude"],
            //             Taglocation: msg["Taglocation"],
            //             fileextension: msg["fileextension"],
            //             Taskfrom: msg["Taskfrom"],
            //             Taskto: msg["Taskto"],
            //             chatType: msg["chatType"]
            //           }
            //           this.allmessages.push(item);


            //         }
            //         console.log("language translate" + JSON.stringify(this.allmessages));

            //       }, error => {
            //         return error;
            //       });
            //     }
            //     else {
            //       var item1 = {

            //         message: msg["message"],
            //         sentby: msg["sentby"],
            //         displayName: msg["displayName"],
            //         photourl: msg["photourl"],
            //         message_id: msg["message_id"],
            //         timestamp: msg["timestamp"],
            //         sentto: msg["sentto"],
            //         location: msg["location"],
            //         latitude: msg["latitude"],
            //         status: msg["status"],
            //         filetype: msg["filetype"],
            //         tagmessage: msg["tagmessage"],
            //         tagfileextension: msg["tagfileextension"],
            //         tagtime: msg["tagtime"],
            //         Tagsend: msg["Tagsend"],
            //         Tagto: msg["Tagto"],
            //         Date: msg["Date"],
            //         tagfiletype: msg["tagfiletype"],
            //         Taglatitude: msg["Taglatitude"],
            //         Taglocation: msg["Taglocation"],
            //         fileextension: msg["fileextension"],
            //         Taskfrom: msg["Taskfrom"],
            //         Taskto: msg["Taskto"],
            //         chatType: msg["chatType"]
            //       }
            //       this.allmessages.push(item1);
            //     }

            //   }
            // }
            // else {
            //   if (localStorage.getItem("Language") != undefined && localStorage.getItem("Language") != "en" && localStorage.getItem("Language").trim() != "English") {

            //     this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180605T034427Z.91af97712fd4c7f6.993ff04220e6d494d3d4ea4f43259d296031b85d&text=' + msg.message + '&lang=' + localStorage.getItem("Language")).subscribe(resp => {
            //       var obj = JSON.parse(resp['_body'])

            //       if (obj.text.length > 0) {
            //         var item = {

            //           message: obj.text[0],
            //           sentby: msg["sentby"],
            //           displayName: msg["displayName"],
            //           photourl: msg["photourl"],
            //           message_id: msg["message_id"],
            //           timestamp: msg["timestamp"],
            //           sentto: msg["sentto"],
            //           location: msg["location"],
            //           latitude: msg["latitude"],
            //           status: msg["status"],
            //           filetype: msg["filetype"],
            //           tagmessage: msg["tagmessage"],
            //           tagfileextension: msg["tagfileextension"],
            //           tagtime: msg["tagtime"],
            //           Tagsend: msg["Tagsend"],
            //           Tagto: msg["Tagto"],
            //           Date: msg["Date"],
            //           tagfiletype: msg["tagfiletype"],
            //           Taglatitude: msg["Taglatitude"],
            //           Taglocation: msg["Taglocation"],
            //           fileextension: msg["fileextension"],
            //           Taskfrom: msg["Taskfrom"],
            //           Taskto: msg["Taskto"],
            //           chatType: msg["chatType"]
            //         }
            //         this.allmessages.push(item);


            //       }
            //       console.log("language translate" + JSON.stringify(this.allmessages));

            //     }, error => {
            //       return error;
            //     });
            //   }
            //   else {
            //     var item2 = {

            //       message: msg["message"],
            //       sentby: msg["sentby"],
            //       displayName: msg["displayName"],
            //       photourl: msg["photourl"],
            //       message_id: msg["message_id"],
            //       timestamp: msg["timestamp"],
            //       sentto: msg["sentto"],
            //       location: msg["location"],
            //       latitude: msg["latitude"],
            //       status: msg["status"],
            //       filetype: msg["filetype"],
            //       tagmessage: msg["tagmessage"],
            //       tagfileextension: msg["tagfileextension"],
            //       tagtime: msg["tagtime"],
            //       Tagsend: msg["Tagsend"],
            //       Tagto: msg["Tagto"],
            //       Date: msg["Date"],
            //       tagfiletype: msg["tagfiletype"],
            //       Taglatitude: msg["Taglatitude"],
            //       Taglocation: msg["Taglocation"],
            //       fileextension: msg["fileextension"],
            //       Taskfrom: msg["Taskfrom"],
            //       Taskto: msg["Taskto"],
            //       chatType: msg["chatType"]
            //     }
            //     this.allmessages.push(item2);
            //   }
            // }



            console.log("new message allmessages ::" + JSON.stringify(msg["message"]))
            console.log("new message allmessages ::" + JSON.stringify(this.allmessages))

            // this.allmessages=[];
            this.removeDups(this.allmessages);
            // this.statuChange(msg);

            this.datewiseshow();
            this.scrollToBottomOnInit();
            // this.BuddyChatProvider.updateCreateMessage(msg);
          }

        }



      }

    });


    this.socket.on('status_change', (msg) => {
      console.log("receive status_change :" + JSON.stringify(msg))
      this.scrollToBottomOnInit()
      if (this.singleChatActive == true && msg.receiver == this.buddydetails.mobile && msg.buddy == this.Uid) {
        console.log("status_change entry")
        this.allmessages.forEach(element => {
          // if(element.status=="1"){
          element.status = "2"
          // }
        });
      }

    })


    this.socket.on('online_offline', (msg) => {
      console.log("receive online_offline :" + JSON.stringify(msg))
      if (this.buddy != undefined && msg.mobile == this.buddy.mobile) {
        this.buddydetails["status"] = msg.status;
        this.buddydetails["last_changed"] = msg.last_changed;

      }
    })

    this.socket.on('buddy_block', (msg) => {
      console.log("receive buddy_block :" + JSON.stringify(msg))
      if (msg.uid == this.buddydetails.mobile) {
        this.checkblocked()
      }

    })
    this.socket.on('user_typing', (msg) => {
      console.log("receive user_typing :" + JSON.stringify(msg))

      if (this.buddydetails != undefined && msg.sender == this.buddydetails.mobile && msg.receiver == this.Uid && msg.typing == true) {
        this.BuddyTyping = true;
      }
      if (this.buddydetails != undefined && msg.sender == this.buddydetails.mobile && msg.receiver == this.Uid && msg.typing == false) {
        this.BuddyTyping = false;
      }
      console.log("BuddyTyping :" + this.BuddyTyping)

    })
    // this.socket.on('audio_call', (msg) => {
    //   console.log("receive audio_call :" + JSON.stringify(msg))
    //   if (msg.buddy == this.Uid && msg.myid == this.buddydetails.mobile) {
    //     this.callid = msg.callid;
    //     this.callName = msg.myname;
    //     this.callPoup();
    //     // /
    //   }
    // })

  }
  statuChange(msg) {
    if (msg["sentby"] != this.Uid) {
      var sendata = new Date();
      var array = {

        sentby: msg["sentby"],

        message_id: msg["message_id"],

        sentto: msg["sentto"],
        timestamp: msg["timestamp"],
        status: 1,
        messageid: new Date().valueOf()

      }
      console.log("statuChange")
      //this.send(array);
    }
  }
  async callPoup() {
    const statusalert = await this.alertController.create({
      header: 'Calling from ' + this.callName,
      message: "Do you accept call?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "cancelbtn",
          handler: () => {
            //something to do 

            var item1 = {
              callid: this.callid,
              buddyid: this.Uid,
              myname: localStorage.getItem("username")
            }

            // if (msg.buddy == this.Uid && msg.myid == this.buddydetails.mobile) {
            //   this.callid = msg.callid;
            //   this.callName = msg.myname;
            //   this.callPoup();
            //   // /
            // }

            this.socket.emit('reject_call', item1);

          }
        },
        {
          text: "Accept",
          // cssClass: "confirmbtn",
          handler: () => {
            this.audioCall();
          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
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


  eliminateDuplicates(arr) {
    var i,
      len = arr.length,
      out = [],
      obj = {};

    for (i = 0; i < len; i++) {
      obj[arr[i]] = 0;
    }
    for (i in obj) {
      out.push(i);
    }
    return out;
  }

  closeModal() {
    this.menu.enable(false, 'first');
    // this.menu.open('first');
  }
  closeModal1() {
    this.menu.enable(false, 'second');
  }
  clickEVent() {
    // if (this.slideBoolean == false) {
    //   $('#A').css('width', '50%')
    //   $('#B').css('width', '50%')

    //   this.slideBoolean = true;

    // }
    // else {
    //   $('#A').css('width', '100%')
    //   $('#B').css('width', '0%')

    //   this.slideBoolean = false;

    // }

    if (this.isRemoved != true) {
      this.menu.enable(true, 'first');
    }

    this.menu.open('first');
    console.log("calick")
    // this.slideBoolean=false;
    //  $('#B').css('left', '0')

    // $('#B').css('left', '200px')
  }

  checkblocked() {
    var data = {
      uid: this.Uid,
      buddyid: this.buddydetails.mobile,
    }
    this.service.PostRequest(this.service.mainAPI + '/checkblockBuddy', data).then(res => {
      console.log("checkblockBuddy:" + JSON.stringify(res));
      var getdata: any;
      getdata = res;
      if (getdata["error"] == null && getdata.length != 0) {

        getdata.forEach(element => {
          if (element.uid == this.buddydetails.mobile && element.buddyid == this.Uid) {
            this.buddyblocked = true;
          }
          // my blocked
          if (element.uid == this.Uid && element.buddyid == this.buddydetails.mobile) {
            this.myblocked = true;
          }

        });
      }

    }, err => {
      console.log(err);
      this.buddyblocked = false;
      this.myblocked = false
    })
  }
  clearunreadmessage() {
    if (this.buddydetails != undefined) {
      var data = {
        uid: this.Uid,
        buddyid: this.buddydetails.mobile,
        message_id: this.buddydetails.mobile + "_" + this.Uid,
      }
      //server db clearunreadmessage

      this.service.PostRequest(this.service.mainAPI + '/updateUnreadtcount', data).then(res => {

      })

      //local db clearunreadmessage
    }
  }

  ngOnInit() {
    // window.history.forward(1);
    window.history.go(-1);

    this.audioWeb = new Audio();
    this.audioWeb.src = 'assets/mp3/receive.wav';
    this.audioWeb.load();

    this.pageActive = true;
    // var room = { sender: localStorage.getItem('LinkususerID'), receiver:Date.now()+this.guid() };
    // this.socket.emit('room', room);

    console.log("ngOnInit")
    this.myfriends = []


    var room = { sender: localStorage.getItem('LinkususerID'), receiver: Date.now() + this.guid() };


    this.scrollValue = 70;
    this.pageAlive == true;


    this.socket.connect();
    this.get_todaytask();

    this.resetEvent();
    this.getmyevents();
    this.getmyfiles();
    this.getallcontacts();
    this.getusers();
    this.getprojects();
    this.Receive(); //receive 1
    this.groupReceive();



    this.socket.on('online_offline', (msg) => {
      console.log("recent online_offline :" + JSON.stringify(msg))

      if (this.myfriends.length != 0) {
        this.myfriends.forEach(element => {
          console.log("recent myfriends :" + element.buddyid + ":" + msg.mobile)

          if (element.buddyid == msg.mobile) {
            element.empstatus = msg.status;
          }

        });
        console.log("this.myfriends :" + JSON.stringify(this.myfriends))

      }
      // if (msg.mobile == this.buddy.mobile) {
      //   this.buddydetails["status"] = msg.status;
      //   this.buddydetails["last_changed"] = msg.last_changed;

      // }
    })
  }

  ionViewDidEnter() {
    // this.scrollToBottomOnInit();
    console.log('ionViewDidEnter' + this.forwardFlag);
    this.BuddyRecentDBProvider.recentList = [];

    this.dataLoad();
    //this.setUIBackButtonAction();

    if (this.networkProvider.forwardFlow == true) {
      this.scrollValue = 70;
      this.getchat(this.scrollValue)
      this.getgroupchat(this.scrollValue)
    }
    // this.setUIBackButtonAction();
    this.status = "0";
    this.backgroundAll = 'orange';
    this.backgroundLive = '#f8f8f8';
    this.fontcolorlive = 'black'
    this.fontcolorall = 'white';
  }


  scrollToBottomOnInit() {
    // // this.content.scrollToBottom(100);

    setTimeout(() => {
      try {
        // if (this.finishedLoading == false) {
        // this.contentArea.scrollToBottom();
        console.log("scrollto ")
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        // this.textarea2.nativeElement.focus();

        // this.finishedLoading = true;
        //  }
      }
      catch (error) {
        console.log("scrollto :" + error)
      }
    }, 100);
  }


  doSomething() {
    console.log("doSomething")
  }

  doAnotherThing() {
    console.log("doAnotherThing")

  }
  selectmsg(msg, i) {
    console.log("selectmsg")

    this.selection_status = true;
    document.getElementById("chatrow" + i).style.background = '#0390ff85';
    this.selected_msg.push(msg);
    console.log(this.selected_msg);
  }

  deselect(msg, i) {
    console.log("pressed")
    this.pressed = true;
    if (this.selection_status == true && this.pressed) {
      document.getElementById("chatrow" + i).style.background = 'none';

      const index = this.selected_msg.indexOf(msg);
      if (index > -1) {
        this.selected_msg.splice(index, 1);
      }
      this.selection_status = false;
      console.log(this.selected_msg);
    }
  }

  async assigntask(msg, i) {
    console.log(msg, i);
    var data = {
      msg_data: msg,
      flow: "1"
      // buddy_mob: this.buddydetails.mobile,
      // buddy_name: this.buddydetails.username
    }

    const modal = await this.modalController.create({
      component: AssigntaskPage,
      componentProps: data
    });

    modal.onDidDismiss().then((dataReturned) => {
      this.allmessages = [];
      this.selected_msg = [];
      this.selection_status = false;
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


  getchat(scrollValue) {
    this.onlinedata(scrollValue);
  }
  getUsersList(event) {

    setTimeout(() => {
      event.target.complete();
      console.log("doRefresh")
      this.scrollValue = parseInt(this.scrollValue) + 70;
      console.log("getUsersList :" + this.scrollValue)


      this.getchat(this.scrollValue);
      // this.ionContentEl.getScrollElement().then((el) => {
      //   el.style.transform = '';
      // });

    });


  }
  onlinedata(scrollValue) {


    var data = {
      message_id: this.message_id,
      message_id1: this.message_id1,
      limit: scrollValue
    }


    // this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
    //   console.log("status_change :" + JSON.stringify(res))
    // })

    this.cleartimestamp = null;
    console.log("onlinedata called:" + this.networkProvider.CurrentStatus)
    if (this.networkProvider.CurrentStatus == true) {
      this.presentLoadingWithOptions();
      this.service.PostRequest(this.service.mainAPI + '/buddy_chatlist', data).then(res => {
        console.log(res);
        this.loadingdismiss();

        this.old_message = res;
        this.allmessages = [];


        this.unreadCount = 0;
        this.old_message.forEach(async element => {

          console.log("element.mydelete :"+element.filetype+":"+this.ApiserviceService.decryptText(element.message))
          // if ((element.mydelete != "1" && element.sentby == localStorage.getItem('LinkususerID')) || (element.sentby != localStorage.getItem('LinkususerID') && element.buddydelete != "1")) {

          if ((element.mydelete != "1" && element.sentby == localStorage.getItem('LinkususerID'))
            || (element.sentby != localStorage.getItem('LinkususerID') && (element.mydelete == "1" && element.buddydelete == null))
            || (element.sentby != localStorage.getItem('LinkususerID') && (element.mydelete == null && element.buddydelete == null))) {


            // this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180605T034427Z.91af97712fd4c7f6.993ff04220e6d494d3d4ea4f43259d296031b85d&text=' + element.message + '&lang=ta').subscribe(resp => {

            //   var obj = JSON.parse(resp['_body'])

            //   if (obj.text.length > 0) {

            if (element.sentby != this.Uid && element.status == "1") {
              this.unreadCount++;
            }
            console.log("this.unreadCount 1111111:" + this.unreadCount)

            var myfavouritedata = 0;
            if (element.myfavourite == "1" && element.sentby == localStorage.getItem('LinkususerID')) {
              myfavouritedata = element.myfavourite;
            }
            else if ((element.sentby != localStorage.getItem('LinkususerID') && element.buddyfavourite == "1")) {
              myfavouritedata = element.buddyfavourite;
            }
            var messgaetxt = null;
            if (element.sentby == this.Uid) {
              if (this.ApiserviceService.decryptText(element.message).indexOf('UnBlocked') > -1) {
                messgaetxt = "You UnBlocked " + this.buddydetails.username;
              }
              else if (this.ApiserviceService.decryptText(element.message).indexOf('Blocked') > -1) {
                messgaetxt = "You Blocked " + this.buddydetails.username;
              }
              else {
                messgaetxt = this.ApiserviceService.decryptText(element.message)
              }
            }
            else {
              if (this.ApiserviceService.decryptText(element.message).indexOf('UnBlocked') > -1) {
                messgaetxt = this.buddydetails.username + " UnBlocked You";
              }
              else if (this.ApiserviceService.decryptText(element.message).indexOf('Blocked') > -1) {
                messgaetxt = this.buddydetails.username + " Blocked You";
              }
              else {
                messgaetxt = this.ApiserviceService.decryptText(element.message)
              }
            }

            var item = {
              createdAt: element.timestamp,
              filetype: element.filetype,
              msgtype: element.filetype,
              message: messgaetxt,
              sentby: element.sentby,
              message_id: element.message_id,
              timestamp: element.timestamp,
              sentto: element.sentto,
              status: element.status,
              countStatus: element.status,
              fileextension: element.fileextension,
              tagmessage: this.ApiserviceService.decryptText(element.tagmessage),
              tagfileextension: element.tagfileextension,
              tagfiletype: element.tagfiletype,
              tagtime: element.tagtime,
              unreadCount: this.unreadCount,
              livelocation: element.livelocation,
              location: element.location,
              forwardmsg: element.forwardmsg,
              selected: false,
              attachtext: this.ApiserviceService.decryptText(element.attachtext),
              selectedColor: "none",
              showMore: false,
              favourite: myfavouritedata,
            }

            if (element.cleartimestamp != null && element.sentby == localStorage.getItem('LinkususerID')) {
              this.cleartimestamp = element.cleartimestamp;
            }
            if (this.cleartimestamp != null && ((element.myfavourite != "1" && element.sentby == localStorage.getItem('LinkususerID')) || (element.sentby != localStorage.getItem('LinkususerID') && element.buddyfavourite != "1"))) {

              var getdate1 = new Date(parseInt(this.cleartimestamp))
              var getdata = new Date(parseInt(element.timestamp))
              console.log("myGroupTimestamp :" + getdate1 + ":" + getdata)

              if (getdata >= getdate1) {
                this.allmessages.push(item);
              }
            }
            else {
              this.allmessages.push(item);
            }

            var obj = {
              receiver: this.Uid,
              buddy: this.buddyinfo.mobile,
              Status: "2"
            }
            this.socket.emit('status_change', obj);

            console.log('this.allmessages' + JSON.stringify(this.allmessages));

            if (element.selfdestruct == "true" && element.status == "2" && element.sentto == this.Uid) {
              let msg = element.message;

              var matches = msg.match(/[\w\d\’\'-]+/gi);
              // return matches ? matches.length : 0;
              console.log(matches.length);

              setTimeout(() => {
                const index = this.allmessages.indexOf(item);
                if (index > -1) {
                  this.allmessages.splice(index, 1);

                }
              });
            }
            //Code block to hide incoming selfdestruct message after certain interval By:Akshai 
            if (element.selfdestruct == "true" && element.status == "1" && element.sentto == this.Uid) {
              let msg = element.message;

              var matches = msg.match(/[\w\d\’\'-]+/gi);
              // return matches ? matches.length : 0;
              console.log(matches.length);

              setTimeout(() => {
                const index = this.allmessages.indexOf(item);
                if (index > -1) {
                  this.allmessages.splice(index, 1);
                }
              }, 462 * matches.length);
            }

            if (element.filetype == "event") {
              console.log(element.message);
              var str = element.message.split(" - ");
              var title = str[0];
              element.event_title = title;
              element.message = str[1];
              // console.log(msg,title);
              var str = element.message.split(" by ");
              var description = str[0];
              element.message = str[1];
              // console.log(msg,description);
              var str = element.message.split(" to ");
              var start_time = str[0];
              var end_time = str[1];
              // console.log(start_time,end_time);
              var data = {
                title: title,
                startTime: new Date(start_time).toISOString(),
                endTime: new Date(end_time).toISOString(),
                desc: description,
                createdby: element.sentto,
                // createdby_name: senttoname,
              }
              console.log(data);

              await this.service.PostRequest(this.service.mainAPI + '/check_accepted_events', data).then(res => {
                console.log(res);
              }, err => {
                if (err.error.text == "event accepted") {
                  element.event_accepted = 'true';
                  this.localNotifications.schedule({
                    text: data.title,
                    trigger: { at: new Date(new Date(data.startTime).getTime() - 300000) },
                    led: 'FF0000',
                  });
                } else {
                  element.event_accepted = 'false';
                }
              })
            }

          }


        });

        this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
          console.log("updatechatmesage :" + JSON.stringify(res))
          this.dataLoad();
          // this.textarea1.nativeElement.focus();
          this.textarea1.nativeElement.focus();

        })
        this.removeDups(this.allmessages);
        this.allmessages.sort(function (a, b) {
          var c = new Date(parseInt(a.timestamp));
          var d = new Date(parseInt(b.timestamp));
          return c > d ? 1 : -1;
        });
        this.datewiseshow();
        this.unreadMessageShow();

        this.scrollToBottomOnInit();
        // this.loadingdismiss();

        console.log("this.allmessages:" + JSON.stringify(this.allmessages));
      }, err => {
        this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
          console.log("updatechatmesage err :" + JSON.stringify(res))
          this.dataLoad();
          // this.textarea1.nativeElement.focus();
          this.textarea1.nativeElement.focus();

        }).catch(err => {
          this.textarea1.nativeElement.focus();

        })
        this.loadingdismiss();
        console.log(err);
      })
    }

  }

  datewiseshow() {
    console.log("datewiseshow ");
    var currentLetter = null;
    var today = new Date();

    this.allmessages.forEach((value, index) => {
      var getdata = new Date(parseInt(value.timestamp));

      console.log("currentLetter 1" + currentLetter + ":" + this.convertDateFormat(getdata) + ":" + value.timestamp)
      if (this.convertDateFormat(getdata) != currentLetter && 'Today' != currentLetter) {
        if (this.convertDateFormat(getdata) == this.convertDateFormat(today)) {
          currentLetter = "Today";
          console.log("Today");
        }

        else {
          currentLetter = this.convertDateFormat(getdata);
        }
        console.log("currentLetter 2" + currentLetter + ":" + this.convertDateFormat(getdata) + ":" + value.timestamp)


        value.timeset = currentLetter;

        console.log("value.timeset" + value.timeset);
      }

    });
  }

  unreadMessageShow() {
    console.log("unreadMessageShow ");
    var currentLetter = null;
    var today = new Date();

    var unreadMessageCount = 0;
    this.allmessages.forEach((value, index) => {

      if (currentLetter != "txt" && value.sentby != this.Uid && value.countStatus == "1") {
        currentLetter = "txt"
        value.unreadMessageCount = value.unreadCount + " UNREAD MESSAGE";
      }
      console.log("value.unreadMessageCount :" + value.countStatus + ":" + value.sentby + ":" + value.unreadMessageCount)

      if (value.sentby != this.Uid && value.status == "1") {
        value.status = "2"

        var obj = {
          receiver: this.Uid,
          buddy: this.buddyinfo.mobile,
          Status: "2"
        }
        this.socket.emit('status_change', obj);
      }

    });


  }
  convertDateFormat(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    return (dd + "-" + mm + "-" + yyyy);

  }
  replaceAllText(string, search, replace) {
    return string.split(search).join(replace);
  }
  switchEmojiPicker() {
    this.tempMsg = ''

    this.ApiserviceService._content = ''
    if (this.showEmojiPicker == false) {
      console.log("drag true")
      this.showEmojiPicker = true;
    }
    else {
      this.showEmojiPicker = false;
    }

    this.scrollToBottomOnInit();
  }
  onCancel4() {
    this.groupmembers2 = this.groupmembers;

  }
  searchuser1(event) {
    if (this.groupmembersinlist == true) {
      // this.groupmembers2=[];
      // this.groupmembers2 = this.groupmembers.filter((v) => {

      //       if (v.username.indexOf() > -1) {
      //         return true;
      //       }



      //   })

      var q = event.target.value;


      if (event.charCode != 64 && q != undefined && q.trim() == '') {
        console.log("setrach 3:")
        this.groupmembers2 = this.groupmembers;

        // this.groupmembersinlist=false;
        return;
      } else {
        console.log("setrach 2:" + q + ":" + event.target.value)

        this.groupmembers2 = this.groupmembers.filter((v) => {
          if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          else {
            return false;
          }
        })

      }
    }

  }
  onEnterKeyPress(event, data) {
    this.groupmembers2 = [];
    this.groupmembers2 = this.groupmembers;

    if (event.charCode == 64) {
      // this.tempText = this.newmessage;
      this.groupmembersinlist = true;
    }

    // console.log("event.charCode  :" + event.charCode+":"+this.tempText)


  }
  onEnterKeyPress1(event, data) {
    this.groupmembers2 = [];
    this.groupmembers2 = this.groupmembers;



    if (event.charCode == 64 || data == "@") {
      this.groupmembersinlist = true;
    }
    console.log("event.charCode  :" + event.charCode + ":" + data)
    if (this.groupmembersinlist == true) {
      // this.groupmembers2=[];
      // this.groupmembers2 = this.groupmembers.filter((v) => {

      //       if (v.username.indexOf() > -1) {
      //         return true;
      //       }



      //   })
      console.log("this.newmessage :" + this.newmessage)
      var getText = this.newmessage;
      var str = getText;

      var q = event.target.value.replace('@', '')
      console.log("setrach 2:" + + ":" + getText)

      if (getText != undefined) {
        // this.newmessage.toString().replace('@', '')
        console.log("this.newmessage :" + this.newmessage)

        q = this.replaceAllText(getText, getText, q);
      }

      console.log("setrach :" + q + ":" + getText)
      if (event.charCode != 64 && q != undefined && q.trim() == '') {
        console.log("setrach 3:")

        // this.groupmembersinlist=false;
        return;
      } else {
        console.log("setrach 2:" + q)

        this.groupmembers2 = this.groupmembers.filter((v) => {
          if (v.username.toLowerCase().indexOf(q.toLowerCase()) > -1) {
            return true;
          }
          else {
            return false;

          }
        })

      }
    }


  }
  grouplistclick(name) {
    this.TempgroupMessage = ''
    this.TempgroupMessage = this.newmessage;
    this.newmessage = '';

    if (this.TempgroupMessage != undefined) {
      this.newmessage = this.TempgroupMessage;
    }

    // console.log("emojis:created :"+emoji+"::"+this.tempMsg+":"+this.newmessage)
    // this.newmessage = this.TempgroupMessage.replace('@', '') + ' ' + "@" + name + " ";
    this.newmessage = this.replaceAllText(this.TempgroupMessage, "@", '') + ' ' + name + " ";

    this.TempgroupMessage = this.newmessage;

    // this.newmessage=name;
    this.groupmembersinlist = false;
  }
  onPaste(event: any) {

    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {

      const reader = new FileReader();
      reader.onload = (evt: any) => {
        console.log(evt.target.filetype);


        //this.imgRenderer.nativeElement.src = evt.target.result;
        this.onUploadChangepasteimage(evt);
        //  console.log('result'+evt.target.result);
      };
      reader.readAsDataURL(blob);

    }
  }
  onPaste1(event: any) {

    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let blob = null;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
      }
    }

    // load image if there is a pasted image
    if (blob !== null) {
      const reader = new FileReader();
      reader.onload = (evt: any) => {
        console.log(evt.target.filetype);


        //this.imgRenderer.nativeElement.src = evt.target.result;
        this.onUploadChangepasteimagegroup(evt);
        //  console.log('result'+evt.target.result);
      };
      reader.readAsDataURL(blob);

    }
  }
  onInput(content: string) {
    console.log('onInput' + content);
  }
  hidetext(msg) {
    if (msg.selfdestruct == "true" && msg.status == "2" && msg.sentto == this.Uid) {
      // const index = this.allmessages.indexOf(msg);
      // if (index > -1) {
      //   this.allmessages.splice(index, 1);
      // }
      console.log("selfdestruct message");
      return false;
    } else {
      return true;
    }

  }
  send(msg) {
    console.log("Send item :" + JSON.stringify(msg))
    if (msg != '') {

      // Push the message through socket 
      this.socket.emit('chatmessage', msg);
      this.scrollToBottomOnInit();
    }

    // this.chat_input='';
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
  sendMessage() {
    var sendata = new Date();

    this.allmessages.forEach(element => {
      if (element.unreadMessageCount != null) {
        element.unreadMessageCount = null;
      }
    });
    this.unreadCount = null;

    this.txtKeyUp();
    if (this.message != undefined && this.message != '' && this.message.trim() != '') {
      var status = "0";
      console.log("this.networkProvider.CurrentStatus :" + this.networkProvider.CurrentStatus)
      if (this.networkProvider.CurrentStatus == true) {
        status = "1";
      }
      console.log("message status :" + status)
      let re = /\*/gi;



      console.log("check message:" + this.Textbold(this.message))
      var array1 = {
        buddyid: this.buddyinfo.mobile,
        message: this.ApiserviceService.encryptText(this.urlify(this.Textbold(this.message.trim()))),
        sentby: this.Uid,
        username: this.buddyinfo.username,
        buddyImage: this.buddyinfo.photourl,
        message_id: this.Uid + "_" + this.buddyinfo.mobile,
        timestamp: sendata.getTime(),
        deviceid: this.buddyinfo.deviceid,
        sentto: this.buddyinfo.mobile,
        location: false,
        latitude: undefined + ',' + undefined,
        status: status,
        filetype: "text",
        channel: "web",
        fileextension: '',
        tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
        tagfileextension: this.tagfileextension,
        tagfiletype: this.filetype,
        tagtime: this.tagtime,
        Taskfrom: '',
        Taskto: '',
        chatType: "1",
        attachtext: this.ApiserviceService.encryptText(null),
        forwardmsg: null,
        showMore: false,
        selfdestruct: this.self_destruct   //For Self Destruct message

      }
      this.send(array1);

      var array = {
        message: this.urlify(this.Textbold(this.message)),
        sentby: this.Uid,
        username: this.buddyinfo.username,
        buddyImage: this.buddyinfo.photourl,
        message_id: this.Uid + "_" + this.buddyinfo.mobile,
        timestamp: sendata.getTime(),
        deviceid: this.buddyinfo.deviceid,
        sentto: this.buddyinfo.mobile,
        location: false,
        latitude: undefined + ',' + undefined,
        status: status,
        filetype: "text",
        fileextension: '',
        channel: "web",
        attachtext: null,
        tagmessage: this.tagmessage,
        tagfileextension: this.tagfileextension,
        tagfiletype: this.filetype,
        tagtime: this.tagtime,
        Taskfrom: '',
        Taskto: '',
        chatType: "1",
        selected: false,
        selectedColor: "none",
        forwardmsg: null,
        showMore: false,
        selfdestruct: this.self_destruct,  //For Self Destruct message
      }
      console.log(array);
      this.allmessages.push(array);
      this.scrollToBottomOnInit();
      //offline data insert

      this.BuddyChatProvider.createMessage(array1, "1").then(res => {
        if (this.networkProvider.CurrentStatus == true) {

        }
      });
      //  }

      console.log("before send chat :" + JSON.stringify(array))



      this.Replycancel();
      this.message = '';
      this.filetype = '';
      this.latitude = '';
      this.location = '';
      this.tagfileextension = '';
      this.tagmessage = '';
      this.tagtime = '';
      this.showEmojiPicker = false;
      this.tempMsg = '';
      // this.emoji._content='';
      this.scrollToBottomOnInit();


    }

  }


  fileChangeEvent(fileInput: any) {
    console.log("fileChangeEvent ")

    // this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 1024;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      //console.log("fileInput.target.files[0].size :" + fileInput.target.files[0].size)

      // var FileSize = fileInput.target.files[0].size / 1024; // in 1MB
      var FileSize = fileInput.target.files[0].size / 1024 / 1024;

      // if (FileSize > 2) {
      //   alert('File size exceeds 1 MB');
      //   // $(file).val(''); //for clearing with Jquery
      // } else {

      // }
      //console.log("image type 1:" + fileInput.target.files[0].type)

      if (fileInput.target.files[0].type != 'image/png' && fileInput.target.files[0].type != 'image/PNG' &&
        fileInput.target.files[0].type != 'image/jpeg' && fileInput.target.files[0].type != 'image/JPEG'
        && fileInput.target.files[0].type != 'image/jpg' && fileInput.target.files[0].type != 'image/JPG') {
        //console.log("image type 2:" + fileInput.target.files[0].type)

        $("#file").val('')
        // this.imageError = 'Only Images are allowed ( JPG | PNG)';
        // alert(this.imageError)

        return false;
      }

      // if (fileInput.target.files[0].size > max_size) {
      // if (FileSize > 2) {
      // if (fileInput.target.files[0].size > 1200000) {

      //   this.imageError =
      //     'Maximum size allowed is 1 Mb';
      //   $("#file").val('')
      //   alert(this.imageError)
      //   return false;
      // }


      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          //console.log(img_height, img_width);


          if (img_height > max_height && img_width > max_width) {
            alert(
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px');
            return false;
          } else {

            // const myDialog = this.dialog.open(LoaderSpinnerComponent, {
            //   disableClose: true,

            // });

            const imgBase64Path = e.target.result;
            console.log("imgBase64Path :" + imgBase64Path)
            // this.cardImageBase64 = imgBase64Path;
            //console.log("file upload:" + imgBase64Path)
            // this.isImageSaved = true;
            // this.previewImagePath = imgBase64Path;
            var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
            var base64result = imgBase64Path.split(',')[1]

            var imagename = "HereAppCompanylogo" + imagecif + ".jpg";
            var profilepic = "data:image/jpeg;base64," + base64result;

            //  this.selectedImage = "data:image/jpeg;base64," + base64result;
            //console.log("selectedImage :"+this.selectedImage)

            var file = this.dataURLtoFile(profilepic, imagename);

            //  var url = this.callservice.link + '/uploadlinkusimage';
            const formData: any = new FormData();
            formData.append("upload", file, imagename);

            // this.http.post(url, formData)

            //   .subscribe(
            //     (value) => {
            //       this.CompanyLogo = this.callservice.ImagePath + imagename;
            //       console.log("subscribe value1:" + this.CompanyLogo + ":" + JSON.stringify(value));
            //       myDialog.close()
            //     },
            //     // success,
            //     (err) => {
            //       this.CompanyLogo = this.callservice.ImagePath + imagename;
            //       console.log("subscribe value2:" + this.CompanyLogo + ":" + JSON.stringify(err));
            //       myDialog.close()

            //     })




            // this.callservice.PostRequest(url, formData).catch(res => {
            //   //console.log("profile added :" + res);
            //   //  if (res["Successfully Added!"])
            //   // imageLogo
            //   this.CompanyLogo = this.callservice.ImagePath + imagename;


            // });

          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  Replycancel() {

    this.addmessagehide = false;
    this.tagmessage = null;
    this.tagtime = null;
    this.tagfileextension = null;

  }
  stopLocation(message, timestamp) {
    this.presentAlertConfirm('', 'Stop Sharing Live Location?', timestamp)

  }
  async mobileLcoation(locationValue, sentby) {

    const model = await this.modalController.create({
      component: GooglelocationPage,
      componentProps: {
        locationValue: locationValue,
        buddyname: this.buddydetails.username,
        buddy: this.buddydetails.mobile,
        sentby: sentby
      }
    });

    model.present();
    model.onWillDismiss().then(data => {

      var mapType = "map"
      if (data != undefined && data["data"]["currlatLng"] != undefined) {

        console.log("dataLocation :" + data["data"]["live"])

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
                    sender: localStorage.getItem('LinkususerID'),
                    type: "1",
                    receiver: self.buddydetails.mobile
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
        var sendata = new Date();
        var array = {
          buddyid: this.buddyinfo.mobile,
          sentby: this.Uid,
          username: this.buddyinfo.username,
          buddyImage: this.buddyinfo.photourl,
          message_id: this.Uid + "_" + this.buddyinfo.mobile,
          timestamp: sendata.getTime(),
          sentto: this.buddyinfo.mobile,
          message: this.ApiserviceService.encryptText(data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"]),
          location: 'true',
          // latitude: data["currlatLng"] + ',' + data["currlatLongng"],
          status: status,
          attachtext: this.ApiserviceService.encryptText(null),
          filetype: mapType,
          tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
          tagfileextension: this.tagfileextension,
          tagtime: this.tagtime,
          Tagsend: this.Tagsend,
          Tagto: this.Tagto,
          Date: new Date(),
          tagfiletype: this.filetype,
          Taglatitude: this.latitude,
          Taglocation: this.location,
          fileextension: '',
          Taskfrom: '',
          Taskto: '',
          chatType: "1",
          forwardmsg: null,
          channel: "web",
          livelocation: true,
          selected: false,
          selectedColor: "none",
          showMore: false
        }
        var array1 = {
          buddyid: this.buddyinfo.mobile,
          sentby: this.Uid,
          username: this.buddyinfo.username,
          buddyImage: this.buddyinfo.photourl,
          message_id: this.Uid + "_" + this.buddyinfo.mobile,
          timestamp: sendata.getTime(),
          sentto: this.buddyinfo.mobile,
          message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
          location: 'true',
          // latitude: data["currlatLng"] + ',' + data["currlatLongng"],
          status: status,
          attachtext: null,
          filetype: mapType,
          channel: "web",
          tagmessage: this.tagmessage,
          tagfileextension: this.tagfileextension,
          tagtime: this.tagtime,
          Tagsend: this.Tagsend,
          Tagto: this.Tagto,
          Date: new Date(),
          tagfiletype: this.filetype,
          Taglatitude: this.latitude,
          Taglocation: this.location,
          fileextension: '',
          Taskfrom: '',
          Taskto: '',
          chatType: "1",
          forwardmsg: null,
          livelocation: true,
          selected: false,
          selectedColor: "none",
          showMore: false,
          favourite: null,
        }

        console.log('array data' + JSON.stringify(array));
        this.send(array);
        // this.allmessages.push(array);
        // console.log("before send ahat")
        // this.BuddyChatProvider.createMessage(array, "1");
        // this.scrollToBottomOnInit();


        this.allmessages.push(array1);
        this.scrollToBottomOnInit();


        // online data insert
        this.BuddyChatProvider.createMessage(array, "1").then(res => {

        });


        // this.chatservice.addnewmessage("googleLoc:" + data.currlatLng + ':' + data.currlatLongng, "map", this.tagmessage, this.tagtime, this.filetype, this.latitude, this.location, null, new Date(), this.tagfileextension, "", "", "").then(() => {
        //   this.newmessage = '';
        // })
        // this.content.scrollToBottom();

      }
    });
  }
  fileshare() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.Camera).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPSnew();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermissionnew();
        }
      },
      err => {

        this.presentAlert('Turn on location to processed!');

      }
    );
  }
  requestGPSPermissionnew() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPSnew();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              this.presentAlert('Please Check your Internet Connection')
            }
          );
      }
    });
  }

  askToTurnOnGPSnew() {
    console.log("askToTurnOnGPSnew called");
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates

        this.mobileLcoation("", "");

      },
      error => this.presentAlert('Please check your internet connection')
    );
  }

  addGallery() {
    this.showpopSingle = false

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
    this.presentLoadingWithOptions();
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



              //online image


              var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

              var imagename = "linkus" + imagecif + ".jpg";
              var profilepic = file;
              var file1 = this.dataURLtoFile(profilepic, imagename);
              var url = this.service.mainAPI + '/uploadlinkusimage';
              const formData: any = new FormData();
              formData.append("upload", file1, imagename);

              this.http.post(url, formData)

                .subscribe(
                  (value) => {
                    console.log("subscribe :" + JSON.stringify(value))
                    console.log("subscribe :" + this.service.ImagePath + imagename)
                    this.loadingdismiss();

                  },
                  // success,
                  (err) => {
                    console.log("err :" + JSON.stringify(err))

                    console.log("error :" + this.service.ImagePath + imagename)

                    this.loadingdismiss();
                    var status = "0";
                    if (this.networkProvider.CurrentStatus == true) {
                      status = "1";
                    }
                    var array = {
                      message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,
                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,
                      attachtext: this.ApiserviceService.encryptText(null),

                      location: false,
                      latitude: false,
                      status: status,
                      filetype: "image",
                      tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: this.createFileName(),
                      Taskfrom: '',
                      Taskto: '',
                      chatType: "1",
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      channel: "web",
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false
                    }
                    var array1 = {
                      message: this.service.ImagePath + imagename,
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,
                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,
                      attachtext: null,

                      location: false,
                      latitude: false,
                      status: status,
                      filetype: "image",
                      tagmessage: this.tagmessage,
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      channel: "web",
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: this.createFileName(),
                      Taskfrom: '',
                      Taskto: '',
                      chatType: "1",
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false,
                      favourite: null,
                    }

                    this.send(array)
                    this.allmessages.push(array1);
                    this.scrollToBottomOnInit();

                    console.log("before send ahat")
                    // online data insert



                    this.BuddyChatProvider.createMessage(array, "1").then(res => {
                      this.scrollToBottomOnInit();

                    });
                    // this.allmessages.push(array)
                    // loader.dismiss();
                    console.log("galleryPicMsg 4")
                  })
            })
          });
      }
    }, (err) => { this.loadingdismiss(); });

  }

  async onUploadChangepasteimagegroup(evt: any) {
    this.showpopSingle = false
    const model = await this.modalController.create({
      component: MultipleimageuploadPage,
      componentProps: {
        Multiimage: evt.target.result,
        pasteimage: 'paste'
      }
    });

    model.present();
    model.onWillDismiss().then(res => {
      if (res.data != undefined) {
        //console.log('onWillDismiss'+JSON.stringify(res));
        var arraydata: any;

        arraydata = res.data["images"];
        this.presentLoadingWithOptions();

        console.log('arraydata.length' + JSON.stringify(arraydata));

        for (var i = 0; i < arraydata.length; i++) {


          // var profilepic = arraydata[i].image;
          const getsharetext = arraydata[i].shareText

          var filetype = arraydata[i].webFileUploadname.substring(arraydata[i].webFileUploadname.lastIndexOf(".") + 1);
          console.log('webFileUploadname' + arraydata[i].webFileUploadname);
          console.log('image' + arraydata[i].image);
          var blobFile = this.makeblob(arraydata[i].image);
          var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

          const imagename = arraydata[i].webFileUploadname;
          this.webimagename = imagename;

          var file = this.makeblob(arraydata[i].image);
          var url = this.service.mainAPI + '/uploadlinkusimage';
          const formData: any = new FormData();
          formData.append("upload", blobFile, imagename);




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
                  message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                  sentby: this.Uid,
                  sendername: this.sendername,
                  photourl: this.photourl,
                  groupimage: this.groupImage,
                  timestamp: new Date().getTime(),
                  fileextension: imagename,
                  replydisplayname: this.replydisplayname,
                  filetype: filetype,
                  experts: null,
                  tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
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
                  channel: "web",
                  Taskto: '',
                  attachtext: this.ApiserviceService.encryptText(getsharetext),
                  opengroup: this.opengroup,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false

                }
                var array2 = {
                  groupname: this.groupname,
                  groupkey: this.groupkey,
                  message: this.service.ImagePath + imagename,
                  sentby: this.Uid,
                  sendername: this.sendername,
                  photourl: this.photourl,
                  groupimage: this.groupImage,
                  timestamp: new Date().getTime(),
                  fileextension: imagename,
                  replydisplayname: this.replydisplayname,
                  filetype: filetype,
                  experts: null,
                  channel: "web",
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
                  attachtext: getsharetext,
                  opengroup: this.opengroup,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false

                }

                this.groupsend(array)
                this.allgroupmsgs.push(array2);
                this.scrollToBottomOnInit();

                //offline data insert

                this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
                  console.log("seneded")
                  // online data insert

                });


                // loader.dismiss();
                console.log("galleryPicMsg 4")
              })


        }
      }
    });
    // Multiimage: evt.target.files

  }
  async onUploadChangepasteimage(evt: any) {

    this.showpopSingle = false
    const model = await this.modalController.create({
      component: MultipleimageuploadPage,
      componentProps: {
        Multiimage: evt.target.result,
        pasteimage: 'paste'
      }
    });

    model.present();

    model.onWillDismiss().then(res => {
      if (res.data != undefined) {
        //console.log('onWillDismiss'+JSON.stringify(res));
        var arraydata: any;
        arraydata = res.data["images"];
        this.presentLoadingWithOptions();

        console.log('arraydata.length' + JSON.stringify(arraydata));

        for (var i = 0; i < arraydata.length; i++) {


          const imagename = arraydata[i].webFileUploadname;
          this.webimagename = imagename;
          const getsharetext = arraydata[i].shareText
          // var profilepic = arraydata[i].image;

          var filetype = arraydata[i].webFileUploadname.substring(arraydata[i].webFileUploadname.lastIndexOf(".") + 1);
          console.log('webFileUploadname' + arraydata[i].webFileUploadname);
          console.log('image' + arraydata[i].image);
          var blobFile = this.makeblob(arraydata[i].image);
          var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);


          console.log("this.webimagename 1:" + imagename)
          var url = this.service.mainAPI + '/uploadlinkusimage';
          const formData: any = new FormData();
          formData.append("upload", blobFile, imagename);



          //online image
          this.http.post(url, formData)

            .subscribe(
              (value) => {
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

                var status = "0";
                if (this.networkProvider.CurrentStatus == true) {
                  status = "1";
                }
                console.log('arraydata.length' + JSON.stringify(arraydata));

                console.log("this.webimagename 2:" + this.service.ImagePath + imagename)


                var array = {
                  message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                  sentby: this.Uid,
                  message_id: this.Uid + "_" + this.buddy.mobile,
                  timestamp: new Date().getTime(),
                  sentto: this.buddy.mobile,

                  buddyid: this.buddyinfo.mobile,
                  username: this.buddyinfo.username,
                  buddyImage: this.buddyinfo.photourl,
                  attachtext: this.ApiserviceService.encryptText(getsharetext),
                  channel: "web",

                  location: false,
                  latitude: false,
                  status: status,
                  filetype: filetype,
                  tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  fileextension: imagename,
                  Taskfrom: '',
                  Taskto: '',
                  chatType: "1",
                  selfdestruct: this.self_destruct,   //For Self Destruct message
                  selected: false,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false
                }

                var array2 = {
                  message: this.service.ImagePath + imagename,
                  sentby: this.Uid,
                  message_id: this.Uid + "_" + this.buddy.mobile,
                  timestamp: new Date().getTime(),
                  sentto: this.buddy.mobile,
                  channel: "web",

                  buddyid: this.buddyinfo.mobile,
                  username: this.buddyinfo.username,
                  buddyImage: this.buddyinfo.photourl,
                  attachtext: getsharetext,

                  location: false,
                  latitude: false,
                  status: status,
                  filetype: filetype,
                  tagmessage: this.tagmessage,
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  fileextension: imagename,
                  Taskfrom: '',
                  Taskto: '',
                  chatType: "1",
                  selfdestruct: this.self_destruct,   //For Self Destruct message
                  selected: false,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false,
                  favourite: null,
                }
                this.send(array)
                this.allmessages.push(array2);
                console.log("before send ahat")
                this.scrollToBottomOnInit();



                // online data insert
                this.BuddyChatProvider.createMessage(array, "1").then(res => {
                  this.scrollToBottomOnInit();

                });


              })
        }
      }
    });
    // Multiimage: evt.target.files

  }
  async onUploadChange(evt: any) {

    this.showpopSingle = false
    const model = await this.modalController.create({
      component: MultipleimageuploadPage,
      componentProps: {
        Multiimage: evt.target.files
      }
    });

    model.present();

    model.onWillDismiss().then(res => {

      if (res.data != undefined) {

        console.log('onWillDismiss' + JSON.stringify(res));

        var arraydata: any;


        arraydata = res.data["images"];
        this.presentLoadingWithOptions();

        console.log('arraydata.length' + JSON.stringify(arraydata));

        for (var i = 0; i < arraydata.length; i++) {

          const getsharetext = arraydata[i].shareText
          const imagename = arraydata[i].webFileUploadname;
          this.webimagename = imagename;

          // var profilepic = arraydata[i].image;

          const filetype = arraydata[i].webFileUploadname.substring(arraydata[i].webFileUploadname.lastIndexOf(".") + 1);
          console.log('webFileUploadname' + arraydata[i].webFileUploadname);
          console.log('image' + arraydata[i].image);
          var blobFile = this.makeblob(arraydata[i].image);
          var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);


          console.log("this.webimagename 1:" + imagename)
          var url = this.service.mainAPI + '/uploadlinkusimage';
          const formData: any = new FormData();
          formData.append("upload", blobFile, imagename);

          //online image
          this.http.post(url, formData)

            .subscribe(
              (value) => {
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

                var status = "0";
                if (this.networkProvider.CurrentStatus == true) {
                  status = "1";
                }
                console.log('arraydata.length' + JSON.stringify(arraydata));

                console.log("this.webimagename 2:" + this.service.ImagePath + imagename)


                var array = {
                  message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                  sentby: this.Uid,
                  message_id: this.Uid + "_" + this.buddy.mobile,
                  timestamp: new Date().getTime(),
                  sentto: this.buddy.mobile,

                  buddyid: this.buddyinfo.mobile,
                  username: this.buddyinfo.username,
                  buddyImage: this.buddyinfo.photourl,
                  attachtext: this.ApiserviceService.encryptText(getsharetext),
                  channel: "web",

                  location: false,
                  latitude: false,
                  status: status,
                  filetype: filetype,
                  tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  fileextension: imagename,
                  Taskfrom: '',
                  Taskto: '',
                  chatType: "1",
                  selfdestruct: this.self_destruct,   //For Self Destruct message
                  selected: false,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false
                }

                var array1 = {
                  message: this.service.ImagePath + imagename,
                  sentby: this.Uid,
                  message_id: this.Uid + "_" + this.buddy.mobile,
                  timestamp: new Date().getTime(),
                  sentto: this.buddy.mobile,

                  buddyid: this.buddyinfo.mobile,
                  username: this.buddyinfo.username,
                  buddyImage: this.buddyinfo.photourl,
                  attachtext: getsharetext,
                  channel: "web",

                  location: false,
                  latitude: false,
                  status: status,
                  filetype: filetype,
                  tagmessage: this.tagmessage,
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  fileextension: imagename,
                  Taskfrom: '',
                  Taskto: '',
                  chatType: "1",
                  selfdestruct: this.self_destruct,   //For Self Destruct message
                  selected: false,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false,
                  favourite: null,
                }

                this.send(array)
                this.allmessages.push(array1);
                console.log("before send ahat")
                this.scrollToBottomOnInit();


                // online data insert
                this.BuddyChatProvider.createMessage(array, "1").then(res => {
                  this.scrollToBottomOnInit();

                });


              })

        }
      }
    });
    // Multiimage: evt.target.files

  }
  makeblob(dataURL) {
    if (dataURL != undefined) {
      const BASE64_MARKER = ';base64,';
      const parts = dataURL.split(BASE64_MARKER);
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });

    }

  }
  async webcamera() {
    this.showpopSingle = false

    const model = await this.modalController.create({
      component: TakephotoPage,

    });

    model.present();
    model.onWillDismiss().then(data => {
      if (data != undefined) {
        console.log("onDidDismiss : " + data["data"]);
        var blobFile = this.makeblob(data["data"])
        console.log('webcamera  :' + blobFile);

        this.presentLoadingWithOptions();
        var result = JSON.stringify(data);
        var base64result = result;
        console.log("base64File :" + base64result);


        var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

        var imagename = "linkus" + imagecif + ".jpg";
        var base64result1 = base64result.split(',');


        var profilepic = "data:image/jpeg;base64," + base64result1[1];
        // console.log("atob :"+this.makeblob(profilepic))
        var file = this.makeblob(data["data"]);
        var url = this.service.mainAPI + '/uploadlinkusimage';
        const formData: any = new FormData();
        formData.append("upload", blobFile, imagename);



        //online image
        this.http.post(url, formData)

          .subscribe(
            (value) => {
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

              var status = "0";
              if (this.networkProvider.CurrentStatus == true) {
                status = "1";
              }
              var array = {
                message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                sentby: this.Uid,
                message_id: this.Uid + "_" + this.buddy.mobile,
                timestamp: new Date().getTime(),
                sentto: this.buddy.mobile,

                buddyid: this.buddyinfo.mobile,
                username: this.buddyinfo.username,
                buddyImage: this.buddyinfo.photourl,
                attachtext: this.ApiserviceService.encryptText(null),
                channel: "web",

                location: false,
                latitude: false,
                status: status,
                filetype: "image",
                tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                tagfileextension: this.tagfileextension,
                tagtime: this.tagtime,
                Tagsend: this.Tagsend,
                Tagto: this.Tagto,
                Date: new Date(),
                tagfiletype: this.filetype,
                Taglatitude: this.latitude,
                Taglocation: this.location,
                fileextension: this.createFileName(),
                Taskfrom: '',
                Taskto: '',
                chatType: "1",
                selfdestruct: this.self_destruct,   //For Self Destruct message
                selected: false,
                forwardmsg: null,
                selectedColor: "none",
                showMore: false
              }

              var array2 = {
                message: this.service.ImagePath + imagename,
                sentby: this.Uid,
                message_id: this.Uid + "_" + this.buddy.mobile,
                timestamp: new Date().getTime(),
                sentto: this.buddy.mobile,

                buddyid: this.buddyinfo.mobile,
                username: this.buddyinfo.username,
                buddyImage: this.buddyinfo.photourl,
                attachtext: null,
                channel: "web",

                location: false,
                latitude: false,
                status: status,
                filetype: "image",
                tagmessage: this.tagmessage,
                tagfileextension: this.tagfileextension,
                tagtime: this.tagtime,
                Tagsend: this.Tagsend,
                Tagto: this.Tagto,
                Date: new Date(),
                tagfiletype: this.filetype,
                Taglatitude: this.latitude,
                Taglocation: this.location,
                fileextension: this.createFileName(),
                Taskfrom: '',
                Taskto: '',
                chatType: "1",
                selfdestruct: this.self_destruct,   //For Self Destruct message
                selected: false,
                forwardmsg: null,
                selectedColor: "none",
                showMore: false,
                favourite: null,
              }
              this.send(array)
              this.allmessages.push(array2);
              console.log("before send ahat")
              this.scrollToBottomOnInit();

              // online data insert
              this.BuddyChatProvider.createMessage(array, "1").then(res => {
                this.scrollToBottomOnInit();

              });


            })

      }
      console.log("onDidDismiss : " + JSON.stringify(data));

    });


  }
  //Poopandi camera  
  sendPicCamera() {
    this.showpopSingle = false


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
              console.log("base64File :" + base64result);


              var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

              var imagename = "linkus" + imagecif + ".jpg";
              var profilepic = "data:image/jpeg;base64," + base64result;
              console.log('profilepic' + profilepic);
              var file = this.dataURLtoFile(profilepic, imagename);
              var url = this.service.mainAPI + '/uploadlinkusimage';
              const formData: any = new FormData();
              formData.append("upload", file, imagename);


              //online image
              this.http.post(url, formData)

                .subscribe(
                  (value) => {
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

                    var status = "0";
                    if (this.networkProvider.CurrentStatus == true) {
                      status = "1";
                    }
                    var array = {
                      message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,
                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,
                      channel: "web",

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,

                      location: false,
                      latitude: false,
                      status: status,
                      filetype: "image",
                      tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: this.createFileName(),
                      Taskfrom: '',
                      Taskto: '',
                      chatType: "1",
                      attachtext: this.ApiserviceService.encryptText(null),
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false
                    }

                    var array1 = {
                      message: this.service.ImagePath + imagename,
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,
                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,
                      channel: "web",

                      location: false,
                      latitude: false,
                      status: status,
                      filetype: "image",
                      tagmessage: this.tagmessage,
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: this.createFileName(),
                      Taskfrom: '',
                      Taskto: '',
                      chatType: "1",
                      attachtext: null,
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false,
                      favourite: null,
                    }
                    this.send(array)
                    this.allmessages.push(array1);
                    console.log("before send ahat")
                    this.scrollToBottomOnInit();



                    // online data insert
                    this.BuddyChatProvider.createMessage(array, "1").then(res => {
                      this.scrollToBottomOnInit();

                    });


                  })

            }).catch((err) => {
              this.loadingdismiss();

            })
          }, (err) => {
            this.loadingdismiss();

            console.log(err);
            console.error('Error cropping image', err);
          });



    }, (err) => {
      // Handle error
      //loader.dismiss();
      this.loadingdismiss();
      console.log("err:" + JSON.stringify(err))
    })
  }


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


  //  Gallery file updated (priya)(new)
  galleryPicMsg1() {
    if (this.platform.is('android') || this.platform.is('ios')) {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => {
          console.log('Has permission?', result.hasPermission)
          // this.fileChoose();
        },
        err => {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        }
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);

      // this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.Camera)
      // .then(status => {
      //   console.log("hasPermission 1:"+JSON.stringify(status))
      //   if (status.hasPermission) {
      //     this.fileChoose();

      //   }
      //   else {
      //     this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.Camera)
      //       .then(status => {
      //         console.log("hasPermission 2:"+JSON.stringify(status))
      //         if (status.hasPermission) {
      //           this.fileChoose();
      //         }
      //       });
      //   }
      // });



    }
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
  galleryPicMsg() {
    this.presentLoadingWithOptions();
    const permissions = Object.keys(this.PERMISSION).map(k => this.PERMISSION[k]);
    this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
      console.log("requestAllPermissions :" + JSON.stringify(status));
      if (status != undefined && status.CAMERA != "DENIED") {
        this.showpopSingle = false

        // let loader = this.loadingCtrl.create({
        //   content: 'Loading  media...'
        // });
        // loader.present();

        this.ImghandlerProvider.fileChooser().then((filePath) => {
          console.log("galleryPicMsg 1:" + JSON.stringify(filePath))
          var getinfo = filePath["Type"].split('/')
          var getfileExtention = filePath["fileExtention"];
          var FileURL = filePath["FileURL"]


          if (getinfo[0] == 'potx' || getinfo[0] == 'pptx' || getinfo[0] == 'ppa' || getinfo[0] == 'pps' ||
            getinfo[0] == 'PDF' || getinfo[0] == 'pdf' || getinfo[0] == 'xla' || getinfo[0] == 'xlt' ||
            getinfo[0] == 'xlsx' || getinfo[0] == 'xls' || getinfo[0] == 'docx' || getinfo[0] == 'dot' ||
            getinfo[0] == 'doc' || getinfo[0] == 'dotx' || getinfo[0] == 'flv' || getinfo[0] == 'avi' || getinfo[0] == 'mp4' ||
            getinfo[0] == 'GIF' || getinfo[0] == 'gif' || getinfo[0] == 'jpeg' || getinfo[0] == 'JPEG' ||
            getinfo[0] == 'PNG' || getinfo[0] == 'png' || getinfo[0] == 'jpg' || getinfo[0] == 'JPG' || getinfo[0] == 'application' || getinfo[0] == 'dotx' || getinfo[0] == 'doc' || getinfo[0] == 'dot' || getinfo[0] == 'docx' || getinfo[0] == 'xls' || getinfo[0] == 'xlsx' || getinfo[0] == 'xlt' || getinfo[0] == 'xla' || getinfo[0] == 'pdf' || getinfo[0] == 'PDF' || getinfo[0] == 'pps' || getinfo[0] == 'ppa' || getinfo[0] == 'pptx' || getinfo[0] == 'potx' || getinfo[0] == 'txt' || getinfo[0] == 'TXT') {

            console.log("galleryPicMsg 2:" + JSON.stringify(filePath))

            let correctPath = filePath["filepath"]
            var currentName = filePath["fileExtention"]

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

              this.http.post(url, formData)

                .subscribe(
                  (value) => {
                    this.loadingdismiss();
                    console.log("file uplaod 1")
                    var status = "0";
                    if (this.networkProvider.CurrentStatus == true) {
                      status = "1";
                    }
                    var array = {
                      displayName: this.BuddyChatProvider.buddy.displayName,
                      photourl: this.BuddyChatProvider.buddy.photourl,

                      message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,

                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,
                      location: false,
                      latitude: false,
                      status: status,
                      filetype: getinfo[0],
                      tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: currentName,
                      Taskfrom: '',
                      Taskto: '',
                      channel: "web",
                      chatType: "1",
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      attachtext: this.ApiserviceService.encryptText(null),
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false
                    }
                    var array2 = {
                      displayName: this.BuddyChatProvider.buddy.displayName,
                      photourl: this.BuddyChatProvider.buddy.photourl,

                      message: this.service.ImagePath + imagename,
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,
                      channel: "web",

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,

                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,
                      location: false,
                      latitude: false,
                      status: status,
                      filetype: getinfo[0],
                      tagmessage: this.tagmessage,
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: currentName,
                      Taskfrom: '',
                      Taskto: '',
                      chatType: "1",
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      attachtext: null,
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false,
                      favourite: null,
                    }
                    this.send(array)
                    this.allmessages.push(array2);
                    this.scrollToBottomOnInit();

                    console.log("before send ahat")


                    this.BuddyChatProvider.createMessage(array, "1").then(res => {
                      this.scrollToBottomOnInit();

                    });

                  },
                  // success,
                  (err) => {
                    // loader.dismiss();
                    this.loadingdismiss();
                    console.log("file uplaod 2")

                    var status = "0";
                    if (this.networkProvider.CurrentStatus == true) {
                      status = "1";
                    }
                    var array = {
                      displayName: this.BuddyChatProvider.buddy.displayName,
                      photourl: this.BuddyChatProvider.buddy.photourl,

                      message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,
                      attachtext: this.ApiserviceService.encryptText(null),
                      channel: "web",

                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,
                      location: false,
                      latitude: false,
                      status: status,
                      filetype: getinfo[0],
                      tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: currentName,
                      Taskfrom: '',
                      Taskto: '',
                      chatType: "1",
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false
                    }
                    var array2 = {
                      displayName: this.BuddyChatProvider.buddy.displayName,
                      photourl: this.BuddyChatProvider.buddy.photourl,

                      message: this.service.ImagePath + imagename,
                      sentby: this.Uid,
                      message_id: this.Uid + "_" + this.buddy.mobile,
                      channel: "web",

                      buddyid: this.buddyinfo.mobile,
                      username: this.buddyinfo.username,
                      buddyImage: this.buddyinfo.photourl,
                      attachtext: null,

                      timestamp: new Date().getTime(),
                      sentto: this.buddy.mobile,
                      location: false,
                      latitude: false,
                      status: status,
                      filetype: getinfo[0],
                      tagmessage: this.tagmessage,
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      tagfiletype: this.filetype,
                      Taglatitude: this.latitude,
                      Taglocation: this.location,
                      fileextension: currentName,
                      Taskfrom: '',
                      Taskto: '',
                      chatType: "1",
                      selfdestruct: this.self_destruct,   //For Self Destruct message
                      selected: false,
                      forwardmsg: null,
                      selectedColor: "none",
                      showMore: false,
                      favourite: null,
                    }
                    this.send(array)
                    this.allmessages.push(array2);
                    console.log("before send ahat")
                    this.scrollToBottomOnInit();

                    // online data insert
                    this.BuddyChatProvider.createMessage(array, "1").then(res => {
                      this.scrollToBottomOnInit();

                    });


                    // this.allmessages.push(array)
                    // loader.dismiss();
                    console.log("galleryPicMsg 4")
                  })



            },
              // success,
              (err) => {
                this.loadingdismiss();
                console.log("galleryPicMsg err:" + JSON.stringify(err))

              })


            // }).catch((err) => {
            //   this.loadingdismiss();
            //   console.log('fileChooser Error1: ' + JSON.stringify(err));
            //   // loader.dismiss();
            // })

          }
          else {
            this.loadingdismiss();
            this.AllowedFormats();
          }
        }).catch((err) => {
          this.loadingdismiss();
          console.log('fileChooser Error2: ' + JSON.stringify(err));
          // loader.dismiss();

        })


      } else {
        this.loadingdismiss();
        this.presentAlert("Please allow permission to access your media files")
      }

    }, error => {
      this.loadingdismiss();
      console.log('requestAllPermissions Error: ' + error);

    });
  }
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file.resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));

          fileName = name;

          // we are provided the name, so now read the file into a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });

          // pass back blob and the name of the file for saving
          // into fire base
          console.log("fileName:" + fileName + "imgBlob : " + imgBlob)
          resolve({
            fileName,
            imgBlob
          });

        })
        .catch(e => reject(e));
    });
  }
  //priya


  //priya
  async addMarker() {
    this.showpopSingle = false

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
                this.mobileLcoation("", "")
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
      console.log("Call model:" + JSON.stringify(this.buddydetails))
      const modal = await this.modalController.create({
        component: GooglelocationPage,
        componentProps: {
          buddy: this.buddydetails.mobile,
          buddyname: this.buddydetails.username
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
          console.log("dataLocation :" + data["data"]["live"] + ":" + mapType)

          var sendata = new Date();
          var array = {
            buddyid: this.buddyinfo.mobile,
            sentby: this.Uid,
            username: this.buddyinfo.username,
            buddyImage: this.buddyinfo.photourl,
            message_id: this.Uid + "_" + this.buddyinfo.mobile,
            timestamp: sendata.getTime(),
            sentto: this.buddyinfo.mobile,
            message: this.ApiserviceService.encryptText(data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"]),
            location: 'true',
            // latitude: data["currlatLng"] + ',' + data["currlatLongng"],
            status: status,
            filetype: mapType,
            attachtext: this.ApiserviceService.encryptText(null),
            tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            Tagto: this.Tagto,
            Date: new Date(),
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            Taglocation: this.location,
            fileextension: '',
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            selfdestruct: this.self_destruct,   //For Self Destruct message
            livelocation: true,
            selected: false,
            forwardmsg: null,
            channel: "web",

            selectedColor: "none",
            showMore: false
          }

          var array1 = {
            buddyid: this.buddyinfo.mobile,
            sentby: this.Uid,
            username: this.buddyinfo.username,
            buddyImage: this.buddyinfo.photourl,
            message_id: this.Uid + "_" + this.buddyinfo.mobile,
            timestamp: sendata.getTime(),
            sentto: this.buddyinfo.mobile,
            message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
            location: 'true',
            // latitude: data["currlatLng"] + ',' + data["currlatLongng"],
            status: status,
            filetype: mapType,
            attachtext: null,
            tagmessage: this.tagmessage,
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            Tagto: this.Tagto,
            Date: new Date(),
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            Taglocation: this.location,
            fileextension: '',
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            selfdestruct: this.self_destruct,   //For Self Destruct message
            livelocation: true,
            selected: false,
            forwardmsg: null,
            channel: "web",

            selectedColor: "none",
            showMore: false,
            favourite: null,
          }
          this.send(array);
          this.allmessages.push(array1);
          this.scrollToBottomOnInit();

          console.log("before send ahat")
          this.BuddyChatProvider.createMessage(array, "1");

          this.scrollToBottomOnInit();
          // this.chatservice.addnewmessage("googleLoc:" + data.currlatLng + ':' + data.currlatLongng, "map", this.tagmessage, this.tagtime, this.filetype, this.latitude, this.location, null, new Date(), this.tagfileextension, "", "", "").then(() => {
          //   this.newmessage = '';
          // })
          // this.content.scrollToBottom();

        }
      });
    }


  }


  async liveLocation(locationValue, timestamp, sentby) {


    // var data={
    //   senderid:this.Uid,
    //   receiverid:this.buddyinfo.mobile,
    //   latlong:locationValue,
    //   timestamp:timestamp,
    //   messageid:this.Uid + "_" + this.buddyinfo.mobile,
    // }
    // this.service.PostRequest(this.service.mainAPI+'/add_location',data).then(res=>{
    //   console.log(res);

    // },err=>{
    //   console.log(err);
    //   if(err.error.text=="insert successfully"){
    //   }
    // })


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
                this.mobileLcoation(locationValue, sentby)
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
          locationValue: locationValue,
          buddyname: this.buddydetails.username,
          buddy: this.buddydetails.mobile,
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

          var sendata = new Date();
          var array = {
            buddyid: this.buddyinfo.mobile,
            sentby: this.Uid,
            username: this.buddyinfo.username,
            buddyImage: this.buddyinfo.photourl,
            message_id: this.Uid + "_" + this.buddyinfo.mobile,
            timestamp: sendata.getTime(),
            sentto: this.buddyinfo.mobile,
            message: this.ApiserviceService.encryptText(data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"]),
            location: 'true',
            // latitude: data["currlatLng"] + ',' + data["currlatLongng"],
            status: status,
            filetype: mapType,
            attachtext: this.ApiserviceService.encryptText(null),
            tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            Tagto: this.Tagto,
            Date: new Date(),
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            channel: "web",
            Taglocation: this.location,
            fileextension: '',
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            selfdestruct: this.self_destruct,  //For Self Destruct message
            selected: false,
            forwardmsg: null,
            livelocation: false,
            selectedColor: "none",
            showMore: false
          }

          var array1 = {
            buddyid: this.buddyinfo.mobile,
            sentby: this.Uid,
            username: this.buddyinfo.username,
            buddyImage: this.buddyinfo.photourl,
            message_id: this.Uid + "_" + this.buddyinfo.mobile,
            timestamp: sendata.getTime(),
            sentto: this.buddyinfo.mobile,
            message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
            location: 'true',
            // latitude: data["currlatLng"] + ',' + data["currlatLongng"],
            status: status,
            filetype: mapType,
            channel: "web",
            attachtext: null,
            tagmessage: this.tagmessage,
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            Tagto: this.Tagto,
            Date: new Date(),
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            Taglocation: this.location,
            fileextension: '',
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            selfdestruct: this.self_destruct,  //For Self Destruct message
            selected: false,
            forwardmsg: null,
            livelocation: false,
            selectedColor: "none",
            showMore: false,
            favourite: null,
          }
          this.send(array);
          this.allmessages.push(array1);
          this.scrollToBottomOnInit();

          console.log("before send ahat")
          this.BuddyChatProvider.createMessage(array, "1");

          this.scrollToBottomOnInit();
          // this.chatservice.addnewmessage("googleLoc:" + data.currlatLng + ':' + data.currlatLongng, "map", this.tagmessage, this.tagtime, this.filetype, this.latitude, this.location, null, new Date(), this.tagfileextension, "", "", "").then(() => {
          //   this.newmessage = '';
          // })
          // this.content.scrollToBottom();

        }
      });
    }


  }

  txtKeyUp() {
    // console.log("txtKeyUp:" + this.message)
    var obj1 = {
      sender: this.Uid,
      receiver: this.buddydetails.mobile,
      typing: false
    }
    this.socket.emit('user_typing', obj1);
  }
  isTyping() {
    var obj = {
      sender: this.Uid,
      receiver: this.buddydetails.mobile,
      typing: true
    }
    this.socket.emit('user_typing', obj);
  }
  StyleChange(data) {

    if (data.length > 0) {

      this.isTyping();
    }
    else {
      var obj1 = {
        sender: this.Uid,
        receiver: this.buddydetails.mobile,
        typing: false
      }
      this.socket.emit('user_typing', obj1);
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


      console.log("range 1  :" + range + "  : " + range.length);
      // console.log("range 2:" + range.join(' '));
      var rangespace = range.join(' ');
      // console.log("rangespace 1:" + JSON.stringify(rangespace))
      // debugger;


      for (i = 0; i < rangespace.length; i++) {
        if (range[i] != undefined && range.length != 0) {
          console.log("rangespace ==" + range[i].charAt(0) + " : " + range[i].charAt(range[i].length - 1))
          if ((range[i].charAt(0) == '*' && range[i].length > 2) && (range[i].charAt(range[i].length - 1) == '*' && range[i].length > 2)) {
            var contentBold = range[i].slice(1, length - 1);
            var sliceText = contentBold.bold();
            range[i] = sliceText;
            this.message = range.join(' ');
            console.log("final :" + this.message);


          }
          else if ((range[i].charAt(0) == '_' && range[i].length > 2) && (range[i].charAt(range[i].length - 1) == '_' && range[i].length > 2) || range[i] == '\n') {
            var contentBold = range[i].slice(1, length - 1);
            var sliceText = contentBold.italics();
            range[i] = sliceText;
            this.message = range.join(' ');
            console.log("final 1:" + this.message);
          }
          else if ((range[i].charAt(0) == '_' && range[i].length > 2) && (range[i].charAt(range[i].length - 1) == '_' && range[i].length > 2)) {
            var contentBold = range[i].slice(1, length - 1);
            var sliceText = contentBold.italics();
            range[i] = sliceText;
            this.message = range.join(' ');
            console.log("final 2:" + this.message);
          }
          else if ((range[i].charAt(0) == '$' && range[i].length > 1) && (range[i].charAt(range[i].length - 1) == '$' && range[i].length > 1)) {
            var contentBold = range[i].slice(1, length - 1);
            var temp = '<u>' + contentBold + '</u>';
            range[i] = temp;
            this.message = range.join(' ');
            console.log("final 3:" + this.message);
          }
        }


      }
    }



  }
  updateScroll() {
    console.log('updating scroll')
    this.scrollToBottomOnInit()
  }
  //priya
  startRecord() {
    this.newMsgBtn = false;

    // if (this.platform.is('ios')) {
    //   this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.m4a';
    //   this.audiofilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
    //   this.audio = this.media.create(this.audiofilePath);
    // } else if (this.platform.is('android')) {
    //   this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.mp3';
    //   this.audiofilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;

    //   this.audio = this.media.create(this.audiofilePath);

    // }

    // if (this.platform.is('ios') || this.platform.is('android')) {
    //   this.audio.startRecord();
    //   this.recording = true;
    //   //this.countTimeDuration(1);
    //   console.log("record duration :" + this.audio.getDuration() + " : " + this.audio.getCurrentPosition);
    // }

  }
  startRecording() {
    this.newMsgBtn = false;
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(mediaStream => {
        this.mediaRecorder = new MediaRecorder(mediaStream);

        this.mediaRecorder.start();
        this.mediaRecorder.onstop = e => {

          if (this.mediaRecordFlag == false) {
            const blob1 = new Blob(this.audio1, { type: 'audio/mp3' });

            //this.recordedAudio.src = URL.createObjectURL(blob);
            // console.log("get autio file :" + URL.createObjectURL(blob1))

            const reader = new FileReader();

            reader.onload = () => {
              // console.log("reader.result :" + reader.result);


              var status = "0";
              if (this.networkProvider.CurrentStatus == true) {
                status = "1";
              }

              var array = {
                message: reader.result,
                buddyid: this.buddyinfo.mobile,
                sentby: this.Uid,
                username: this.buddyinfo.username,
                buddyImage: this.buddyinfo.photourl,
                message_id: this.Uid + "_" + this.buddyinfo.mobile,
                sentto: this.buddyinfo.mobile,
                timestamp: new Date().getTime(),
                location: false,
                latitude: false,
                status: status,
                attachtext: null,
                filetype: "mp3",
                tagmessage: this.tagmessage,
                tagfileextension: this.tagfileextension,
                tagtime: this.tagtime,
                Tagsend: this.Tagsend,
                Tagto: this.Tagto,
                Date: new Date(),
                tagfiletype: this.filetype,
                channel: "web",
                Taglatitude: this.latitude,
                Taglocation: this.location,
                fileextension: this.fileName,
                Taskfrom: '',
                Taskto: '',
                chatType: "1",
                forwardmsg: null,
                selected: false,
                selectedColor: "none",
                showMore: false
              }

              var array1 = {
                message: this.ApiserviceService.encryptText(reader.result.toString()),
                buddyid: this.buddyinfo.mobile,
                sentby: this.Uid,
                username: this.buddyinfo.username,
                buddyImage: this.buddyinfo.photourl,
                message_id: this.Uid + "_" + this.buddyinfo.mobile,
                sentto: this.buddyinfo.mobile,
                timestamp: new Date().getTime(),
                location: false,
                latitude: false,
                status: status,
                attachtext: this.ApiserviceService.encryptText(null),
                filetype: "mp3",
                tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                tagfileextension: this.tagfileextension,
                tagtime: this.tagtime,
                Tagsend: this.Tagsend,
                Tagto: this.Tagto,
                Date: new Date(),
                tagfiletype: this.filetype,
                Taglatitude: this.latitude,
                channel: "web",
                Taglocation: this.location,
                fileextension: this.fileName,
                Taskfrom: '',
                Taskto: '',
                chatType: "1",
                forwardmsg: null,
                selected: false,
                selectedColor: "none",
                showMore: false
              }

              this.send(array1);
              this.allmessages.push(array);
              this.scrollToBottomOnInit();

              console.log("before send ahat")
              this.BuddyChatProvider.createMessage(array1, "1").then(res => {

              });
              this.scrollToBottomOnInit();

              //upload audio
              // this.uploadFirebase(reader.result, new Date());

              // stop media stream
              mediaStream.getTracks().forEach(track => track.stop());

            };
            reader.readAsDataURL(blob1);
          }
          else {
            mediaStream.getTracks().forEach(track => track.stop());
          }

        };
        this.mediaRecorder.ondataavailable = e => {
          this.audio1.push(e.data);
        };
      });

  }

  stopRecording1() {


    this.mediaRecordFlag = false;
    this.newMsgBtn = true;
    this.mediaRecorder.stop();
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
  changeadmin($event, item, i) {
    if (item.owner == "undefined" && this.owner == true) {
      this.groupEventAction(item);

    } else if (this.owner == true && item.uid != localStorage.getItem('LinkususerID') && item.owner != "undefined") {
      this.Event2(item);

    }
  }
  sendNewmessage(newmessage) {
    if (this.networkProvider.CurrentStatus == true) {
      status = "1";
    }

    var sendDate = new Date();
    // var experts = false;
    // if (this.groupinfor["opengroup"] == true && this.experts != undefined) {
    //   experts = this.experts;
    // }

    var array1 = {
      groupname: this.groupname,
      groupkey: this.groupkey,
      message: this.ApiserviceService.encryptText(newmessage),
      sentby: localStorage.getItem('LinkususerID'),
      sendername: localStorage.getItem('name'),
      photourl: null,
      groupimage: this.groupImage,
      timestamp: new Date().getTime(),
      replydisplayname: null,
      filetype: "title",
      experts: null,
      tagmessage: this.ApiserviceService.encryptText(null),
      tagfileextension: null,
      tagtime: null,
      Tagsend: null,
      Tagto: null,
      Date: new Date(),
      tagfiletype: null,
      Taglatitude: null,
      Taglocation: null,
      Filedate: new Date(),
      status: status,
      Taskfrom: '',
      Taskto: '',
      channel: "web",
      opengroup: this.opengroup,
      forwardmsg: null,
      selectedColor: "none",
      showMore: false

    }
    this.groupsend(array1)

    this.GruopChatProvider.createMessage(array1, null, this.groupmembers).then(res => {
      console.log("seneded")


    }).catch(err => {
    });
    this.getgroupchat(this.scrollValue)
  }
  Event2(item) {

    console.log("Event:" + JSON.stringify(item))

    let actionSheet = this.actionSheet.create({
      header: 'My Options',
      buttons: [
        {
          text: 'Dismiss as admin',
          icon: 'person-remove-outline',
          handler: () => {


            this.GruopProvider.RemovegroupAdmin(item.groupkey, item.uid).then(res => {
              this.sendNewmessage(item.username + " no longer an admin")

              this.groupmember();


            })
          }
        },
        // {
        //   text: 'Remove '+this.groupinfor["groupname"],
        //   icon: 'trash-outline',
        //   handler: () => {

        //   }
        // },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            item.selectedColor = "transparent";
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }

  groupEventAction(item) {


    console.log("Event:" + JSON.stringify(item))

    let actionSheet = this.actionSheet.create({
      header: 'My Options',
      buttons: [
        {
          text: 'Make group admin',
          icon: 'person-add-outline',
          handler: () => {

            this.GruopProvider.changegroupAdmin(item.groupkey, item.uid).then(res => {
              this.sendNewmessage(item.username + " now an admin")
              this.groupmember();

            })
          }
        },
        // {
        //   text: 'Forward',
        //   icon: 'return-up-forward-outline',
        //   handler: () => {

        //   }
        // },
        // {
        //   text: 'Remove '+this.groupinfor["groupname"],
        //   icon: 'trash-outline',
        //   handler: () => {

        //   }
        // },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            item.selectedColor = "transparent";
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
    this.stopInterval();
  }
  onPress($event, item, i) {
    item.selectedColor = "rgb(0 150 136 / 8%)";
    this.stopInterval();
    console.log("onPress", $event);

    this.selecteItem = item;
    this.textIndex = i;

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

  Event(item, i) {
    this.selecteItem = item;
    this.textIndex = i;


    console.log("Event")
    if (item.favourite == 1) {
      let actionSheet = this.actionSheet.create({
        header: 'My Options',

        buttons: [

          {

            text: 'Unstar Message',
            icon: 'star-outline',
            handler: () => {
              item.selectedColor = "transparent";
              item.favourite = 0;
              var favourite = 0;

              this.BuddyChatProvider.updatefavouritechat(item.message_id, item.timestamp, item.sentby, favourite).then(res => {

              }).catch(err => {

              })
            }
          },
          {
            text: 'Reply',
            icon: 'repeat-outline',
            handler: () => {
              item.selectedColor = "transparent";
              this.addmessagehide = true;
              this.Tagsend = item.sentby;
              this.Tagto = item.sentto;
              if (item.filetype != "image") {
                this.tagmessage = item.message.split('<div>')[0] + (item.message.indexOf("div") != -1 ? '...' : '');
              }
              else {
                this.tagmessage = item.message;
              }

              this.filetype = item.filetype;
              this.tagtime = item.timestamp;
              this.latitude = item.latitude;
              this.location = item.location;
              this.tagfileextension = item.fileextension;

              console.log("reply1 this.filetype :" + this.filetype + ";" + this.tagmessage)
              // this.textarea1.nativeElement.focus();
              setTimeout(() => {
                this.textarea1.nativeElement.focus();
              }, 1000);
            }
          },
          {
            text: 'Forward',
            icon: 'return-up-forward-outline',
            handler: () => {
              item.selectedColor = "transparent";
              this.forwardClick = true;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
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
              item.selectedColor = "transparent";
              this.forwardClick = false;
              this.forwardFlag = false
              this.deleteFlag = true;
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
              item.selectedColor = "transparent";
              this.assigntask(item, i);
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              item.selectedColor = "transparent";
              console.log('Cancel clicked');
            }
          }
        ]
      }).then(actionsheet => {
        actionsheet.present();
      });

    }
    else {
      let actionSheet = this.actionSheet.create({
        header: 'My Options',

        buttons: [
          // {
          //   text: 'Copy',
          //   icon: 'copy-outline',
          //   handler: () => {
          //     // var copyText = document.getElementById("pwd_spn");
          //     // var textArea = document.createElement("textarea");
          //     // textArea.value = copyText.textContent;
          //     // document.body.appendChild(textArea);
          //     // textArea.select();
          //     // document.execCommand("Copy");
          //     // textArea.remove();
          //     // var textArea = <HTMLInputElement>document.getElementById('message');
          //     $("#message").val(item.message)
          //   }
          // },
          {
            text: 'Star Message',
            icon: 'star',
            handler: () => {
              item.selectedColor = "transparent";
              item.favourite = 1;
              var favourite = 1;

              this.BuddyChatProvider.updatefavouritechat(item.message_id, item.timestamp, item.sentby, favourite).then(res => {

              }).catch(err => {

              })
            }
          },
          {
            text: 'Reply',
            icon: 'repeat-outline',
            handler: () => {
              item.selectedColor = "transparent";
              this.addmessagehide = true;
              this.Tagsend = item.sentby;
              this.Tagto = item.sentto;
              if (item.filetype != "image") {
                this.tagmessage = item.message.split('<div>')[0] + (item.message.indexOf("div") != -1 ? '...' : '');
              }
              else {
                this.tagmessage = item.message;
              }

              this.filetype = item.filetype;
              this.tagtime = item.timestamp;
              this.latitude = item.latitude;
              this.location = item.location;
              this.tagfileextension = item.fileextension;

              console.log("reply1 this.filetype :" + this.filetype + ";" + this.tagmessage)
              // this.textarea1.nativeElement.focus();
              setTimeout(() => {
                this.textarea1.nativeElement.focus();
              }, 1000);
            }
          },
          {
            text: 'Forward',
            icon: 'return-up-forward-outline',
            handler: () => {
              item.selectedColor = "transparent";
              this.forwardClick = true;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
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
              item.selectedColor = "transparent";
              this.forwardClick = false;
              this.forwardFlag = false
              this.deleteFlag = true;
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
              item.selectedColor = "transparent";
              this.assigntask(item, i);
            }
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              item.selectedColor = "transparent";
              console.log('Cancel clicked');
            }
          }
        ]
      }).then(actionsheet => {
        actionsheet.present();
      });
    }
    this.stopInterval1();
  }
  //priya
  playAudio(file, idx) {
    if (this.platform.is('ios')) {
      this.audiofilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.audiofilePath);
    } else if (this.platform.is('android')) {
      this.audiofilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.audiofilePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }

  //priya
  stopAudio() {
    this.audio.stop();

  }


  getPermission(url, fileName, filetype) {

    window.open(url, '_blank');
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
  async presentAlert(tittle) {
    var alert = await this.alertController.create({

      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentAlertConfirm(heading, tittle, timestamp) {
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

            console.log("timestamp :" + timestamp)
            this.BuddyChatProvider.updatechatlocationmesage(this.Uid + "_" + this.buddyinfo.mobile, timestamp).then(res => {
              console.log("updatechatlocationmesage :" + JSON.stringify(res))
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
  async save_event(msg, chat) {
    console.log(msg, chat);
    var str = msg.split(" - ");
    var title = str[0];
    var msg = str[1];
    // console.log(msg,title);
    var str = msg.split(" by ");
    var description = str[0];
    var msg = str[1];
    // console.log(msg,description);
    var str = msg.split(" to ");
    var start_time = str[0];
    var end_time = str[1];
    // console.log(start_time,end_time);
    var data = {
      title: title,
      startTime: new Date(start_time),
      endTime: new Date(end_time),
      desc: description,
      createdby: localStorage.getItem('LinkususerID'),
      createdby_name: localStorage.getItem('name'),
      message_id: chat.message_id,
      message: chat.message
    }

    console.log(data);
    const alert = await this.alertController.create({
      header: data.title,
      subHeader: data.desc,
      cssClass: 'my-custom-class',
      message: 'From: ' + formatDate(start_time, 'd/M/yy, h:mm a', this.locale) + '<br>To: ' + formatDate(end_time, 'd/M/yy, h:mm a', this.locale) + '<br><br>Sure To Accept This Invite?',
      buttons: [
        {
          text: 'Cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.service.PostRequest(this.service.mainAPI + '/add_update_event', data).then(res => {
              console.log(res);
            }, err => {
              console.log(err);
              if (err.error.text == "insert successfully") {
                this.service.presentToast("Event Added Successfully!");
                this.onlinedata(10);
                this.temp_disable = true;

              }
            })
          }
        }
      ]
    });

    await alert.present();


  }

  async chatfilter() {

    if (this.datacheckflag == true) {
      this.datacheckflag = false;
      this.tempArrayList = this.allmessages;
    }

    var data = {
      groupmembers: this.groupmembers
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
            this.allmessages = []
            this.tempArrayList.forEach(element => {
              var getdata = new Date(parseInt(element.timestamp))
              getdata.setHours(0);
              getdata.setMinutes(0);
              getdata.setSeconds(0);

              console.log("check:" + getdata + ":" + fromDate + ":" + toDate)

              if (this.dateCheck(this.convertDateFormat1(fromDate), this.convertDateFormat1(toDate), this.convertDateFormat1(getdata)) == true) {

                mainarray.push(element);
                this.allmessages.push(element);
                console.log("filan :" + JSON.stringify(this.allmessages))

                if (data["data"]["person"][0] != undefined) {
                  this.allmessages = mainarray.filter((v) => {
                    for (var i = 0; i < data["data"]["person"].length; i++) {
                      console.log("person :" + v.sentby + ":" + data["data"]["person"][i].mobile)
                      if (v.sentby.indexOf(data["data"]["person"][i].mobile) > -1) {
                        return true;
                      }

                    }

                  })
                }
                else {
                  this.allmessages = mainarray;
                }
              }

            });

          }

        }
        else {

          this.allmessages = this.tempArrayList;
          console.log("filan :" + JSON.stringify(this.allmessages))

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
  async fileFilter() {

    const model = await this.modalController.create({
      component: FileFilterPage,
      componentProps: {
        message: this.allmessages,
        buddyInfo: this.buddydetails
      }
    });

    model.present();
    model.onWillDismiss().then(data => {

    });
    // this.navCtrl.navigateForward('file-filter', {
    //   queryParams: obj,
    // })
  }

  ionViewWillLeave() {
    this.pageActive = false;
    this.networkProvider.forwardFlow = false;
    // this.socket.disconnect();
    this.pageAlive = false;
    this.txtKeyUp();
    this.grouptxtKeyUp();
    this.stoptone()
  }


  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
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

  // block/unblock
  async blockMethod() {

    console.log("this.blocked  :" + this.myblocked)
    var mess = null, alertmessage = null, sendmessage = null;
    if (this.myblocked == true) {
      mess = "Are you sure unblock" + ' ' + this.buddyinfo.username
      alertmessage = "UnBlocked Successfully"
      // sendmessage = "You Unblocked " + this.buddyinfo.username;
      // sendmessage = this.buddyinfo.username + " UnBlocked";
      sendmessage = "You UnBlocked " + this.buddydetails.username;

    }
    else {
      mess = "Are you sure Block" + ' ' + this.buddyinfo.username
      alertmessage = "Blocked Successfully"
      // sendmessage = "You Blocked " + this.buddyinfo.username;
      // sendmessage = this.buddyinfo.username + " Blocked";
      sendmessage = "You Blocked " + this.buddydetails.username;

    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: mess,
      buttons: [
        {
          text: 'No',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            var data = {
              uid: this.Uid,
              buddyid: this.buddydetails.mobile,
              timestamp: new Date().getTime()
            }

            var status = "0";
            console.log("this.networkProvider.CurrentStatus :" + this.networkProvider.CurrentStatus)
            if (this.networkProvider.CurrentStatus == true) {
              status = "1";
            }

            console.log("status :" + status)
            var array1 = {
              buddyid: this.buddyinfo.mobile,
              message: this.ApiserviceService.encryptText(sendmessage),
              sentby: this.Uid,
              username: this.buddyinfo.username,
              buddyImage: this.buddyinfo.photourl,
              message_id: this.Uid + "_" + this.buddyinfo.mobile,
              timestamp: new Date().getTime(),
              sentto: this.buddyinfo.mobile,
              location: false,
              latitude: undefined + ',' + undefined,
              status: status,
              filetype: "title",
              channel: "web",
              fileextension: '',
              tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
              tagfileextension: this.tagfileextension,
              tagfiletype: this.filetype,
              tagtime: this.tagtime,
              Taskfrom: '',
              attachtext: this.ApiserviceService.encryptText(null),
              Taskto: '',
              chatType: "1",
            }


            this.send(array1);

            var array = {
              message: sendmessage,
              sentby: this.Uid,
              username: this.buddyinfo.username,
              buddyImage: this.buddyinfo.photourl,
              message_id: this.Uid + "_" + this.buddyinfo.mobile,
              timestamp: new Date().getTime(),
              sentto: this.buddyinfo.mobile,
              location: false,
              latitude: undefined + ',' + undefined,
              status: status,
              filetype: "title",
              attachtext: null,
              channel: "web",
              fileextension: '',
              tagmessage: this.tagmessage,
              tagfileextension: this.tagfileextension,
              tagfiletype: this.filetype,
              tagtime: this.tagtime,
              Taskfrom: '',
              Taskto: '',
              chatType: "1",
              forwardmsg: null,
              selected: false,
              selectedColor: "none",
              showMore: false
            }
            this.allmessages.push(array);
            this.scrollToBottomOnInit();

            this.BuddyChatProvider.createMessage(array1, "1").then(res => {

            }).catch(resp => {

            })
            this.scrollToBottomOnInit();
            this.service.PostRequest(this.service.mainAPI + '/block_unblock_buddy', data).then(res => {
              console.log(res);
              this.service.presentToast(alertmessage)

              if (this.myblocked == false) {
                this.myblocked = true;
              } else {
                this.myblocked = false;
              }

              this.socket.emit('buddy_block', data);


            }, err => {
              console.log(err);

              this.service.presentToast(alertmessage)


              if (this.myblocked == false) {
                this.myblocked = true;
              } else {
                this.myblocked = false;
              }
              this.socket.emit('buddy_block', data);


            })


          }
        }
      ]
    });

    await alert.present();

  }
  async menuCLick() {
    var data = {
      myblocked: this.myblocked
    }
    console.log("this.myblocked  :" + this.myblocked)
    const popover = await this.popoverController.create({
      component: BuddymenuComponent,
      componentProps: data,
      cssClass: 'pop',
      // event: ev
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      console.log("menuCLick onDidDismiss 1111 : " + JSON.stringify(data));
      if (data["data"].buddyinfo == "1") {
        this.singleclickEVent(); //open slide bar
      }
      else if (data["data"].buddyinfo == "2") {
        this.fileFilter(); //open file filter
      }
      else if (data["data"].buddyinfo == "3") {
        this.chatfilter(); //open chat filter
      }
      else if (data["data"].buddyinfo == "4") {

        this.blockMethod(); //block//unblock
      }
      else if (data["data"].buddyinfo == "5") {

        this.searchshow(); //block//unblock
      }
      else if (data["data"].buddyinfo == "6") {

        this.clearChat(); //block//unblock
      }
    })
  }
  clearChat() {
    var deleteArray = [];

    this.allmessages = [];
    this.cleartimestamp = new Date().getTime();

    this.BuddyChatProvider.clearMessage(this.cleartimestamp, localStorage.getItem("LinkususerID"), this.buddyinfo.mobile).then(res => {
      this.loadingdismiss();
      // this.getchat(this.scrollValue)
    }).catch(erre => {

      // this.getchat(this.scrollValue)
    })
    this.allmessages = [];
  }
  singleclickEVent() {

    this.menu.enable(true, 'second');
    this.menu.open('second');
  }

  async videoCall() {

    var data = {
      buddy: this.buddyinfo.mobile,
      myid: this.Uid,
      callid: this.callid,
      buddyimage: this.buddyinfo.photourl,
      buddyname: this.buddyinfo.username,
      buddydeviceid: this.buddyinfo.deviceid,
      self_destruct: this.self_destruct,
      typeCall: "Video"


    }

    const model = await this.modalController.create({
      component: VideocallPage,
      componentProps: data
    });

    model.present();
    model.onWillDismiss().then(data => {
      this.getchat(this.scrollValue);
    });
  }
  async audioCall() {

    console.log("audioCall")
    var data = {
      buddy: this.buddyinfo.mobile,
      myid: this.Uid,
      callid: this.callid,
      buddyimage: this.buddyinfo.photourl,
      buddyname: this.buddyinfo.username,
      buddydeviceid: this.buddyinfo.deviceid,
      self_destruct: this.self_destruct,
      typeCall: "Voice"
    }

    const model = await this.modalController.create({
      component: VideocallPage,
      componentProps: data
    });

    model.present();
    model.onWillDismiss().then(data => {
      this.getchat(this.scrollValue);
    });
  }




  // Group chat start
  speechTotextgroup() {
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
        this.groupsendMessage() // sent messgae

      }
      this.cd.detectChanges();
    });

  }

  groupmember() {
    this.owner = false;
    //myGroupStatus
    this.cleartimestamp = null;

    this.groupmembers = [];
    this.GruopProvider.getGroupinfo(this.groupkey).then(res => {
      console.log(" :" + JSON.stringify(res))
      // this.groupmembers = res["member"];
      res["member"].forEach(element => {
        console.log("groupmember :" + element.uid + ":" + localStorage.getItem("LinkususerID") + ":" + element.status)

        if (element.uid == localStorage.getItem("LinkususerID")) {
          this.myJoinedTimeStamp = element.timestamp;
          console.log("myJoinedTimeStamp :"+this.myJoinedTimeStamp+":"+element.uid)
          this.scrollValue = 10;
          this.getgroupchat(this.scrollValue);
        }

        if (element.status == null || element.status == "1") {
          this.groupmembers.push(element)
        }
        else if (element.uid == localStorage.getItem("LinkususerID") && element.status == "0") {
          this.myGroupTimestamp = element.exittimestamp;
          console.log("groupmembermyGroupTimestamp :" + this.myGroupTimestamp);
        }

        if (element.uid == localStorage.getItem("LinkususerID") && element.cleartimestamp != null) {
          this.cleartimestamp = element.cleartimestamp
        }

      });
      this.groupmembers.sort(function (a, b) {
        if (a.username < b.username) { return -1; }
        if (a.username > b.username) { return 1; }
        return 0;
      })
      this.groupmembers.sort(function (a, b) {
        var nameA = a.username.toUpperCase(); // ignore upper and lowercase
        var nameB = b.username.toUpperCase(); // ignore upper and lowercase

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      this.isRemoved = true;
      this.groupmembers.forEach(element => {

        if (element.uid == localStorage.getItem("LinkususerID") && (element.status == undefined || element.status == null || element.status == "1")) {
          console.log("avaible group :" + element.uid + ":" + localStorage.getItem("LinkususerID") + ":" + element.ststus)

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
  groupReceive() {

    // Socket receiving method 
    this.socket.on('groupmessage', (data) => {
      console.log("Receive groupmessage" + data.groupkey + ":" + this.groupkey + ":" + this.opengroup + ":" + data.channel)
      var item = {};
      // check the sender id and change the style class

      if (this.groupChatActive == true && this.isRemoved == false && this.pageAlive == true && data.groupkey == this.groupkey) {
        var experts = false;
        if (this.opengroup == true && this.experts != undefined) {
          experts = this.experts;
        }

        if (data.length != 0) {

          console.log("Receive groupmessag 1 :" + this.unreadCount)


          if (data.sentby != this.Uid && data.status == "1" && this.unreadCount != null) {
            this.unreadCount++;
            this.allgroupmsgs.forEach(element => {
              if (element.unreadCount != null) {
                element.unreadCount = this.unreadCount
              }
            });

            console.log("Receive groupmessag 2   :" + this.unreadCount)
          }

          if (this.opengroup == true || data.opengroup == "true") {
            console.log("Receive groupmessag 3:" + this.groupkey + ",groupkey:" + data.groupkey + ",Uid:" + this.Uid + ",sentby:" + data.sentby + ",experts:" + data.experts)

            if (data.channel != "web" && ((data.sentby == this.Uid && this.groupkey == data.groupkey) && (data.experts == this.Uid || data.experts == "null" || data.experts == null || data.experts == "undefined"))) {

              var array12 = {
                groupkey: data.groupkey,
                message: this.service.decryptText(data.message),
                sentby: data.sentby,
                sendername: data.sendername,
                fileextension: data.fileextension,
                photourl: data.photourl,
                timestamp: data.timestamp,
                replydisplayname: data.replydisplayname,
                filetype: data.filetype,
                tagmessage: this.service.decryptText(data.tagmessage),
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
              this.allgroupmsgs.push(array12);


              if (this.unreadCount != null) {
                this.groupunreadMessageShow();
              }
              this.showDatewise();
              console.log("allgroupmsgs receive 2 : " + JSON.stringify(this.allgroupmsgs));
              this.scrollToBottomOnInit();
            }

            if ((data.sentby != this.Uid && this.groupkey == data.groupkey) && (data.experts == this.Uid || data.experts == null || data.experts == "null" || data.experts == "undefined")) {
              console.log("Receive groupmessag 31 :" + this.opengroup)

              this.GruopChatProvider.updatechatmesage(this.groupkey, data.sentby).then(res => {
                console.log("updatechatmesage :" + JSON.stringify(res))

              })
              console.log("Receive groupmessag 32 :" + this.opengroup)

              var array = {
                groupkey: data.groupkey,
                message: this.ApiserviceService.decryptText(data.message),
                sentby: data.sentby,
                sendername: data.sendername,
                fileextension: data.fileextension,
                photourl: data.photourl,
                groupimage: this.groupImage,
                timestamp: data.timestamp,
                location: data.location,
                replydisplayname: data.replydisplayname,
                filetype: data.filetype,
                tagmessage: this.ApiserviceService.decryptText(data.tagmessage),
                tagfileextension: data.tagmessage,
                tagtime: data.tagtime,
                attachtext: this.ApiserviceService.decryptText(data.attachtext),
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
                this.groupunreadMessageShow();
              }
              this.scrollToBottomOnInit();

              console.log("allgroupmsgs receive : " + JSON.stringify(this.allgroupmsgs));
            }
          }
          else if (data.channel != "web" && data.sentby == this.Uid && this.groupkey == data.groupkey) {

            var array122 = {
              groupkey: data.groupkey,
              message: this.service.decryptText(data.message),
              sentby: data.sentby,
              sendername: data.sendername,
              fileextension: data.fileextension,
              photourl: data.photourl,
              timestamp: data.timestamp,
              replydisplayname: data.replydisplayname,
              filetype: data.filetype,
              tagmessage: this.service.decryptText(data.tagmessage),
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
            this.allgroupmsgs.push(array122);

            if (this.unreadCount != null) {
              this.groupunreadMessageShow();
            }
            this.showDatewise();
            console.log("allgroupmsgs receive 2 : " + JSON.stringify(this.allgroupmsgs));
            this.scrollToBottomOnInit();
          }
          else if (data.sentby != this.Uid && this.groupkey == data.groupkey) {
            console.log("Receive groupmessag 4   :" + data.message)
            console.log("Receive groupmessag 5   :" + this.ApiserviceService.decryptText(data.message))
            var gattachtext = null;
            if (data.attachtext != null) {
              gattachtext = this.ApiserviceService.decryptText(data.attachtext)
            }
            var array1 = {
              groupkey: data.groupkey,
              message: this.ApiserviceService.decryptText(data.message),
              sentby: data.sentby,
              sendername: data.sendername,
              fileextension: data.fileextension,
              photourl: data.photourl,
              timestamp: data.timestamp,
              replydisplayname: data.replydisplayname,
              filetype: data.filetype,
              tagmessage: this.ApiserviceService.decryptText(data.tagmessage),
              tagfileextension: data.tagfileextension,
              tagtime: data.tagtime,
              Tagsend: data.Tagsend,
              Tagto: data.Tagto,
              attachtext: gattachtext,
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
            this.allgroupmsgs.push(array1);

            this.audioWeb = new Audio();
            this.audioWeb.src = 'assets/mp3/receive.wav';
            this.audioWeb.load();
            this.audioWeb.play();


            if (this.unreadCount != null) {
              this.groupunreadMessageShow();
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
        }
        if (msg.groupkey == this.groupkey && msg.removeUser == localStorage.getItem('LinkususerID')) {
          this.isRemoved = true;
          if (this.pageAlive == true) {
            this.RemoveToast(msg.removeBy)
            //deleteRecentDb

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
      this.BuddyTyping = false;
      // sender:this.Uid,
      // groupkey:this.groupkey,
      // typing:true

      // sender:this.Uid,
      //   groupkey:this.groupkey,
      //   senderName:localStorage.getItem('username'),
      //   typing:true
      if (this.activeGroup == true && this.isRemoved == false) {

        console.log(" this.groupkey :L" + this.groupkey + ":" + msg.groupkey)
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
  getUsersListgroup(event) {

    if (this.scrollDepthTriggered) {
      return;
    }
    var elmnt = document.getElementById("messagesContent");
    var x = elmnt.scrollLeft;
    var y = elmnt.scrollTop;

    console.log("getUsersListgroup :" + y);

    if (y == 0 && this.searchinput == false) {
      // this.getUsersList();
      this.scrollValue = parseInt(this.scrollValue) + 70;
      console.log("getUsersListgroup :" + this.scrollValue)

      this.getgroupchat1(this.scrollValue);
    }

    // setTimeout(() => {
    //   event.target.complete();
    //   console.log("doRefresh")
    //   this.scrollValue = parseInt(this.scrollValue) + 70;
    //   console.log("getUsersListgroup :" + this.scrollValue)

    //   this.getgroupchat(this.scrollValue);


    // });

  }
  getgroupchat1(scrollValue) {
    // this.presentLoadingWithOptions();
    console.log("calling getgroupchat");

    this.groupname = this.GruopProvider.group['groupname'];
    this.groupkey = this.GruopProvider.group['groupkey'];
    this.groupImage = this.GruopProvider.group['groupimage'];
    this.groupcreated = this.GruopProvider.group['groupcreated'];
    // this.opengroup = this.GruopProvider.group['opengroup'];

    if (this.GruopProvider.group['opengroup'] != "undefined" && this.GruopProvider.group['opengroup'] != undefined) {
      this.opengroup = this.GruopProvider.group['opengroup'];
    } else {
      this.opengroup = false
    }

    this.Uid = localStorage.getItem('LinkususerID')

    this.alignuid = localStorage.getItem('LinkususerID')
    this.sendername = localStorage.getItem('username')
    this.experts = localStorage.getItem('experts');
    console.log("this.experts :" + this.experts)

    this.GruopChatProvider.data = [];
    this.groupclearunreadmessage();

    console.log("calling getchat 2");

    if (this.networkProvider.CurrentStatus == true) {
      this.allgroupmsgs = [];

      this.GruopChatProvider.getGroupMessage(this.groupkey, this.groupname, scrollValue).then((data: any) => {
        this.loadingdismiss();
        console.log("group changed load :" + JSON.stringify(data))
        this.allgroupmsgs = [];

        this.unreadCount = 0;
        var startgetdate1 = new Date(parseInt(this.myJoinedTimeStamp))


        var checkvalaue = 0;
        data.forEach(element => {
          console.log("element.message :" +startgetdate1+":"+ this.service.decryptText(element.message)+":"+element.timestamp)
          if (element.sentby != this.Uid) {
            this.GruopChatProvider.updatechatmesage(this.groupkey, element.sentby).then(res => {
              console.log("status_change :" + JSON.stringify(res))
              this.loadingdismiss();

            }).catch(err => {
              this.loadingdismiss();

            })
          }
          if (element.sentby != this.Uid && element.status == "1") {
            this.unreadCount++;
          }
          console.log("this.unreadCount 1111111:" + this.unreadCount)


          console.log("opengroup checkig :" + this.opengroup)
          if (this.opengroup == true) {
            console.log("opengroup 1  :" + element.experts + ":" + this.Uid)
            if (element.experts == this.Uid || element.sentby == this.Uid || element.experts == "null" || element.experts == "undefined") {
              console.log("opengroup 12 :" + element.experts + ":" + this.Uid)

              if (element.deleteby != localStorage.getItem('LinkususerID')) {


                var array = {
                  groupkey: element.groupkey,
                  message: this.service.decryptText(element.message),
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
                  tagmessage: this.service.decryptText(element.tagmessage),
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
                  showMore: false,
                  edited: element.edited
                }
                if (this.myGroupTimestamp != null) {
                  var getdate1 = new Date(parseInt(this.myGroupTimestamp))
                  var getdata = new Date(parseInt(element.timestamp))
                  console.log("myGroupTimestamp :" + getdate1 + ":" + getdata)

                  console.log("starttimestamp 0 :" + getdate1 + ":" + getdata + ":" + startgetdate1)

                  if (getdata  >= startgetdate1 && getdata <= getdate1) {

                    if (this.cleartimestamp != null) {
                      var getdate1 = new Date(parseInt(this.cleartimestamp))
                      var getdata = new Date(parseInt(element.timestamp))
                      // console.log("this.cleartimestamp 2 :" + getdate1 + ":" + getdata)
                      if (getdata >= getdate1) {

                   
                        this.allgroupmsgs.push(array)
                       
                        this.allgroupmsgs.sort(function (a, b) {
                          var c = new Date(parseInt(a.timestamp));
                          var d = new Date(parseInt(b.timestamp));
                          return c > d ? 1 : -1;
                        });
                      }
                    }
                    else {
                     
                      this.allgroupmsgs.push(array)
                      

                      this.allgroupmsgs.sort(function (a, b) {
                        var c = new Date(parseInt(a.timestamp));
                        var d = new Date(parseInt(b.timestamp));
                        return c > d ? 1 : -1;
                      });
                    }

                  }
                }
                else {
                  if (this.cleartimestamp != null) {
                    console.log("starttimestamp 1 :" + getdate1 + ":" + getdata + ":" + startgetdate1)

                    var getdate1 = new Date(parseInt(this.cleartimestamp))
                    var getdata = new Date(parseInt(element.timestamp))
                    console.log("cleartimestamp 3 :" + getdate1 + ":" + getdata)
                    if (getdata  >= startgetdate1 && getdata >= getdate1) {
                      this.allgroupmsgs.push(array)
                    

                      this.allgroupmsgs.sort(function (a, b) {
                        var c = new Date(parseInt(a.timestamp));
                        var d = new Date(parseInt(b.timestamp));
                        return c > d ? 1 : -1;
                      });
                     

                    }
                  }
                  else {
                    var getdata = new Date(parseInt(element.timestamp))
                    if (getdata  >= startgetdate1) {
                      this.allgroupmsgs.push(array)
                    }
                   

                    this.allgroupmsgs.sort(function (a, b) {
                      var c = new Date(parseInt(a.timestamp));
                      var d = new Date(parseInt(b.timestamp));
                      return c > d ? 1 : -1;
                    });
                  }
                  
                }

              }
            }
          }
          else {
            console.log("else opengroup 1" + element.deleteby + ":" + localStorage.getItem('LinkususerID') + ":" + element.deleteflag + ":" + this.service.decryptText(element.message))
            if (element.deleteby != localStorage.getItem('LinkususerID')) {

              var array1 = {
                groupkey: element.groupkey,
                message: this.service.decryptText(element.message),
                groupname: this.groupname,
                sentby: element.sentby,
                sendername: element.sendername,
                photourl: element.photourl,
                groupimage: this.groupImage,
                timestamp: element.timestamp,
                replydisplayname: element.replydisplayname,
                filetype: element.filetype,
                fileextension: element.fileextension,
                tagmessage: this.service.decryptText(element.tagmessage),
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
                showMore: false,
                edited: element.edited
              }
              // this.allgroupmsgs.push(array1)


              if (this.myGroupTimestamp != null) {
                var getdate1 = new Date(parseInt(this.myGroupTimestamp))
                var getdata = new Date(parseInt(element.timestamp))
                console.log("myGroupTimestamp :" + getdate1 + ":" + getdata)
                console.log("starttimestamp 2 :" + getdate1 + ":" + getdata + ":" + startgetdate1)


                if (getdata  >= startgetdate1 && getdata <= getdate1) {
                  // this.allgroupmsgs.push(array1)
                  if (this.cleartimestamp != null) {
                    var getdate1 = new Date(parseInt(this.cleartimestamp))
                    var getdata = new Date(parseInt(element.timestamp))
                    console.log("cleartimestamp 3 :" + getdate1 + ":" + getdata)
                    if (getdata >= getdate1) {
                      this.allgroupmsgs.push(array1)
                     
                      this.allgroupmsgs.sort(function (a, b) {
                        var c = new Date(parseInt(a.timestamp));
                        var d = new Date(parseInt(b.timestamp));
                        return c > d ? 1 : -1;
                      });

                      
                    }
                  }
                  else {
                    var getdata = new Date(parseInt(element.timestamp))
                    console.log("starttimestamp 3 :" + getdate1 + ":" + getdata + ":" + startgetdate1)
                    var getdata = new Date(parseInt(element.timestamp))
  
                    if (getdata  >= startgetdate1) {
                      this.allgroupmsgs.push(array1)
                    }
                   

                    this.allgroupmsgs.sort(function (a, b) {
                      var c = new Date(parseInt(a.timestamp));
                      var d = new Date(parseInt(b.timestamp));
                      return c > d ? 1 : -1;
                    });

                   
                  }

                }
              }
              else {
                if (this.cleartimestamp != null) {
                  var getdate1 = new Date(parseInt(this.cleartimestamp))
                  var getdata = new Date(parseInt(element.timestamp))
                  console.log("starttimestamp 3 :" + getdate1 + ":" + getdata + ":" + startgetdate1)
                  if (getdata  >= startgetdate1 && getdata >= getdate1) {
                    this.allgroupmsgs.push(array1)
                    this.allgroupmsgs.sort(function (a, b) {
                      var c = new Date(parseInt(a.timestamp));
                      var d = new Date(parseInt(b.timestamp));
                      return c > d ? 1 : -1;
                    });
                    
                  }
                }
                else {
                  var getdata = new Date(parseInt(element.timestamp))
                  console.log("starttimestamp 3 :" + getdate1 + ":" + getdata + ":" + startgetdate1)
                  var getdata = new Date(parseInt(element.timestamp))

                  if (getdata  >= startgetdate1) {
                    this.allgroupmsgs.push(array1)
                  }
                 
                  this.allgroupmsgs.sort(function (a, b) {
                    var c = new Date(parseInt(a.timestamp));
                    var d = new Date(parseInt(b.timestamp));
                    return c > d ? 1 : -1;
                  });
                 
                }

                // if (this.platform.is('android')) {
                //   this.GroupDatabaseProvider.createGroupdb().then(res => {
                //     this.GroupDatabaseProvider.insertGroupchat(array, 1).then(res => {
                //     })
                //   })
                // }
              }
            }

          }
        });
        console.log("this.allgroupmsgs :" + this.allgroupmsgs.length)
        this.temparray = data;

        this.groupunreadMessageShow();
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



        this.loadingdismiss();



      }).catch(err => {
        console.log(err);
        this.loadingdismiss();
        setTimeout(() => {
          this.textarea2.nativeElement.focus();
        }, 1000);
      })
    }


    // })
  }

  guid() {
    function s4() {
      return Math.floor(Math.random() * Math.floor(10002));
    }
    return s4();
  }





  forwardSelectiongroup(selectedValue, item) {



    if (selectedValue == true) {
      this.contactsselect.push(item);


    }
    else {
      this.contactsselect.splice(item, 1);

    }


    console.log("forwardSelection :" + selectedValue + ":" + JSON.stringify(this.contactsselect))
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


        this.deleteFlag1 = false;
        this.deleteFlag = false;
      }
      else {
        this.forwardFlag = false;

        this.statusreadarray = [];
        this.contactsselect.forEach(val => {

          if (val.status == '2') {

            if (val.selected == true) {
              this.statusreadarray.push(item)
            }
            else {
              this.statusreadarray.splice(item, 1)
            }
          }


        });


        if (this.statusreadarray.length == 0) {

          this.deleteFlag = true;
          this.deleteFlag1 = false;
        }
        else {

          this.deleteFlag1 = true;
          this.deleteFlag = false;
        }

      }
    }
    else {
      if (this.forwardClick == true) {
        this.forwardFlag = false;
      }
      else {
        this.deleteFlag = false;
        this.deleteFlag1 = false;
      }
      this.forwardClick = false;
    }

  }



  groupEvent(item, i) {


    console.log("Event:" + JSON.stringify(item))

    let actionSheet = this.actionSheet.create({
      header: 'My Options',
      buttons: [
        // {
        //   text: 'Copy',
        //   icon: 'copy-outline',
        //   handler: () => {
        //     console.log("item.message :" + item.message)
        //     var textArea = <HTMLInputElement>document.getElementById('newmessage');
        //     $("#newmessage").val(item.message)

        //     // var textArea = document.createElement("newmessage");
        //     // textArea.value = item.message;
        //     // document.body.appendChild($("#newmessage").val());
        //     textArea.select();
        //     document.execCommand("Copy");
        //     // this.newMsgBtn-
        //     // textArea.remove();
        //   }
        // },
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
            item.selectedColor = "transparent";
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
            // this.textarea2.nativeElement.focus();
            setTimeout(() => {
              if (this.textarea2 != undefined) {
                this.textarea2.nativeElement.focus();
              }
            }, 1000);
          }
        },
        {
          text: 'Forward',
          icon: 'return-up-forward-outline',
          handler: () => {
            item.selectedColor = "transparent";
            this.forwardClick = true;
            this.deleteFlag = false;
            this.deleteFlag1 = false;
            item.selected = true;
            this.forwardSelectiongroup(item.selected, item)

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
            item.selectedColor = "transparent";
            this.forwardFlag = false;
            this.deleteFlag = true;
            this.forwardClick = false;
            item.selected = true;
            this.forwardSelectiongroup(item.selected, item)

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
            item.selectedColor = "transparent";
            this.groupassigntask(item, i);
          }
        },
        {
          text: 'Filter Reply Message',
          icon: 'filter-outline',
          handler: () => {
            item.selectedColor = "transparent";
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

            item.selectedColor = "transparent";
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
    this.stopInterval();
  }



  async groupdeleteFunction1() {
    // this.presentLoadingWithOptions();

    const statusalert = await this.alertController.create({
      header: 'Delete Message?',
      buttons: [
        {
          text: "Delete For me",
          cssClass: "deletebtn",
          handler: () => {
            var lengthpositionValue = null;
            var deleteArray = [];


            for (var i = 0; i < this.allgroupmsgs.length; i++) {

              console.log("this.allgroupmsgs[i].selected  :" + this.allgroupmsgs[i].selected)
              if (this.allgroupmsgs[i].selected == true) {
                console.log("positon:" + this.allgroupmsgs.length + ":" + i + ":" + (this.allgroupmsgs.length - 1))
                deleteArray.push(this.allgroupmsgs[i])
                if ((this.allgroupmsgs.length - 1) == i) {
                  lengthpositionValue = this.allgroupmsgs[(i - 1)].message
                }
              }
            }
            this.allgroupmsgs = this.removeItemAll(this.allgroupmsgs)
            console.log("lengthpositionValue 1:" + this.allgroupmsgs + ":" + this.allgroupmsgs.length)

            if (lengthpositionValue != null) {
              var getLastIndex = this.allgroupmsgs.length;
              console.log("lengthpositionValue 2:" + JSON.stringify(this.allgroupmsgs))

              lengthpositionValue = this.allgroupmsgs[(getLastIndex - 1)]

              // var obj = JSON.stringify(lengthpositionValue)
              console.log("lengthpositionValue 13:" + ":" + JSON.stringify(lengthpositionValue))
              console.log("lengthpositionValue.sentby:" + ":" + lengthpositionValue.sentby)
              var sendarray = {
                "sender": lengthpositionValue.sentby,
                "uid": localStorage.getItem('LinkususerID'),
                "sentby": lengthpositionValue.sentby,
                "buddyImage": "default",
                "username": localStorage.getItem('username'),
                "Filedate": lengthpositionValue.timestamp,
                "messagecount": 0,
                "fileType": lengthpositionValue.filetype,
                "filetype": lengthpositionValue.filetype,
                "groupkey": lengthpositionValue.groupkey,
                "groupname": lengthpositionValue.groupname,
                "message": this.ApiserviceService.encryptText(lengthpositionValue.message),
                "opengroup": this.opengroup,
                "timestamp": lengthpositionValue.timestamp,
                "groupsendername": localStorage.getItem('username'),
                "experts": this.experts
              }


              console.log("lengthpositionValue 131234:" + JSON.stringify(sendarray))

              this.GruopChatProvider.createMyRecentMessage(sendarray);

            }
            console.log("deleteArray :" + deleteArray.length)
            this.GruopChatProvider.deleteMessage(deleteArray).then(res => {
              // this.forwardClick = false;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
              this.loadingdismiss();
              this.getgroupchat(this.scrollValue)
            }).catch(erre => {
              this.loadingdismiss();
              this.getgroupchat(this.scrollValue)
            })
          }
        },
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "deletebtn",
          handler: () => {
            //something to do 



          }
        },

      ]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
  }

  async groupdeleteFunction() {
    // this.presentLoadingWithOptions();

    const statusalert = await this.alertController.create({
      header: 'Delete Message?',
      buttons: [
        {
          text: "Delete For me",
          cssClass: "deletebtn",
          handler: () => {
            var deleteArray = [];
            var lengthpositionValue = null;
            // this.allgroupmsgs.forEach(element => {
            //   if (element.selected == true) {
            //     deleteArray.push(element)
            //   }
            // });
            for (var i = 0; i < this.allgroupmsgs.length; i++) {

              console.log("this.allgroupmsgs[i].selected  :" + this.allgroupmsgs[i].selected)
              if (this.allgroupmsgs[i].selected == true) {
                console.log("positon:" + this.allgroupmsgs.length + ":" + i + ":" + (this.allgroupmsgs.length - 1))
                deleteArray.push(this.allgroupmsgs[i])
                if ((this.allgroupmsgs.length - 1) == i) {
                  lengthpositionValue = this.allgroupmsgs[(i - 1)].message
                }
              }
            }
            this.allgroupmsgs = this.removeItemAll(this.allgroupmsgs)
            console.log("lengthpositionValue 1:" + this.allgroupmsgs + ":" + this.allgroupmsgs.length)

            if (lengthpositionValue != null) {
              var getLastIndex = this.allgroupmsgs.length;
              console.log("lengthpositionValue 2:" + getLastIndex)

              lengthpositionValue = this.allgroupmsgs[(getLastIndex - 1)]

              lengthpositionValue = this.allgroupmsgs[(getLastIndex - 1)]
              // var obj = JSON.stringify(lengthpositionValue)
              console.log("lengthpositionValue 13:" + ":" + JSON.stringify(lengthpositionValue))
              var sendarray = {
                "sender": lengthpositionValue.sentby,
                "uid": localStorage.getItem('LinkususerID'),
                "sentby": lengthpositionValue.sentby,
                "buddyImage": "default",
                "username": localStorage.getItem('username'),
                "Filedate": lengthpositionValue.timestamp,
                "messagecount": 0,
                "fileType": lengthpositionValue.filetype,
                "filetype": lengthpositionValue.filetype,
                "groupkey": lengthpositionValue.groupkey,
                "groupname": lengthpositionValue.groupname,
                "message": this.ApiserviceService.encryptText(lengthpositionValue.message),
                "opengroup": this.opengroup,
                "timestamp": lengthpositionValue.timestamp,
                "groupsendername": localStorage.getItem('username'),
                "experts": this.experts
              }


              console.log("lengthpositionValue 131234:" + JSON.stringify(sendarray))

              this.GruopChatProvider.createRecentMessage(sendarray);

            }
            console.log("deleteArray 1111111111:" + deleteArray.length)
            this.GruopChatProvider.deleteMessage(deleteArray).then(res => {
              // this.forwardClick = false;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
              this.loadingdismiss();
              // this.getgroupchat(this.scrollValue)
            }).catch(erre => {
              this.loadingdismiss();
              //this.getgroupchat(this.scrollValue)
            })
          }
        },
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "deletebtn",
          handler: () => {
            //something to do 



          }
        },
        {
          text: "Delete For Everyone",
          cssClass: "deletebtn",
          // cssClass: "confirmbtn",
          handler: () => {
            var deleteArray = [];
            // this.allgroupmsgs.forEach(element => {
            //   if (element.selected == true) {
            //     deleteArray.push(element)
            //   }
            // });

            var lengthpositionValue = null;
            for (var i = 0; i < this.allgroupmsgs.length; i++) {

              console.log("this.allgroupmsgs[i].selected  :" + this.allgroupmsgs[i].selected)
              if (this.allgroupmsgs[i].selected == true) {
                console.log("positon:" + this.allgroupmsgs.length + ":" + i + ":" + (this.allgroupmsgs.length - 1))
                deleteArray.push(this.allgroupmsgs[i])
                if ((this.allgroupmsgs.length - 1) == i) {
                  lengthpositionValue = this.allgroupmsgs[(i - 1)].message
                }
              }
            }
            this.allgroupmsgs = this.removeItemAll(this.allgroupmsgs)
            console.log("lengthpositionValue 1:" + this.allgroupmsgs + ":" + this.allgroupmsgs.length)

            if (lengthpositionValue != null) {
              var getLastIndex = this.allgroupmsgs.length;
              console.log("lengthpositionValue 2:" + getLastIndex)

              lengthpositionValue = this.allgroupmsgs[(getLastIndex - 1)]

              lengthpositionValue = this.allgroupmsgs[(getLastIndex - 1)]
              // var obj = JSON.stringify(lengthpositionValue)
              console.log("lengthpositionValue 13:" + ":" + JSON.stringify(lengthpositionValue))
              var sendarray = {
                "sender": lengthpositionValue.sentby,
                "uid": localStorage.getItem('LinkususerID'),
                "sentby": lengthpositionValue.sentby,
                "buddyImage": "default",
                "username": localStorage.getItem('username'),
                "Filedate": lengthpositionValue.timestamp,
                "messagecount": 0,
                "fileType": lengthpositionValue.filetype,
                "filetype": lengthpositionValue.filetype,
                "groupkey": lengthpositionValue.groupkey,
                "groupname": lengthpositionValue.groupname,
                "message": this.ApiserviceService.encryptText(lengthpositionValue.message),
                "opengroup": this.opengroup,
                "timestamp": lengthpositionValue.timestamp,
                "groupsendername": localStorage.getItem('username'),
                "experts": this.experts
              }


              console.log("lengthpositionValue 131234:" + JSON.stringify(sendarray))

              this.GruopChatProvider.createRecentMessage(sendarray);

            }
            console.log("deleteArray :" + deleteArray.length)
            this.GruopChatProvider.deleteAllMessage(deleteArray).then(res => {
              // this.forwardClick = false;
              this.deleteFlag = false;
              this.deleteFlag1 = false;
              this.loadingdismiss();
              //this.getgroupchat(this.scrollValue)
            }).catch(erre => {
              this.loadingdismiss();
              //this.getgroupchat(this.scrollValue)
            })
          }
        }
      ]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
  }
  async groupforward() {
    var deleteArray = [];
    this.allgroupmsgs.forEach(element => {
      if (element.selected == true) {
        deleteArray.push(element)
      }
    });
    console.log("deleteArray :" + deleteArray.length)

    this.deleteFlag = false;
    this.deleteFlag1 = false;
    this.forwardFlag = false;
    this.forwardClick = false;
    var obj = {

      // "buddyInfo": this.buddydetails
    }
    const modal = await this.modalController.create({
      component: GroupcreationPage,
      componentProps: {
        forward: deleteArray,
        chatinfo: this.buddy,
        flag: "group"
      }

    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      this.getgroupchat(this.scrollValue);

    });

  }
  async groupassigntask(msg, i) {
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
      this.getgroupchat(this.scrollValue);
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

  groupclearunreadmessage() {


    var data = {
      uid: this.Uid,
      groupkey: this.groupkey,
    }
    this.service.PostRequest(this.service.mainAPI + '/updateGroupUnreadtcount', data).then(res => {

      this.loadingdismiss();
      this.dataLoad();

    }).catch(erre => {
      this.loadingdismiss();

      this.dataLoad();

    });
  }


  getgroupchat(scrollValue) {
    this.presentLoadingWithOptions();
    console.log("calling getgroupchat");

    this.groupname = this.GruopProvider.group['groupname'];
    this.groupkey = this.GruopProvider.group['groupkey'];
    this.groupImage = this.GruopProvider.group['groupimage'];
    this.groupcreated = this.GruopProvider.group['groupcreated'];
    // this.opengroup = this.GruopProvider.group['opengroup'];

    if (this.GruopProvider.group['opengroup'] != "undefined" && this.GruopProvider.group['opengroup'] != undefined) {
      this.opengroup = this.GruopProvider.group['opengroup'];
    } else {
      this.opengroup = false
    }

    this.Uid = localStorage.getItem('LinkususerID')

    this.alignuid = localStorage.getItem('LinkususerID')
    this.sendername = localStorage.getItem('username')
    this.experts = localStorage.getItem('experts');
    console.log("this.experts :" + this.experts)

    this.GruopChatProvider.data = [];
    this.groupclearunreadmessage();

    console.log("calling getchat 2");

    if (this.networkProvider.CurrentStatus == true) {
      this.allgroupmsgs = [];

      this.GruopChatProvider.getGroupMessage(this.groupkey, this.groupname, scrollValue).then((data: any) => {
        this.loadingdismiss();
        console.log("group changed load :" + JSON.stringify(data))
        this.allgroupmsgs = [];

        this.unreadCount = 0;


        var checkvalaue = 0;
        data.forEach(element => {

          if (element.sentby != this.Uid && checkvalaue == 0) {
            checkvalaue = 1;
            this.GruopChatProvider.updatechatmesage(this.groupkey, element.sentby).then(res => {
              console.log("updatechatmesage :" + JSON.stringify(res))
              this.loadingdismiss();
            }).catch(err => {
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
              //   console.log("chat message message:" + this.ApiserviceService.decryptText(element.message))
              if (element.deleteby != localStorage.getItem('LinkususerID')) {

                var array = {
                  groupkey: element.groupkey,
                  message: this.ApiserviceService.decryptText(element.message),
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
                  tagmessage: this.ApiserviceService.decryptText(element.tagmessage),
                  attachtext: this.ApiserviceService.decryptText(element.attachtext),
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

                console.log("myGroupTimestamp " + this.myGroupTimestamp)
                if (this.myGroupTimestamp != null) {
                  var getdate1 = new Date(parseInt(this.myGroupTimestamp))
                  var getdata = new Date(parseInt(element.timestamp))
                  console.log("myGroupTimestamp :" + getdate1 + ":" + getdata)


                  if (getdata <= getdate1) {
                    if (this.cleartimestamp != null) {
                      var getdate1 = new Date(parseInt(this.cleartimestamp))
                      var getdata = new Date(parseInt(element.timestamp))
                      console.log("this.cleartimestamp 2 :" + getdate1 + ":" + getdata)
                      if (getdata >= getdate1) {
                        this.allgroupmsgs.push(array)
                        this.allgroupmsgs.sort(function (a, b) {
                          var c = new Date(parseInt(a.timestamp));
                          var d = new Date(parseInt(b.timestamp));
                          return c > d ? 1 : -1;
                        });
                      }
                    }
                    else {
                      this.allgroupmsgs.push(array)
                      this.allgroupmsgs.sort(function (a, b) {
                        var c = new Date(parseInt(a.timestamp));
                        var d = new Date(parseInt(b.timestamp));
                        return c > d ? 1 : -1;
                      });
                    }
                  }
                }
                else {
                  if (this.cleartimestamp != null) {
                    var getdate1 = new Date(parseInt(this.cleartimestamp))
                    var getdata = new Date(parseInt(element.timestamp))
                    console.log("this.cleartimestamp 2 :" + getdate1 + ":" + getdata)
                    if (getdata >= getdate1) {
                      this.allgroupmsgs.push(array)
                      this.allgroupmsgs.sort(function (a, b) {
                        var c = new Date(parseInt(a.timestamp));
                        var d = new Date(parseInt(b.timestamp));
                        return c > d ? 1 : -1;
                      });
                    }
                  }
                  else {
                    this.allgroupmsgs.push(array)
                    this.allgroupmsgs.sort(function (a, b) {
                      var c = new Date(parseInt(a.timestamp));
                      var d = new Date(parseInt(b.timestamp));
                      return c > d ? 1 : -1;
                    });
                  }

                }
                this.allgroupmsgs.sort(function (a, b) {
                  var c = new Date(parseInt(a.timestamp));
                  var d = new Date(parseInt(b.timestamp));
                  return c > d ? 1 : -1;
                });
              }
              // this.textarea2.nativeElement.focus();
              setTimeout(() => {
                if (this.textarea2 != undefined) {

                  this.textarea2.nativeElement.focus();
                }
              }, 1000);



            }
          }
          else {
            console.log("else opengroup 1")
            console.log("chat message message11:" + element.deleteby + ":" + localStorage.getItem('LinkususerID') + ":" + element.attachtext)
            if (element.deleteby != localStorage.getItem('LinkususerID')) {

              var array1 = {
                groupkey: element.groupkey,
                message: this.ApiserviceService.decryptText(element.message),
                groupname: this.groupname,
                sentby: element.sentby,
                sendername: element.sendername,
                photourl: element.photourl,
                groupimage: this.groupImage,
                timestamp: element.timestamp,
                replydisplayname: element.replydisplayname,
                filetype: element.filetype,
                fileextension: element.fileextension,
                tagmessage: this.ApiserviceService.decryptText(element.tagmessage),
                tagfileextension: element.tagfileextension,
                tagtime: element.tagtime,
                Tagsend: element.Tagsend,
                Tagto: element.Tagto,
                attachtext: this.ApiserviceService.decryptText(element.attachtext),
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

              console.log("myGroupTimestamp " + this.myGroupTimestamp)
              if (this.myGroupTimestamp != null) {
                var getdate1 = new Date(parseInt(this.myGroupTimestamp))
                var getdata = new Date(parseInt(element.timestamp))
                console.log("myGroupTimestamp :" + getdate1 + ":" + getdata)


                if (getdata <= getdate1) {
                  if (this.cleartimestamp != null) {
                    var getdate1 = new Date(parseInt(this.cleartimestamp))
                    var getdata = new Date(parseInt(element.timestamp))
                    console.log("this.cleartimestamp 2 :" + getdate1 + ":" + getdata)
                    if (getdata >= getdate1) {
                      this.allgroupmsgs.push(array1)
                      this.allgroupmsgs.sort(function (a, b) {
                        var c = new Date(parseInt(a.timestamp));
                        var d = new Date(parseInt(b.timestamp));
                        return c > d ? 1 : -1;
                      });
                    }
                  }
                  else {
                    this.allgroupmsgs.push(array1)
                    this.allgroupmsgs.sort(function (a, b) {
                      var c = new Date(parseInt(a.timestamp));
                      var d = new Date(parseInt(b.timestamp));
                      return c > d ? 1 : -1;
                    });
                  }
                }
              }
              else {
                if (this.cleartimestamp != null) {
                  var getdate1 = new Date(parseInt(this.cleartimestamp))
                  var getdata = new Date(parseInt(element.timestamp))
                  console.log("this.cleartimestamp 2 :" + getdate1 + ":" + getdata)
                  if (getdata >= getdate1) {
                    this.allgroupmsgs.push(array1)
                    this.allgroupmsgs.sort(function (a, b) {
                      var c = new Date(parseInt(a.timestamp));
                      var d = new Date(parseInt(b.timestamp));
                      return c > d ? 1 : -1;
                    });
                  }
                }
                else {
                  this.allgroupmsgs.push(array1)
                  this.allgroupmsgs.sort(function (a, b) {
                    var c = new Date(parseInt(a.timestamp));
                    var d = new Date(parseInt(b.timestamp));
                    return c > d ? 1 : -1;
                  });
                }

              }
              this.allgroupmsgs.sort(function (a, b) {
                var c = new Date(parseInt(a.timestamp));
                var d = new Date(parseInt(b.timestamp));
                return c > d ? 1 : -1;
              });
            }
            // this.textarea2.nativeElement.focus();
            setTimeout(() => {
              if (this.textarea2 != undefined) {

                this.textarea2.nativeElement.focus();
              }
            }, 1000);


          }
        });
        console.log("this.allgroupmsgs :" + this.allgroupmsgs.length)
        this.temparray = data;

        this.groupunreadMessageShow();
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



        this.loadingdismiss();



      }).catch(err => {
        console.log(err);
        this.loadingdismiss();
        setTimeout(() => {
          this.textarea2.nativeElement.focus();
        }, 1000);
      })
    }


    // })
  }
  groupunreadMessageShow() {
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

      if (value.sentby != this.Uid && value.status == "1") {
        value.status = "2"

        this.socket.emit('status_change', value);
      }

    });


  }
  //socket emit servbice

  groupsend(msg) {

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

  groupMappopover(latitude) {
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


    this.showpopSingle = false


  }
  async groupZoomFile(file) {
    const model = await this.modalController.create({
      component: ZoomPage,
      cssClass: 'fullscreenmodal',
      componentProps: {
        src: file,
        images: this.allgroupmsgs,
      }
    });

    model.present();
    model.onWillDismiss().then(data => {

    });
  }

  groupopenLocation(val) {

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
  groupclosePopover() {
    this.showpopGroup1 = false

    if (this.mapshowpop == 'true') {
      this.mapshowpop = 'false'
    }
  }

  async groupcopyPopover(ev: any, index) {

    const popover = await this.popoverController.create({
      component: CopyTextComponent,
      cssClass: "recentpop_over",

      event: ev,
      translucent: true
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      if (data["data"].buddyinfo == "1") {

        this.copytext(index);
      }


    });
    this.copytext(index);


  }

  copytext(index) {
    var getid = 'groupchat' + index;

    var copyText = document.getElementById(getid);
    var textArea = document.createElement("textarea");
    textArea.value = this.removeTags(copyText.textContent);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
    /* Alert the copied text */
    // alert("Copied the text: " + copyText.textContent);
  }

  async singlechatcopyPopover(ev: any, index) {
    this.replyId = 'singlechat' + index;

    const popover = await this.popoverController.create({
      component: CopyTextComponent,
      cssClass: "recentpop_over",
      event: ev,
      translucent: true
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      if (data["data"].buddyinfo == "1") {

        // this.singlecopytext();
      }


    });
    this.singlecopytext();


  }

  singlecopytext() {

    var copyText = document.getElementById(this.replyId);
    var textArea = document.createElement("textarea");
    textArea.value = this.removeTags(copyText.textContent);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();

  }
  async mainMenupopover(ev: any, item) {

    const popover = await this.popoverController.create({
      component: MainmenuComponent,
      cssClass: "mainpopover",

      event: ev,
      translucent: true
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      if (data["data"].buddyinfo == "1") {

        this.aboutus();
      }
      else if (data["data"].buddyinfo == "2") {

        this.myprofile();
      }
      else if (data["data"].buddyinfo == "3") {

        this.opencalendar();
      }
      else if (data["data"].buddyinfo == "4") {

        this.tasks();
      }
      else if (data["data"].buddyinfo == "5") {

        this.openshelf();
      }
      else if (data["data"].buddyinfo == "6") {

        this.openmom();
      }
      else if (data["data"].buddyinfo == "7") {

        this.openBirthdays();
      }
      else if (data["data"].buddyinfo == "8") {

        this.openProjects();
      }
      else if (data["data"].buddyinfo == "9") {

        this.changepassword();
      }
      else if (data["data"].buddyinfo == "10") {

        this.logout();
      }
      else if (data["data"].buddyinfo == "11") {

        this.customize();
      }
      else if (data["data"].buddyinfo == "12") {

        this.openStarredMessage();
      }
    });


  }
  async recentPopover(ev: any, item) {

    const popover = await this.popoverController.create({
      component: DeleterecentComponent,
      cssClass: "recentpop_over",

      event: ev,
      translucent: true
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      if (data["data"].buddyinfo == "1") {

        this.recentDelete(item);
      }


    });


  }
  recentDelete(item) {
    //alert('recentDelete');
    console.log("recentDelete :" + JSON.stringify(item))

    if (item.chatType == "2" || item.chatType == 2) {
      this.GruopProvider.removeGroupRecentChat(item.uid, item.groupKey).then(res => {
        this.dataLoad();
      })

    }
    else {
      this.GruopProvider.removeSingleRecentChat(item.uid, item.buddyid).then(res => {
        this.dataLoad();
      })
    }
    console.log("item remove:" + JSON.stringify(item))
    // removeRecentChat

  }
  async grouppopover(ev: any, item) {

    this.titleStyle = '1';

    const popover = await this.popoverController.create({
      component: GroupgallerylistComponent,
      cssClass: "popover_class",
      event: ev,
      translucent: true
    });
    popover.present();


    popover.onWillDismiss().then(data => {

      if (data["data"].buddyinfo == "1") {
        this.webcameragroup();
      }
      else if (data["data"].buddyinfo == "2") {
        $('#imguploadgal').trigger('click')
      }
      else if (data["data"].buddyinfo == "3") {
        $('#imgupload1').trigger('click')
      }
      else if (data["data"].buddyinfo == "4") {

        this.groupaddMarker(); //block//unblock
      }

    });

  }


  // sent text messgae
  groupsendMessage() {
    this.unreadCount = null;
    this.addmessagehide = false;
    this.grouptxtKeyUp();
    this.allgroupmsgs.forEach(element => {
      if (element.unreadMessageCount != null) {
        element.unreadMessageCount = null;
      }
    });
    console.log("userExperts :" + this.userExperts)
    if (this.newmessage != null && this.newmessage != '' && this.newmessage.trim() != '') {

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
      var array = {
        groupname: this.groupname,
        groupkey: this.groupkey,
        message: this.ApiserviceService.encryptText(this.urlify(this.Textbold(this.newmessage.trim()))),
        sentby: this.Uid,
        sendername: this.sendername,
        photourl: this.photourl,
        groupimage: this.groupImage,
        timestamp: new Date().getTime(),
        replydisplayname: this.replydisplayname,
        filetype: "text",
        attachtext: this.ApiserviceService.encryptText(null),
        experts: this.userExperts,
        tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
        tagfileextension: this.tagfileextension,
        tagtime: this.tagtime,
        channel: "web",
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
      var array1 = {
        groupname: this.groupname,
        groupkey: this.groupkey,
        message: this.urlify(this.Textbold(this.newmessage.trim())),
        sentby: this.Uid,
        sendername: this.sendername,
        photourl: this.photourl,
        groupimage: this.groupImage,
        timestamp: new Date().getTime(),
        replydisplayname: this.replydisplayname,
        filetype: "text",
        attachtext: null,
        experts: this.userExperts,
        tagmessage: this.tagmessage,
        tagfileextension: this.tagfileextension,
        tagtime: this.tagtime,
        Tagsend: this.Tagsend,
        Tagto: this.Tagto,
        Date: new Date(),
        tagfiletype: this.filetype,
        channel: "web",
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


      this.groupsend(array)
      this.allgroupmsgs.push(array1);
      this.scrollToBottomOnInit();


      this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
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
  groupstartRecord() {
    this.newMsgBtn = false;

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then(mediaStream => {
        this.mediaRecorder = new MediaRecorder(mediaStream);

        this.mediaRecorder.start();
        this.mediaRecorder.onstop = e => {

          if (this.mediaRecordFlag == false) {
            const blob1 = new Blob(this.audio1, { type: 'audio/mp3' });

            //this.recordedAudio.src = URL.createObjectURL(blob);
            // console.log("get autio file :" + URL.createObjectURL(blob1))

            const reader = new FileReader();

            reader.onload = () => {
              // console.log("reader.result :" + reader.result);


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
                message: this.ApiserviceService.encryptText(reader.result.toString()),
                sentby: this.Uid,
                sendername: this.sendername,
                photourl: this.photourl,
                groupimage: this.groupImage,
                timestamp: new Date().getTime(),
                replydisplayname: this.replydisplayname,
                filetype: "mp3",
                attachtext: this.ApiserviceService.encryptText(null),
                experts: this.userExperts,
                tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
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
                channel: "web",
                Taskfrom: '',
                Taskto: '',
                opengroup: this.opengroup,
                forwardmsg: null,
                selectedColor: "none",
                showMore: false

              }

              var array2 = {
                groupname: this.groupname,
                groupkey: this.groupkey,
                message: reader.result,
                sentby: this.Uid,
                sendername: this.sendername,
                photourl: this.photourl,
                groupimage: this.groupImage,
                timestamp: new Date().getTime(),
                replydisplayname: this.replydisplayname,
                filetype: "mp3",
                attachtext: null,
                experts: this.userExperts,
                tagmessage: this.tagmessage,
                tagfileextension: this.tagfileextension,
                tagtime: this.tagtime,
                Tagsend: this.Tagsend,
                Tagto: this.Tagto,
                channel: "web",
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
              this.groupsend(array1)
              this.allgroupmsgs.push(array2);
              this.scrollToBottomOnInit();


              this.GruopChatProvider.createMessage(array1, this.groupcreated, this.groupmembers).then(res => {
                console.log("seneded")
                // online data insert
                if (this.networkProvider.CurrentStatus == true) {
                  // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                }
              });

              //upload audio
              // this.uploadFirebase(reader.result, new Date());

              // stop media stream
              mediaStream.getTracks().forEach(track => track.stop());

            };
            reader.readAsDataURL(blob1);
          }
          else {
            mediaStream.getTracks().forEach(track => track.stop());
          }

        };
        this.mediaRecorder.ondataavailable = e => {
          this.audio1.push(e.data);
        };
      });


  }
  groupstopRecord() {
    this.mediaRecordFlag = false;
    this.newMsgBtn = true;
    this.mediaRecordFlag = false;
    this.newMsgBtn = true;
    this.mediaRecorder.stop();


  }
  //priya
  groupcancelRecord() {
    this.mediaRecordFlag = true;
    this.newMsgBtn = true;
    this.mediaRecordFlag = false;
    this.newMsgBtn = true;
    this.mediaRecorder.stop();



  }

  BackButtonAction() {
    console.log("BackButtonAction")
  }


  groupswitchEmojiPicker() {

    if (this.showEmojiPicker == false) {
      console.log("drag true")
      this.showEmojiPicker = true;
    }
    else {
      this.showEmojiPicker = false;
    }

    this.scrollToBottomOnInit();
  }

  async groupliveLocation(groupkey1, groupkey, sendername) {
    this.showpopGroup1 = false

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
                this.groupmobileLcoation(groupkey, groupkey, sendername)
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
            message: this.ApiserviceService.encryptText(data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"]),
            sentby: this.Uid,
            sendername: this.sendername,
            photourl: this.photourl,
            groupimage: this.groupImage,
            timestamp: new Date().getTime(),
            replydisplayname: this.replydisplayname,
            filetype: "map",
            tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            attachtext: this.ApiserviceService.encryptText(null),
            channel: "web",
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

          var array1 = {
            groupname: this.groupname,
            groupkey: this.groupkey,
            message: this.ApiserviceService.encryptText(data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"]),
            sentby: this.Uid,
            sendername: this.sendername,
            photourl: this.photourl,
            groupimage: this.groupImage,
            timestamp: new Date().getTime(),
            replydisplayname: this.replydisplayname,
            filetype: "map",
            tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            attachtext: this.ApiserviceService.encryptText(null),
            Tagto: this.Tagto,
            Date: new Date(),
            experts: null,
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            Taglocation: this.location,
            channel: "web",
            Filedate: new Date(),
            status: status,
            Taskfrom: '',
            Taskto: '',
            opengroup: this.opengroup,
            forwardmsg: null,
            selectedColor: "none",
            showMore: false


          }
          this.groupsend(array1)
          this.allgroupmsgs.push(array);
          this.scrollToBottomOnInit();


          this.GruopChatProvider.createMessage(array1, this.groupcreated, this.groupmembers).then(res => {
            console.log("seneded")
            // online data insert

          });


        }
      });

    }


  }
  grouptxtKeyUp() {
    this.groupmembersinlist = false
    console.log("txtKeyUp:" + this.newmessage)
    var obj = {
      sender: this.Uid,
      senderName: localStorage.getItem('username'),
      groupkey: this.groupkey,
      typing: false
    }
    this.socket.emit('group_user_typing', obj);
  }
  groupsearchshow() {
    this.searchinput = true;
    this.tempArrayList = [];
    this.tempArrayList = this.allgroupmsgs;
    console.log("this.tempArrayList :" + this.tempArrayList.length)

  }

  grouponCancel(event) {
    this.searchTerms = '';
    this.searchinput = false;
    this.scrollValue = 70;
    this.getgroupchat(this.scrollValue)
  }
  groupStyleChange(data) {

    console.log("StyleChange :" + data)
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
      this.groupmembersinlist = false;

      this.TempgroupMessage = ''
      this.newmessage = ''
      if (data.length == 0) {
        this.grouptxtKeyUp();

      }
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


  // camera 
  groupsendPicCamera() {

    this.showpopGroup1 = false


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
                      attachtext: null,
                      experts: null,
                      tagmessage: this.tagmessage,
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      channel: "web",
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


                    var array1 = {
                      groupname: this.groupname,
                      groupkey: this.groupkey,
                      message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                      sentby: this.Uid,
                      sendername: this.sendername,
                      photourl: this.photourl,
                      groupimage: this.groupImage,
                      timestamp: new Date().getTime(),
                      fileextension: this.createFileName(),
                      replydisplayname: this.replydisplayname,
                      filetype: "image",
                      attachtext: this.ApiserviceService.encryptText(null),
                      experts: null,
                      tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      Tagto: this.Tagto,
                      Date: new Date(),
                      channel: "web",
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
                    this.groupsend(array1)
                    this.allgroupmsgs.push(array);
                    this.scrollToBottomOnInit();
                    console.log("sendPicCamera 5");


                    console.log("sendPicCamera 6");

                    this.GruopChatProvider.createMessage(array1, this.groupcreated, this.groupmembers).then(res => {
                      console.log("sendPicCamera 7");
                      // online data insert

                    });


                  })



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

  async webcameragroup() {
    this.showpopSingle = false

    const model = await this.modalController.create({
      component: TakephotoPage,

    });

    model.present();
    model.onWillDismiss().then(data => {
      if (data != undefined) {
        console.log("onDidDismiss : " + data["data"]);
        var blobFile = this.makeblob(data["data"])
        console.log('webcamera  :' + blobFile);

        this.presentLoadingWithOptions();
        var result = JSON.stringify(data);
        var base64result = result;
        console.log("base64File :" + base64result);


        var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

        var imagename = "linkus" + imagecif + ".jpg";
        var base64result1 = base64result.split(',');


        var profilepic = "data:image/jpeg;base64," + base64result1[1];
        // console.log("atob :"+this.makeblob(profilepic))
        var file = this.makeblob(data["data"]);
        var url = this.service.mainAPI + '/uploadlinkusimage';
        const formData: any = new FormData();
        formData.append("upload", blobFile, imagename);




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
                message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                sentby: this.Uid,
                sendername: this.sendername,
                photourl: this.photourl,
                groupimage: this.groupImage,
                timestamp: new Date().getTime(),
                fileextension: this.createFileName(),
                replydisplayname: this.replydisplayname,
                attachtext: this.ApiserviceService.encryptText(null),
                filetype: "image",
                experts: null,
                tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                tagfileextension: this.tagfileextension,
                tagtime: this.tagtime,
                Tagsend: this.Tagsend,
                Tagto: this.Tagto,
                channel: "web",
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

              var array2 = {
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
                attachtext: null,
                filetype: "image",
                experts: null,
                tagmessage: this.tagmessage,
                tagfileextension: this.tagfileextension,
                tagtime: this.tagtime,
                channel: "web",
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

              this.groupsend(array)
              this.allgroupmsgs.push(array2);
              this.scrollToBottomOnInit();
              console.log("sendPicCamera 5");


              this.GruopChatProvider.createMessage(array, this.groupcreated, this.groupmembers).then(res => {
                console.log("sendPicCamera 7");
                // online data insert
                if (this.networkProvider.CurrentStatus == true) {
                  // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                }
              });


            })




      }
      console.log("onDidDismiss : " + JSON.stringify(data));

    });


  }

  async grouponUploadChange(evt: any) {
    this.showpopSingle = false
    const model = await this.modalController.create({
      component: MultipleimageuploadPage,
      componentProps: {
        Multiimage: evt.target.files
      }
    });

    model.present();

    model.onWillDismiss().then(res => {
      if (res.data != undefined) {
        console.log('onWillDismiss' + JSON.stringify(res));
        var arraydata: any;

        arraydata = res.data["images"];
        this.presentLoadingWithOptions();

        console.log('arraydata.length' + JSON.stringify(arraydata));

        for (var i = 0; i < arraydata.length; i++) {
          const getsharetext = arraydata[i].shareText

          // var profilepic = arraydata[i].image;

          const filetype = arraydata[i].webFileUploadname.substring(arraydata[i].webFileUploadname.lastIndexOf(".") + 1);
          console.log('webFileUploadname' + arraydata[i].webFileUploadname);
          console.log('image' + arraydata[i].image);
          var blobFile = this.makeblob(arraydata[i].image);
          var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

          const imagename = arraydata[i].webFileUploadname;
          this.webimagename = imagename;

          var file = this.makeblob(arraydata[i].image);
          var url = this.service.mainAPI + '/uploadlinkusimage';
          const formData: any = new FormData();
          formData.append("upload", blobFile, imagename);




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
                  fileextension: imagename,
                  replydisplayname: this.replydisplayname,
                  channel: "web",
                  filetype: filetype,
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
                  attachtext: getsharetext,
                  Filedate: new Date(),
                  status: status,
                  Taskfrom: '',
                  Taskto: '',
                  opengroup: this.opengroup,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false

                }

                var array2 = {
                  groupname: this.groupname,
                  groupkey: this.groupkey,
                  message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                  sentby: this.Uid,
                  sendername: this.sendername,
                  photourl: this.photourl,
                  groupimage: this.groupImage,
                  timestamp: new Date().getTime(),
                  fileextension: imagename,
                  replydisplayname: this.replydisplayname,
                  filetype: filetype,
                  experts: null,
                  tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  attachtext: this.ApiserviceService.encryptText(getsharetext),
                  Filedate: new Date(),
                  channel: "web",

                  status: status,
                  Taskfrom: '',
                  Taskto: '',
                  opengroup: this.opengroup,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false

                }

                this.groupsend(array2)
                this.allgroupmsgs.push(array);
                this.scrollToBottomOnInit();

                this.GruopChatProvider.createMessage(array2, this.groupcreated, this.groupmembers).then(res => {
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
      }
    });
    // Multiimage: evt.target.files

  }
  // gallery
  groupaddGallery() {
    this.presentLoadingWithOptions();
    this.showpopGroup1 = false

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
                      channel: "web",

                      fileextension: this.createFileName(),
                      replydisplayname: this.replydisplayname,
                      filetype: "image",
                      experts: null,
                      tagmessage: this.tagmessage,
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      attachtext: null,
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

                    var array2 = {
                      groupname: this.groupname,
                      groupkey: this.groupkey,
                      message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                      sentby: this.Uid,
                      sendername: this.sendername,
                      photourl: this.photourl,
                      groupimage: this.groupImage,
                      timestamp: new Date().getTime(),
                      fileextension: this.createFileName(),
                      replydisplayname: this.replydisplayname,
                      filetype: "image",
                      experts: null,
                      tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                      tagfileextension: this.tagfileextension,
                      tagtime: this.tagtime,
                      Tagsend: this.Tagsend,
                      attachtext: this.ApiserviceService.encryptText(null),
                      channel: "web",

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
                    this.groupsend(array2)
                    this.allgroupmsgs.push(array);
                    this.scrollToBottomOnInit();


                    this.GruopChatProvider.createMessage(array2, this.groupcreated, this.groupmembers).then(res => {
                      console.log("seneded")
                      // online data insert
                      if (this.networkProvider.CurrentStatus == true) {
                        // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                      }
                    });


                    // loader.dismiss();
                    console.log("galleryPicMsg 4")
                  })

            })


          });


      }

    }, (err) => {
      this.loadingdismiss();

    });

  }

  //  Gallery file updated (priya)(new)
  groupgalleryPicMsg() {


    if (this.platform.is('android') || this.platform.is('ios')) {
      this.presentLoadingWithOptions();
      const permissions = Object.keys(this.PERMISSION).map(k => this.PERMISSION[k]);
      this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
        console.log("requestAllPermissions :" + JSON.stringify(status));
        if (status != undefined && status.CAMERA != "DENIED") {
          this.showpopGroup1 = false

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
                        channel: "web",

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
                        attachtext: null,
                        Filedate: new Date(),
                        status: status,
                        Taskfrom: '',
                        Taskto: '',
                        opengroup: this.opengroup,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false

                      }

                      var array2 = {
                        groupname: this.groupname,
                        groupkey: this.groupkey,
                        message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                        sentby: this.Uid,
                        sendername: this.sendername,
                        photourl: this.photourl,
                        groupimage: this.groupImage,
                        fileextension: currentName,
                        timestamp: new Date().getTime(),
                        replydisplayname: this.replydisplayname,
                        filetype: getinfo[0],
                        experts: null,
                        tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                        tagfileextension: this.tagfileextension,
                        tagtime: this.tagtime,
                        Tagsend: this.Tagsend,
                        Tagto: this.Tagto,
                        Date: new Date(),
                        tagfiletype: this.filetype,
                        Taglatitude: this.latitude,
                        Taglocation: this.location,
                        attachtext: this.ApiserviceService.encryptText(null),
                        Filedate: new Date(),
                        status: status,
                        channel: "web",

                        Taskfrom: '',
                        Taskto: '',
                        opengroup: this.opengroup,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false

                      }
                      this.groupsend(array2)
                      this.allgroupmsgs.push(array);
                      this.scrollToBottomOnInit();


                      this.GruopChatProvider.createMessage(array2, this.groupcreated, this.groupmembers).then(res => {
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
                        channel: "web",

                        Tagto: this.Tagto,
                        attachtext: null,
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
                      var array2 = {
                        groupname: this.groupname,
                        groupkey: this.groupkey,
                        message: this.ApiserviceService.encryptText(this.service.ImagePath + imagename),
                        sentby: this.Uid,
                        sendername: this.sendername,
                        photourl: this.photourl,
                        fileextension: currentName,
                        groupimage: this.groupImage,
                        timestamp: new Date().getTime(),
                        replydisplayname: this.replydisplayname,
                        filetype: getinfo[0],
                        experts: null,
                        tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
                        tagfileextension: this.tagfileextension,
                        tagtime: this.tagtime,
                        Tagsend: this.Tagsend,
                        Tagto: this.Tagto,
                        attachtext: this.ApiserviceService.encryptText(null),
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
                        channel: "web",

                        selectedColor: "none",
                        showMore: false
                      }
                      this.groupsend(array2)
                      this.allgroupmsgs.push(array);
                      this.scrollToBottomOnInit();

                      this.GruopChatProvider.createMessage(array2, this.groupcreated, this.groupmembers).then(res => {
                        console.log("seneded")
                        // online data insert
                        if (this.networkProvider.CurrentStatus == true) {
                          // this.GroupDatabaseProvider.updateMsgstatus(this.groupkey);
                        }
                      });

                    })

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

  groupgetPermission(url, fileName, filetype) {

    window.open(url, '_blank');
  }
  groupdownloadFile(url, fileName, filetype) {

    const fileTransfer: FileTransferObject = this.FileTransfer.create();

    fileTransfer.download(url, this.file.externalRootDirectory +
      '/Download/' + fileName).then()
    let fileExtn = fileName.split('.').reverse()[0];
    let fileMIMEType = this.getMIMEtype(fileExtn);
    this.fileOpener.open("file:///storage/emulated/0/download/" + fileName + "", fileMIMEType)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));


  }

  async addMember() {
    this.menu.enable(false, 'first');
    this.rightmember = false;


    const model = await this.modalController.create({
      component: AddgroupmemberPage,
      componentProps: {
        groupname: this.groupname,
        groupkey: this.groupkey,
        opengroup: this.opengroup,
        groupImage: this.groupImage,
        groupcreated: this.groupcreated,
        owner: this.owner,
        exitsgroup: true
      }

    });

    model.present();
    model.onWillDismiss().then(data => {

      //this.groupmember();
      this.scrollValue = 70;
      console.log("onWillDismissAddgroupmemberPage")
      this.allgroupmsgs = [];
      this.getgroupchat(this.scrollValue)
    });
  }

  showGroupMember() {
    this.group_call1 = false;
    this.menu.enable(false, 'first');
    this.rightmember = true;
    this.groupmembers1 = [];
    this.owener = false;
    this.GruopProvider.getGroupinfo(this.groupkey).then(res => {
      console.log("getGroupMember :" + JSON.stringify(res))



      var getarray: any;
      getarray = res["member"];
      getarray.forEach(element => {
        if (element.owner == localStorage.getItem("LinkususerID")) {
          this.owener = true
        }
        if (element.status == null || element.status == "1") {
          this.groupmembers1.push(element)

        }
      });

      console.log(" this.owener " + this.owener + ":" + this.group_call1)
      this.loadingdismiss();


      this.groupmembers1.forEach(element => {
        if (element.uid == localStorage.getItem("LinkususerID")) {
          this.groupmembers1.splice(element)
        }
        else {


          if (element.ower == localStorage.getItem("LinkususerID")) {
            this.owerInfo = true;
          }
        }
      });
      this.groupmembers1.sort(function (a, b) {
        if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1; }
        if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1; }
        return 0;
      })
      //this.loadingdismiss();
      this.groupmembers1.sort(function (a, b) {
        var nameA = a.username; // ignore upper and lowercase
        var nameB = b.username; // ignore upper and lowercase

        if (a.owner != null || b.owner != null) {

          return -1;
        }
        // names must be equal
        return 0;
      });

      console.log("this.groupmembers :" + this.groupmembers1.length)
    }, err => {
      console.log(err);
      this.loadingdismiss();
    })

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
  async Deletemember(item) {
    const statusalert = await this.alertCtrl.create({
      // header: 'Ad!',
      message: "Are you sure want to remove " + item.username + " from " + this.GruopProvider.currentgroupname + " Group?",
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

            console.log("deldete :" + JSON.stringify(item))

            var newgroup = {
              opengroup: this.opengroup,
              groupname: this.groupname,
              groupimage: this.groupImage,
              groupkey: this.groupkey,
              removeUser: item.uid,
              removeBy: localStorage.getItem("username")
            }

            var array = {
              sendername: localStorage.getItem("username"),
              groupimage: newgroup.groupimage,
              photourl: localStorage.getItem("photourl"),
              groupname: newgroup.groupname,
              groupkey: newgroup.groupkey,
              tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
              message: this.ApiserviceService.encryptText(" Removed " + item.username),
              sentby: localStorage.getItem("LinkususerID").toString(),
              username: item.username,
              timestamp: new Date().getTime(),
              replydisplayname: '',
              filetype: "title",
              status: 1,
              channel: "web",

              attachtext: this.ApiserviceService.encryptText(null),
              Filedate: new Date(),
              livelocation: false
            }


            this.GruopChatProvider.createMessage(array, "", this.groupmembers).then(res => {
              this.allgroupmsgs = [];
              this.getgroupchat(this.scrollValue)
              this.groupmember();

            }).catch(err => {
              this.allgroupmsgs = [];
              this.getgroupchat(this.scrollValue)
              this.groupmember();
            })

            // this.GruopChatProvider.removemember(this.myInfo, newgroup, item);


            //   removemember(userinfo, newGroup, memberdata) {
            //     var array = {
            //         sendername: localStorage.getItem("username"),
            //         photourl: localStorage.getItem("photourl"),
            //         groupname: newGroup.groupname,
            //         groupkey: newGroup.groupkey,
            //         message: " Removed " + memberdata.username,
            //         sentby: localStorage.getItem("LinkususerID").toString(),
            //         username: memberdata.username,
            //         timestamp: new Date().getTime(),
            //         replydisplayname: '',
            //         filetype: "title",
            //         status: 1,
            //         Filedate: new Date(),
            //     }

            //     this.createMessage(array, "", memberdata)
            // }
            var timestamp = new Date().getTime();
            this.GruopProvider.Exitgroup(item.uid, this.groupkey, timestamp).then(res => {

              console.log("deletemember :" + JSON.stringify(res))
              //this.getGroupMember();
              this.socket.emit('group_memberchange', newgroup);
              this.presentAlert('Removed Successfully');

            });

          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
  }
  change(contact) {

    console.log("contact :" + contact.selected)
    console.log("contactsSelected length: " + this.contactsSelected.length);

    if (contact.selected == true) {
      // this.contactsSelected.push(contact);
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
  closebutton() {
    this.rightmember = false;

  }

  async groupfileFilter() {


    const model = await this.modalController.create({
      component: FileFilterPage,
      componentProps: {
        message: this.allgroupmsgs,
        groupname: this.groupname,
        groupkey: this.groupkey,
        opengroup: this.opengroup,
        groupImage: this.groupImage,
        groupmembers: this.groupmembers
      }
    });

    model.present();
    model.onWillDismiss().then(data => {

    });
  }

  async groupchatfilter(chatmemberlist) {

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
        this.chatfilterValue = true;
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

  async deleteGroup() {
    const statusalert = await this.alertController.create({
      // header: 'Ad!',
      message: "Do you want Delete '" + this.groupname + "' group?",
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
            this.GruopProvider.deleteGroup(this.Uid, this.groupkey).then(() => {
              this.presentAlert('Successfully Deleted' + ' ' + this.groupname);
              this.isRemoved = true;
              // this.navCtrl.pop();
              var todo = {
                uid: this.Uid,
                backclick: true
              }

              this.socket.emit('recentmessgae', todo);


              this.menu.enable(false, 'first');

              this.groupchat = false;
              this.nodata = true;
              this.allmygroups = [];
              this.myfriends = [];
              this.recentonlinedata();
              this.onlinegroupdata();
            }).catch((err) => {
              this.presentAlert('Successfully Deleted' + ' ' + this.groupname);
              this.isRemoved = true;
              // this.navCtrl.pop();
              var todo = {
                uid: this.Uid,
                backclick: true
              }

              this.socket.emit('recentmessgae', todo);

              // this.navCtrl.navigateForward('home', {
              // })
              this.menu.enable(false, 'first');

              this.groupchat = false;
              this.nodata = true;
              this.allmygroups = [];
              this.myfriends = [];
              this.recentonlinedata();
              this.onlinegroupdata();
            })

          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
  }
  //exit group (priya)

  async exitGroup() {
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
            var timestamp = new Date().getTime();
            //  Deleted group
            this.GruopProvider.Exitgroup(this.Uid, this.groupkey, timestamp).then(() => {
              this.presentAlert('You are successfully Exit from' + ' ' + this.groupname);
              this.isRemoved = true;
              // this.navCtrl.pop();
              var todo = {
                uid: this.Uid,
                backclick: true
              }
              var item = {
                uid: localStorage.getItem("LinkususerID")
              }
              var newgroup = {
                groupname: this.groupname,
                groupkey: this.groupkey,
                timestamp: timestamp
              }
              var memberdata = {
                sentby: this.Uid,
                "status": "1",
                "Taskfrom": "",
                "Taskto": "",
                "channel": "android",
                "opengroup": false,
                "forwardmsg": null,
                "selectedColor": "none",
                "showMore": false,
                "edited": null,
                groupimage: this.groupImage,
                Date: new Date()
              }

              this.GruopChatProvider.leftFromgroup(newgroup, localStorage.getItem("username"), memberdata);

              this.GruopChatProvider.deletedmember(this.groupName, this.groupKey, item)
              this.socket.emit('recentmessgae', todo);

              // this.navCtrl.navigateForward('home', {
              // })
              this.menu.enable(false, 'first');

              this.groupchat = false;
              this.nodata = true;
              console.log("Delete 1 ");

            }).catch((err) => {
              this.menu.enable(false, 'first');

              this.groupchat = false;
              this.nodata = true;
              var item = {
                uid: localStorage.getItem("LinkususerID")
              }
              var newgroup = {
                groupname: this.groupname,
                groupkey: this.groupkey,
                timestamp: timestamp
              }
              var memberdata = {
                sentby: this.Uid,
                "status": "1",
                "Taskfrom": "",
                "Taskto": "",
                "channel": "android",
                "opengroup": false,
                "forwardmsg": null,
                "selectedColor": "none",
                "showMore": false,
                "edited": null,
                groupimage: this.groupImage,
                Date: new Date()
              }

              this.GruopChatProvider.leftFromgroup(newgroup, localStorage.getItem("username"), memberdata);

              this.GruopChatProvider.deletedmember(this.groupName, this.groupKey, item)
              console.log("Delete 2" + err);
              var todo = {
                uid: this.Uid,
                backclick: true
              }
              this.socket.emit('recentmessgae', todo);
            })

          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await statusalert.present();
  }


  updateImage(groupImage) {
    if (this.isRemoved == true) {
      this.service.presentToast("You are not part of this Group");
    }
    else {
      let actionSheet = this.actionSheet.create({
        header: 'Choose options',
        buttons: [
          {
            text: 'Take Photo',
            icon: 'camera-outline',
            handler: () => {
              this.cameraImage();
            }
          },
          {
            text: 'Choose photo from Gallery',
            icon: 'aperture-outline',
            handler: () => {
              $("#filedata1").trigger("click");
            }
          },
          {

            text: 'View Photo',
            icon: 'eye-outline',
            handler: () => {
              // this.photoViewer.show(this.buddydetails.photourl);
              // this.viewPhoto(groupImage);
              if (groupImage == 'default') {
                this.presentAlert('Please upload profile image');
              }
              else {
                this.viewPhoto(groupImage);
              }

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

  onPress1($event, item, i) {
    item.selectedColor = "rgb(0 150 136 / 8%)";
    this.stopInterval1();

    this.selecteItem = item;
    this.textIndex = i;

    console.log("onPress", $event);
    this.pressState = 'pressing';
    this.startInterval1();
  }

  onPressUp1($event) {
    this.progress = 0;
    console.log("onPressUp", $event);
    this.pressState = 'released';
    this.stopInterval1();
  }


  startInterval1() {
    const self = this;
    this.interval = setInterval(function () {
      self.progress = self.progress + 1;
      console.log("self.progress:" + self.progress)
      if (self.progress == 5) {
        console.log("click :" + self.progress)
        self.groupEvent(self.selecteItem, self.textIndex);
      }
    }, 50);
  }

  stopInterval1() {
    if (this.interval != undefined) {
      clearInterval(this.interval);

    }
  }
  groupstopLocation(message, timestamp, sentby) {
    this.grouppresentAlertConfirm('', 'Stop Sharing Live Location?', timestamp, sentby)

  }
  async grouppresentAlertConfirm(heading, tittle, timestamp, sentby) {
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
              console.log("updatechatlocationmesage :" + JSON.stringify(res))
              this.getgroupchat(this.scrollValue);
            }).catch(err => {
              this.getgroupchat(this.scrollValue);

            })

          }
        }
      ]

    });

    await alert.present();
  }
  async groupmobileLcoation(locationValue, groupkey, sendername) {
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
          attachtext: null,
          opengroup: this.opengroup,
          channel: "web",
          livelocation: true,
          forwardmsg: null,
          selectedColor: "none",
          showMore: false

        }

        var array2 = {
          groupname: this.groupname,
          groupkey: this.groupkey,
          message: this.ApiserviceService.encryptText(data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"]),
          sentby: this.Uid,
          sendername: this.sendername,
          photourl: this.photourl,
          channel: "web",
          groupimage: this.groupImage,
          timestamp: new Date().getTime(),
          replydisplayname: this.replydisplayname,
          filetype: mapType,
          experts: null,
          tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
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
          attachtext: this.ApiserviceService.encryptText(null),
          opengroup: this.opengroup,
          livelocation: true,
          forwardmsg: null,
          selectedColor: "none",
          showMore: false,
          favourite: null,

        }
        //this.send(array);
        this.groupsend(array2)
        this.allgroupmsgs.push(array);
        this.scrollToBottomOnInit();

        this.GruopChatProvider.createMessage(array2, this.groupcreated, this.groupmembers).then(res => {
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
  async groupaddMarker() {
    this.showpopGroup1 = false

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
                this.groupmobileLcoation("", "", "");
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
            channel: "web",
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
            attachtext: null,
            opengroup: this.opengroup,
            livelocation: true,
            forwardmsg: null,
            selectedColor: "none",
            showMore: false

          }


          var array2 = {
            groupname: this.groupname,
            groupkey: this.groupkey,
            message: this.ApiserviceService.encryptText(data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"]),
            sentby: this.Uid,
            sendername: this.sendername,
            photourl: this.photourl,
            groupimage: this.groupImage,
            timestamp: new Date().getTime(),
            replydisplayname: this.replydisplayname,
            filetype: mapType,
            tagmessage: this.ApiserviceService.encryptText(this.tagmessage),
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            channel: "web",
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
            attachtext: this.ApiserviceService.encryptText(null),
            opengroup: this.opengroup,
            livelocation: true,
            forwardmsg: null,
            selectedColor: "none",
            showMore: false

          }
          this.groupsend(array2)
          this.allgroupmsgs.push(array);
          this.scrollToBottomOnInit();

          this.GruopChatProvider.createMessage(array2, this.groupcreated, this.groupmembers).then(res => {
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
    if (this.isRemoved == true) {
      this.service.presentToast("You are not part of this Group");
    }
    else {
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
                  var todo = {
                    group: "true"
                  }
                  this.socket.emit('recentmessgae', todo);

                }).catch(err => {
                  this.socket.emit('groupinfo', obj);
                  var todo = {
                    group: "true"
                  }
                  this.socket.emit('recentmessgae', todo);
                })


              }

            }
          }
        ]
      });
      await alert1.present();
    }

  }
  async cameraImage() {
    const model = await this.modalController.create({
      component: TakephotoPage,

    });

    model.present();
    model.onWillDismiss().then(data => {

      console.log("upload image:" + data["data"])
      var blobFile = this.makeblob(data["data"])
      console.log('webcamera  :' + blobFile);
      this.presentLoadingWithOptions();


      var result = JSON.stringify(data);
      var base64result = result;
      var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

      var imagename = "linkus" + imagecif + ".jpg";
      var base64result1 = base64result.split(',');
      this.groupImage = "data:image/jpeg;base64," + base64result1[1];


      var file = this.makeblob(data["data"]);
      var url = this.service.mainAPI + '/uploadlinkusimage';
      const formData: any = new FormData();
      formData.append("upload", blobFile, imagename);

      this.http.post(url, formData)

        .subscribe(
          (value) => {
            console.log("upload image1");
            this.loadingdismiss();
            var obj = {
              groupkey: this.groupkey
            }
            this.GruopProvider.updateGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
              this.socket.emit('groupinfo', obj);
              console.log("upload image 2");

            }).catch(err => {
              console.log("upload image 3");

              this.socket.emit('groupinfo', obj);
            })
            console.log("upload image 44:" + this.service.ImagePath + imagename);

            this.GruopProvider.updateRecentChatGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {

              console.log("upload image 4");

            }).catch(err => {
              console.log("upload image 5");

            })
          },
          // success,
          (err) => {
            this.loadingdismiss();
            var obj1 = {
              groupkey: this.groupkey
            }
            this.GruopProvider.updateGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
              this.loadingdismiss();
            }).catch(err => {
              this.loadingdismiss();
            })


            this.GruopProvider.updateRecentChatGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
              this.socket.emit('groupinfo', obj1);

              console.log("upload image 4");
              var todo = {
                uid: this.Uid,
                backclick: true
              }
              this.socket.emit('recentmessgae', todo);
            }).catch(err => {
              console.log("upload image 5");
              this.socket.emit('groupinfo', obj1);
              var todo = {
                uid: this.Uid,
                backclick: true
              }
              this.socket.emit('recentmessgae', todo);

            })
          })
    });


  }
  async group_call() {

    this.group_call1 = true;

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
    return await modal.present();
  }
  async groupmenuCLick() {

    const popover = await this.popoverController.create({
      component: GroupmenuComponent,
      cssClass: 'pop',
      // event: ev
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      console.log("menuCLick onDidDismiss : " + JSON.stringify(data));
      if (data["data"].buddyinfo == "1" || data["data"].buddyinfo == 1) {
        this.clickEVent(); //open slide bar
      }
      else if (data["data"].buddyinfo == "2") {
        this.groupfileFilter(); //open file filter
      }
      else if (data["data"].buddyinfo == "3") {

        this.filterChatList();

      }
      else if (data["data"].buddyinfo == "4") {
        this.cleargroupChat();
      }
    })
  }
  cleargroupChat() {
    var deleteArray = [];
    this.allgroupmsgs = [];
    this.cleartimestamp = new Date().getTime();
    console.log("deleteArray :" + deleteArray.length)
    this.GruopChatProvider.cleargroupMessage(this.groupkey, localStorage.getItem("LinkususerID"), this.cleartimestamp).then(res => {
      // this.forwardClick = false;
      this.deleteFlag = false;
      this.deleteFlag1 = false;
      this.loadingdismiss();
      // this.getgroupchat(this.scrollValue)
    }).catch(erre => {
      this.loadingdismiss();
      // this.getgroupchat(this.scrollValue)
    })
    this.allgroupmsgs = [];
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


      this.groupchatfilter(chatmemberlist); //open chat filter

    }
  }
  dissmissPop() {
    // this.showpopGroup = false
  }
  //Group chat end

  backbutton() {
    this.buddies = true;
    this.totalcontacts = false;
    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.mytaskpage = false;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = false;
    this.projectmilestonepage = false;
    this.starredmessage = false;
    this.dataLoad();
  }
  //contact page
  allContacts() {
    this.buddies = false;

    this.totalcontacts = true;
    this.totalgroups = false;
    this.aboutuskey = false;
    this.mynumber = localStorage.getItem('LinkususerID');
    this.network.onConnect().subscribe(() => {
      this.onlinecontacts();
    })


    this.socket.on('profile_changes', (msg) => {
      console.log("profile_changes  :" + JSON.stringify(msg))
      this.onlinecontacts();
    })
  }

  zoomImage1(image) {
    this.photoViewer.show(image);
  }
  onCancel1(event) {
    this.backgroundAll = 'orange';
    this.backgroundLive = '#f8f8f8';
    this.fontcolorlive = 'black'
    this.fontcolorall = 'white';

    console.log('CANCEL', event);
    this.onlinecontacts();
  }
  //priya
  searchcontacts(searchbar) {
    //this.filteredusers = ;
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {

      this.contacts = [];
      this.status = "0";
      this.backgroundAll = 'orange';
      this.backgroundLive = '#f8f8f8';
      this.fontcolorlive = 'black'
      this.fontcolorall = 'white';
      this.onlinecontacts();

      return;
    }

    if (this.contacts.length == 0) {
      this.contacts = this.Tempcontacts;
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

  ionViewWillEnter() {
    console.log("contacts ionViewWillEnter :" + this.networkProvider.CurrentStatus)

    this.onlinecontacts();



    this.onlinegroupdata();
  }
  onlinecontacts() {
    this.Tempcontacts = [];
    console.log(" onlinecontacts 1 :" + this.contacts.length)

    var data = {
      compid: this.compid
    }
    this.service.PostRequest(this.service.mainAPI + '/getUserMstComp', data).then(res => {
      if (res['status'] != 0) {
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
          if (element.mobile != localStorage.getItem('LinkususerID') && element.userstatus == "A" && element.username != undefined && element.username != "" && element.username != "undefined") {
            this.contacts.push(element)
            console.log("this.contacts :" + this.contacts.length)
          }
        });
        this.loadingdismiss();
        // if (this.platform.is('android')) {

        //   if (this.networkProvider.CurrentStatus == true) {
        //     // this.userdetails.insertRecords(this.contacts)

        //     this.contacts.sort(function (a, b) {
        //       if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1; }
        //       if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1; }
        //       return 0;
        //     })

        //     this.contacts.forEach(element => {
        //       this.userdetails.insertRecords(element);

        //     });
        //     this.loadingdismiss();
        //   }

        // }
        this.Tempcontacts = this.contacts;
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
    this.BuddyChatProvider.updatemystatus(localStorage.getItem("LinkususerID"), "online", new Date().getTime(), this.networkProvider.DeviceId);

    this.showdraghome = false;
    this.scrollValue = 70;
    this.BuddyChatProvider.initializebuddy(contact)
    this.cleartimestamp = null;

    if (this.platform.is('android') || this.platform.is('ios')) {
      // this.buddychatService.createUserInfoDb().then(re => {
      //   this.navCtrl.navigateForward('buddychat-room', {
      //     queryParams: contact,
      //   })
      // })
    }
    else {
      this.singleChatActive = true;
      this.groupChatActive = false;

      this.BuddyChatProvider.buddy = contact;
      console.log("BuddyChatProvider :" + JSON.stringify(this.BuddyChatProvider.buddy));
      this.buddychatright = true;
      this.groupchat = false;
      this.rightmember = false;
      this.nodata = false;
      this.BuddyTyping = false;
      if (localStorage.getItem('theme') == 'day') {
        this.imageLink = '../../assets/imgs/chatBackground.png'
      }
      if (localStorage.getItem('theme') == 'night') {
        this.imageLink = '../../assets/imgs/chatbg1.jpg'
      }
      this.Uid = localStorage.getItem("LinkususerID").toString();
      this.currentUser = localStorage.getItem("LinkususerID").toString();
      this.buddydetails = this.BuddyChatProvider.buddy;
      this.buddy = this.BuddyChatProvider.buddy;
      this.buddyinfo = this.buddydetails;
      this.showEmojiPicker = false;
      this.pageAlive = true;

      this.callid = 0;
      this.callName = 0;

      this.message_id = localStorage.getItem('LinkususerID') + '_' + this.buddydetails.mobile;
      this.message_id1 = this.buddydetails.mobile + '_' + localStorage.getItem('LinkususerID');
      console.log("this.buddydetails :" + JSON.stringify(this.buddydetails))

      var myinfo = {
        "username": localStorage.getItem("username"),
        "mobile": localStorage.getItem("LinkususerID"),
      }


      this.groupmembers = [];
      this.groupmembers.push(myinfo);


      this.networkProvider.initializeNetworkEvents();
      this.showEmojiPicker = false;
      // this.InitializeApiRTC();

      // this.socket = io(this.IpaddressProvider.socketconfig);
      this.message = '';
      this.ApiserviceService._content = ''
      this.events.subject = new Subject<any>();

      console.log("this.buddyinfo", this.buddyinfo)

      this.tempMsg = '';


      if (this.platform.is('android') || this.platform.is('ios')) {
        this.mobileicon = true;
      }
      this.mapshowpop = 'false'

      this.allmessages = [];
      this.tempArrayList = [];
      // audio variable
      this.sendRecord = null;

      this.viewStatus = true;
      this.chatmessage = [];

      console.log("this.buddy :" + JSON.stringify(this.buddy))
      this.BuddyChatProvider.getMyinfo(this.buddy["mobile"]).then(res => {
        console.log("buddydetails 2 :" + JSON.stringify(res))
        this.buddydetails = res[0]
        this.buddyinfo = this.buddydetails;
        this.groupmembers.push(res[0]);
      }).catch(err => {
        this.BuddyChatProvider.getMyinfo(this.buddy["mobile"]).then(res => {
          console.log("buddydetails 2 :" + JSON.stringify(res))
          this.buddydetails = res[0]
          this.buddyinfo = this.buddydetails;
          this.groupmembers.push(res[0]);
        }).catch(err => {

        })
      })

      this.addmessagehide = false;


      this.subscription = this.events.getMessage().subscribe(text => {
        console.log("subscribe:" + JSON.stringify(text))
        console.log(text.created);
        if (text["emojis:created"] != 0 && text["emojis:created"] != undefined) {
          if (this.message != undefined) {
            this.tempMsg = this.message;
          }

          this.isTyping();
          // console.log("emojis:created :"+emoji+"::"+this.tempMsg+":"+this.newmessage)
          this.message = this.tempMsg + ' ' + text["emojis:created"];
          this.tempMsg = this.message;

        }
      })
      // this.socket.disconnect('chatmessage');

      // this.Receive();

      this.network.onConnect().subscribe(() => {
        console.log("Online Buddychat")
        // this.offline_online();
      })

      this.platform.pause.subscribe(() => {

        this.unreadCount = 0;
        this.allmessages.forEach(element => {
          element.countStatus = "2";
          element.unreadMessageCount = null;
        });
      });



      this.clearunreadmessage();

      var room = { sender: localStorage.getItem('LinkususerID'), receiver: this.buddydetails.mobile };
      // this.socket.emit('connectionestablish', room);
      this.nativeAudio.preloadSimple('sent', 'assets/mp3/sent.mp3').then(res => {
      })

      this.nativeAudio.preloadSimple('receive', 'assets/mp3/receive.wav').then(res => {
      })

      this.scrollValue = 70;
      this.pageAlive = true;
      this.checkblocked();
      this.getchat(this.scrollValue);

      this.socket.connect();



      console.log("this.buddydetails :" + JSON.stringify(this.buddydetails))
      var buddyinfo = {
        "username": contact.username,
        "mobile": contact.mobile,
        "photourl": contact.buddyimage,
      }
      console.log("buddychat :" + JSON.stringify(contact) + ":" + JSON.stringify(buddyinfo))

      this.BuddyChatProvider.initializebuddy(buddyinfo);
      if (this.platform.is('android') || this.platform.is('ios')) {
        console.log("andorid")
        // this.buddychatService.createUserInfoDb().then(res => {
        //   // this.BuddyChatProvider.buddy = buddyinfo;


        //   // this.navCtrl.navigateForward('buddychat-room', {
        //   //   queryParams: buddyinfo,
        //   // })
        // });
      }
      else {
        this.BuddyChatProvider.buddy = buddyinfo;

        // this.navCtrl.navigateForward('buddychat-room', {
        //   queryParams: buddyinfo,
        // })
      }


    }

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
      this.backgroundAll = 'orange';
      this.backgroundLive = '#f8f8f8';
      this.fontcolorlive = 'black'
      this.fontcolorall = 'white';


      this.onlinecontacts();



    }
  }
  //end contact page


  //group start_time
  gotoGroup() {
    this.buddies = false;

    this.totalcontacts = false;
    this.aboutuskey = false;
    this.totalgroups = true;

    this.network.onConnect().subscribe(() => {
      this.onlinegroupdata();
    })

    this.socket.on('recentmessgae', (msg) => {
      // console.log("recentmessgae group :"+JSON.stringify(msg))
      if (msg.uid == localStorage.getItem("LinkususerID")) {
        this.onlinegroupdata();
      }
    })
  }
  aboutus() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = true;
    this.myprofilekey = false;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = false;
    this.projectmilestonepage = false;
    this.starredmessage = false;
  }
  openProjects() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = false;
    this.projectmilestonepage = true;
    this.starredmessage = false;
    this.admin = localStorage.getItem('adminlogin');
  }
  myprofile() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = true;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = false;
    this.profileInfo = undefined;
    this.projectmilestonepage = false;
    this.starredmessage = false;
    this.presentLoadingWithOptions();
    this.BuddyChatProvider.getMyProfileinfo(localStorage.getItem("LinkususerID")).then(res => {
      console.log("my info :" + JSON.stringify(res))
      this.loadingdismiss();
      this.profileInfo = res[0]
      console.log("this.profileInfo :" + this.profileInfo.photourl)
    })
  }
  tasks() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.mytaskpage = true;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = false;
    this.projectmilestonepage = false;
    this.starredmessage = false;
    this.my_no = localStorage.getItem('LinkususerID');
  }
  opencalendar() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.mytaskpage = false;
    this.calendarpage = true;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = false;
    this.projectmilestonepage = false;
    this.starredmessage = false;
    this.getmyevents();
  }
  openshelf() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.mytaskpage = false;
    this.calendarpage = false;
    this.myshelfpage = true;
    this.mompage = false;
    this.birthdaypage = false;
    this.projectmilestonepage = false;
    this.starredmessage = false;
  }
  openmom() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.mytaskpage = false;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = true;
    this.birthdaypage = false;
    this.projectmilestonepage = false;
    this.starredmessage = false;
    this.my_no = localStorage.getItem('LinkususerID');
  }
  openBirthdays() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.mytaskpage = false;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = true;
    this.projectmilestonepage = false;
    this.starredmessage = false;
  }
  openStarredMessage() {
    this.showdraghome = 'false';
    this.buddies = false;

    this.totalcontacts = false;

    this.totalgroups = false;
    this.aboutuskey = false;
    this.myprofilekey = false;
    this.mytaskpage = false;
    this.calendarpage = false;
    this.myshelfpage = false;
    this.mompage = false;
    this.birthdaypage = false;
    this.projectmilestonepage = false;
    this.starredmessage = true;
    this.getStarredMessage();
  }
  onlinegroupdata() {

    this.GruopProvider.getGroupContactlist().then(data => {
      // loader.dismiss();
      var getdta: any;
      getdta = data;
      getdta.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });
      if (data["flag"] == null) {
        this.groupInfo(data);


        // getdta.forEach(element => {
        //   // this.RoomsProvider.insertRecords(element).then(res => {
        //   //   console.log("inserted new rooms")
        //   // })

        // });

      }
    }).catch(res => {
      // this.onlinegroupdata();
      // loader.dismiss();
      //this.loadingdismiss();

    })
  }
  // set online/offline information
  groupInfo(mainList) {
    this.allmygroups = [];

    if (mainList != null) {
      mainList.forEach(value => {
        this.allmygroups.push(value)
      });
    }


  }
  async addgroup() {

    // alert('addgroup');
    // this.navCtrl.navigateForward('groupcreation', {

    // })
    const modal = await this.modalController.create({
      component: GroupcreationPage,

    });
    modal.present();
    modal.onDidDismiss().then((resp) => {
      if (resp.data != undefined) {

        var buddy = resp.data;
        this.groupchat = true;


        this.buddychatright = false;
        this.rightmember = false;
        this.nodata = false;
        this.GruopProvider.currentgroupname = buddy.groupname;
        this.GruopProvider.currentgroupProfileImage = buddy.groupimage;
        this.GruopProvider.getintogroup(buddy.groupkey, buddy.groupname, buddy.groupimage, buddy.openGroup);

        var obj =
        {
          groupimage: buddy.groupimage,
          groupkey: buddy.groupkey,
          groupname: buddy.groupname,
          opengroup: buddy.openGroup,
        }
        this.GruopProvider.initializegroup(obj);
        if (this.platform.is('android')) {
          console.log("platform");
          // this.GroupDatabaseProvider.createGroupDb(buddy.groupkey).then(res => {
          //   this.navCtrl.navigateForward('groupchat', {
          //     queryParams: obj,
          //   })
          // })
        }
        else {
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


          // // this.groupReceive();
          // this.network.onConnect().subscribe(() => {
          //   console.log("Online Buddychat")
          //   this.groupoffline_online();
          // })
          this.platform.pause.subscribe(() => {

            this.unreadCount = 0;
            this.allgroupmsgs.forEach(element => {
              element.countStatus = "2";
              element.unreadMessageCount = null;
            });
          });

        }
        this.getgroupchat(this.scrollValue);
      }
    });

  }

  openchat(group) {
    this.scrollValue = 70;
    this.showdraghome = false;
    this.cleartimestamp = null;
    this.tagmessage = null;
    this.groupmembersinlist = false
    console.log('openchat:' + JSON.stringify(group))
    this.groupchat = true;
    this.buddychatright = false;
    this.rightmember = false;
    this.nodata = false;
    this.GruopProvider.currentgroupname = group.groupname;
    this.GruopProvider.currentgroupProfileImage = group.groupimage;
    this.GruopProvider.getintogroup(group.groupkey, group.groupname, group.groupimage, group.opengroup);

    var obj =
    {
      groupimage: group.groupimage,
      groupkey: group.groupkey,
      groupname: group.groupname,
      opengroup: group.opengroup,
    }
    this.GruopProvider.initializegroup(obj);
    if (this.platform.is('android')) {
      console.log("platform");
      // this.GroupDatabaseProvider.createGroupDb(group.groupkey).then(res => {
      //   this.navCtrl.navigateForward('groupchat', {
      //     queryParams: obj,
      //   })
      // })
    }
    else {
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


      // this.groupReceive();
      // this.network.onConnect().subscribe(() => {
      //   console.log("Online Buddychat")
      //   this.groupoffline_online();
      // })
      this.platform.pause.subscribe(() => {

        this.unreadCount = 0;
        this.allgroupmsgs.forEach(element => {
          element.countStatus = "2";
          element.unreadMessageCount = null;
        });
      });

    }
    // this.getgroupchat(this.scrollValue);

  }
  //group end

  //my profile
  playtone(value) {
    console.log(this.calltone, value);
    this.nativeAudio.stop(this.oldtone);
    this.nativeAudio.play(this.calltone, () => console.log('sent is done playing'));
    localStorage.setItem('callertone', this.calltone);
    this.oldtone = this.calltone;
  }

  stoptone() {
    console.log("tone stoped");
    this.nativeAudio.stop(this.oldtone);
  }

  updateImagedefault() {
    console.log("this.profileInfo.photourl :" + this.profileInfo.photourl)


    var d = Number(new Date().getHours());

    var colorStyle = null, colorStyleColor = null;
    if (d >= 6 && d < 18) {
      colorStyle = "EditionIcon1"
      colorStyleColor = "action-sheets-groups-page1"
    } else {
      colorStyle = "EditionIcon"
      colorStyleColor = "action-sheets-groups-page"
    }

    let actionSheet = this.actionSheet.create({
      cssClass: colorStyleColor,
      header: 'Choose options',
      buttons: [

        {
          cssClass: colorStyle,
          text: 'Take Photo',
          icon: 'camera-outline',
          handler: () => {
            this.webcameraprofile();
          }
        },
        {
          cssClass: colorStyle,
          text: 'Choose photo from Gallery',
          icon: 'aperture-outline',
          handler: () => {
            $("#filedata").trigger("click");
          }
        },

        {
          cssClass: colorStyle,
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
  updateImage1() {
    console.log("this.profileInfo.photourl :" + this.profileInfo.photourl)


    var d = Number(new Date().getHours());

    var colorStyle = null, colorStyleColor = null;
    if (d >= 6 && d < 18) {
      colorStyle = "EditionIcon1"
      colorStyleColor = "action-sheets-groups-page1"
    } else {
      colorStyle = "EditionIcon"
      colorStyleColor = "action-sheets-groups-page"
    }

    let actionSheet = this.actionSheet.create({
      cssClass: colorStyleColor,
      header: 'Choose options',
      buttons: [
        {
          cssClass: colorStyle,
          text: 'View Photo',
          icon: 'eye-outline',
          handler: () => {
            // this.photoViewer.show(this.buddydetails.photourl);
            if (this.profileInfo.photourl == 'default') {
              this.presentAlert('Please upload profile image');
            }
            else {
              this.viewPhoto(this.profileInfo.photourl);
            }
          }
        },
        {
          cssClass: colorStyle,
          text: 'Take Photo',
          icon: 'camera-outline',
          handler: () => {
            this.webcameraprofile();
          }
        },
        {
          cssClass: colorStyle,
          text: 'Choose photo from Gallery',
          icon: 'aperture-outline',
          handler: () => {
            $("#filedata").trigger("click");
          }
        },
        {
          cssClass: colorStyle,
          text: 'Remove Photo',
          icon: 'close-circle-outline',
          handler: () => {
            this.removePhoto();
          }
        },
        {
          cssClass: colorStyle,
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
  onUploadChange2(evt: any) {
    const file = evt.target.files[0];


    this.webFileUploadname = file.name;
    this.webFileUploadFileType = file.type;


    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded1.bind(this);
    reader.readAsBinaryString(file);
  }
  onUploadChange1(evt: any) {
    console.log('evt@@@@@@@@@@@@@@@@@@', evt.target.files[0])
    const file = evt.target.files[0];


    this.webFileUploadname = file.name;
    this.webFileUploadFileType = file.type;


    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);

  }
  handleReaderLoaded1(e) {

    var base64 = "data:" + this.webFileUploadFileType + ";base64," + btoa(e.target.result);
    this.groupImage = "data:" + this.webFileUploadFileType + ";base64," + btoa(e.target.result);
    var blobFile = this.makeblob(base64)

    var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
    var imagename = "linkus" + imagecif + ".jpg";

    var url = this.service.mainAPI + '/uploadlinkusimage';
    const formData: any = new FormData();
    formData.append("upload", blobFile, imagename);

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

          // this.GruopProvider.updateGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
          //   this.loadingdismiss();
          // }).catch(err => {
          //   this.loadingdismiss();
          // })

          this.loadingdismiss();
          var obj1 = {
            groupkey: this.groupkey
          }
          this.GruopProvider.updateGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
            this.loadingdismiss();
          }).catch(err => {
            this.loadingdismiss();
          })


          this.GruopProvider.updateRecentChatGroupImage(this.service.ImagePath + imagename, this.groupkey).then(res => {
            this.socket.emit('groupinfo', obj1);

            console.log("upload image 4");
            var todo = {
              uid: this.Uid,
              backclick: true
            }
            this.socket.emit('recentmessgae', todo);
          }).catch(err => {
            console.log("upload image 5");
            this.socket.emit('groupinfo', obj1);
            var todo = {
              uid: this.Uid,
              backclick: true
            }
            this.socket.emit('recentmessgae', todo);

          })
        })
  }
  handleReaderLoaded(e) {

    var base64 = "data:" + this.webFileUploadFileType + ";base64," + btoa(e.target.result);
    var blobFile = this.makeblob(base64)

    var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
    var imagename = "linkus" + imagecif + ".jpg";

    var url = this.service.mainAPI + '/uploadlinkusimage';
    const formData: any = new FormData();
    formData.append("upload", blobFile, imagename);

    this.http.post(url, formData)

      .subscribe(
        (value) => {
          var obj =
            { "example": "" }

          this.socket.emit('profile_changes', obj);
          this.loadingdismiss();
          localStorage.setItem('photourl', this.service.ImagePath + imagename);
          this.profileImg = this.service.ImagePath + imagename;
          this.profileInfo.photourl = this.service.ImagePath + imagename;
          this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(res => {

          }).catch(err => {
            this.loadingdismiss();
          })

          // this.userdetails.updateProfileImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(resp => {

          // })
        },
        // success,
        (err) => {

          var obj =
            { "example": "" }

          this.socket.emit('profile_changes', obj);

          this.loadingdismiss();
          this.profileImg = this.service.ImagePath + imagename;

          this.profileInfo.photourl = this.service.ImagePath + imagename;
          localStorage.setItem('photourl', this.service.ImagePath + imagename);

          this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(res => {

          }).catch(err => {
            this.loadingdismiss();
          })

          // this.userdetails.updateProfileImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(resp => {

          // })
        })
  }
  async viewPhoto(photo) {
    const model = await this.modalController.create({
      component: ViewphotoPage,
      componentProps: {
        photo: photo
      }
    });

    model.present();
    model.onWillDismiss().then(data => {

    });
  }
  async webcameraprofile() {
    this.showpopSingle = false

    const model = await this.modalController.create({
      component: TakephotoPage,

    });

    model.present();
    model.onWillDismiss().then(data => {
      if (data != undefined) {
        this.presentLoadingWithOptions();

        var blobFile = this.makeblob(data["data"])
        console.log('webcamera  :' + blobFile);


        var result = JSON.stringify(data);
        var base64result = result;
        var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

        var imagename = "linkus" + imagecif + ".jpg";
        var base64result1 = base64result.split(',');
        var profilepic = "data:image/jpeg;base64," + base64result1[1];
        console.log('profilepic' + profilepic);

        var file = this.makeblob(data["data"]);
        var url = this.service.mainAPI + '/uploadlinkusimage';
        const formData: any = new FormData();
        formData.append("upload", blobFile, imagename);

        this.http.post(url, formData)

          .subscribe(
            (value) => {
              var obj =
                { "example": "" }

              this.socket.emit('profile_changes', obj);
              this.loadingdismiss();
              localStorage.setItem('photourl', this.service.ImagePath + imagename);
              this.profileImg = this.service.ImagePath + imagename;

              this.profileInfo.photourl = this.service.ImagePath + imagename;
              this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(res => {

              }).catch(err => {
                this.loadingdismiss();
              })

              // this.userdetails.updateProfileImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(resp => {

              // })
            },
            // success,
            (err) => {
              this.loadingdismiss();
              var obj =
                { "example": "" }

              this.socket.emit('profile_changes', obj);

              this.loadingdismiss();
              this.profileImg = this.service.ImagePath + imagename;
              this.profileInfo.photourl = this.service.ImagePath + imagename;
              localStorage.setItem('photourl', this.service.ImagePath + imagename);

              this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(res => {

              }).catch(err => {
                this.loadingdismiss();
              })

              // this.userdetails.updateProfileImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(resp => {

              // })
            })
      }
      console.log("onDidDismiss : " + JSON.stringify(data));

    });


  }

  removePhoto() {
    localStorage.setItem('photourl', "default");

    this.LoginProvider.updateImage("default", localStorage.getItem("LinkususerID")).then(res => {

    }).catch(err => {
    })

    // this.userdetails.updateProfileImage("default", localStorage.getItem("LinkususerID")).then(resp => {

    // })
    this.profileImg = "default";

    this.profileInfo.photourl = "default"
    // this.userdetails.profileImg = "default"

    var obj =
      { "example": "" }

    this.socket.emit('profile_changes', obj);
    this.service.presentToast("Your Profile photo Removed Successfully");
    localStorage.setItem("photourl", "default");
    this.profileImg = "default"
  }

  openprofileGallery() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true //Corrects Android orientation quirks
    }
    this.presentToast();

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:

      this.crop.crop(imageData, { quality: 75 })
        .then(
          newImage => {

            this.Base64.encodeFile(newImage).then((base64File: string) => {
              var base64result = base64File.split(',')[1]
              console.log("base64File :" + base64result);
              var base64Image = "data:image/jpeg;base64," + base64result;

              this.loadingdismiss();
              this.udpateImage1(base64Image);


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

  udpateImage1(base64Image) {

    this.presentToast();
    console.log("base64Image :" + base64Image)
    this.buddydetails.photourl = base64Image;
    // localStorage.setItem('photourl',base64Image);
    var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
    // this.userdetails.profileImg = base64Image;

    var imagename = "Linkus_profile" + imagecif + ".jpg";
    var file = this.dataURLtoFile(base64Image, imagename);
    var url = this.service.mainAPI + '/uploadlinkusimage';
    const formData: any = new FormData();
    formData.append("upload", file, imagename);

    this.http.post(url, formData)

      .subscribe(
        (value) => {
          var obj =
            { "example": "" }

          this.socket.emit('profile_changes', obj);
          this.loadingdismiss();
          localStorage.setItem('photourl', this.service.ImagePath + imagename);
          this.buddydetails.photourl = this.service.ImagePath + imagename;
          this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(res => {

          }).catch(err => {
            this.loadingdismiss();
          })

          // this.userdetails.updateProfileImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(resp => {

          // })
        },
        // success,
        (err) => {

          var obj =
            { "example": "" }

          this.socket.emit('profile_changes', obj);

          this.loadingdismiss();
          this.buddydetails.photourl = this.service.ImagePath + imagename;
          localStorage.setItem('photourl', this.service.ImagePath + imagename);

          this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(res => {

          }).catch(err => {
            this.loadingdismiss();
          })

          // this.userdetails.updateProfileImage(this.service.ImagePath + imagename, localStorage.getItem("LinkususerID")).then(resp => {

          // })
        })
  }
  cameraImage1() {

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true //Corrects Android orientation quirks
    }

    this.presentToast();
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      console.log("sendPicCamera :" + imageData)

      this.crop.crop(imageData, { quality: 100 })
        .then(
          newImage => {
            console.log(" crop newImage :" + newImage);

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


    }, (err) => {
      // Handle error
      //loader.dismiss();
      this.loadingdismiss();
      console.log("err:" + JSON.stringify(err))
    })
  }

  //my task
  viewdate() {
    console.log(this.date)
  }
  async get_todaytask() {
    console.log(this.date);
    var month;
    var mydate = new Date().toLocaleDateString();
    console.log(mydate);

    var sdate = mydate.split('/');
    var assigndate = String(Number(sdate[0])) + '/' + String(Number(sdate[1])) + '/' + sdate[2];
    console.log(assigndate);
    var data = {
      mobile: localStorage.getItem('LinkususerID'),
      admin: localStorage.getItem('adminlogin'),
      assigned_at: assigndate
    }
    console.log(data);
    this.mytask = [];
    this.notask = true;

    await this.service.PostRequest(this.service.mainAPI + '/get_mytask', data).then(res => {
      console.log("get_mytask :" + res);
      this.mytask = res;
      this.mytask.forEach(element => {
        if (element.assigned_to_no == this.my_no) {
          this.owenertask = false;
          element.statusopt = this.statusoption2;
        }
        if (element.assigned_by_no == this.my_no) {
          if (element.taskstatus == '4') {
            this.owenertask = true;
            element.statusopt = this.statusoption1;
          }
        }
      });
      console.log("get_mytask 1:" + this.mytask.length);

      if (this.mytask.length != 0) {
        this.notask = false;
      }
    }, err => {
      this.mytask = [];
      console.log("get_mytask err:" + err);
      if (err.error.text == "no data found") {
        this.notask = true;
      }
    })
  }
  getmytask() {
    this.notask = false;
    console.log(this.date);
    var month;
    var mydate = new Date((this.date)).toLocaleDateString();
    this.day = this.date;
    console.log(mydate);

    var sdate = mydate.split('/');
    var assigndate = String(Number(sdate[1])) + '-' + String(Number(sdate[0])) + '-' + sdate[2];
    console.log(assigndate);
    var data = {
      mobile: localStorage.getItem('LinkususerID'),
      admin: localStorage.getItem('adminlogin'),
      assigned_at: assigndate
    }
    this.mytask = [];
    this.notask = true;
    console.log(data);
    this.service.PostRequest(this.service.mainAPI + '/get_mytask', data).then(res => {
      console.log(res);
      this.mytask = res;
      this.mytask.forEach(element => {
        if (element.assigned_to_no == this.my_no) {
          this.owenertask = false;
          element.statusopt = this.statusoption2;
        }
        if (element.assigned_by_no == this.my_no) {
          this.owenertask = true;
          element.statusopt = this.statusoption1;
        }
      });
    }, err => {
      console.log(err);
      if (err.error.text == "no data found") {
        this.notask = true;
      }
    })
  }
  edit(i) {
    this.clicked[i] = true;
  }
  save(task, i, taskstatus) {
    var date = new Date();
    var getDesc = " "
    if (taskstatus != "1") {
      getDesc = (<HTMLInputElement>document.getElementById('desk' + i)).value
    }
    console.log("getDesc :" + getDesc + ":" + taskstatus)
    if (this.status == "4") {
      var data1 = {
        taskId: task.taskId,
        taskstatus: this.status,
        completed_at: String(Date.now()),
        emp_description: getDesc
      }
    }
    else if (this.status == "3" || this.status == "2" || this.status == "5") {
      var data1 = {
        taskId: task.taskId,
        taskstatus: this.status,
        completed_at: String(task.completed_at),
        emp_description: getDesc
      }
    }
    this.service.PostRequest(this.service.mainAPI + '/update_task', data1).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
      if (err.error.text == "update successfully") {
        this.service.presentToast("Task Updated Successfully!");
        this.clicked[i] = false;
        this.getmytask();
      }
    })
  }
  cancel(task, i) {
    this.clicked[i] = false;
  }

  // searchuser(searchbar) {
  //   console.log(searchbar);
  //   //this.filteredusers = ;
  //   var q = searchbar.target.value;
  //   if (q != undefined && q.trim() == '') {
  //     // this.getmytask();
  //     return this.mytask;
  //   }

  //   this.mytask = this.mytask.filter((v) => {
  //     console.log(v);
  //     if (v.message.toLowerCase().indexOf(q.toLowerCase()) > -1) {
  //       return true;
  //     }else if(v.assigned_by.toLowerCase().indexOf(q.toLowerCase()) > -1){
  //       return true;
  //     }
  //     else if(v.assigned_to.toLowerCase().indexOf(q.toLowerCase()) > -1){
  //       return true;
  //     }
  //     else if(v.assigned_by_no.toLowerCase().indexOf(q.toLowerCase()) > -1){
  //       return true;
  //     }
  //     else if(v.assigned_to_no.toLowerCase().indexOf(q.toLowerCase()) > -1){
  //       return true;
  //     }
  //     else {
  //       return false;
  //     }
  //   })
  // }

  //my task end


  async logout() {
    this.popoverController.dismiss();
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Are you sure to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            var todo = {
              uid: localStorage.getItem("LinkususerID"),
              backclick: true
            }
            this.socket.emit('recentmessgae', todo);

            if (localStorage.getItem("LinkususerID") != null) {
              this.BuddyChatProvider.updatemystatus(localStorage.getItem("LinkususerID"), "offline", new Date().getTime(), this.networkProvider.DeviceId);
            }

            localStorage.clear();
            this.Storage.remove("userLoginInfo")
            this.Storage.remove("USER_INFO")
            this.navCtrl.navigateRoot("/login");
          }
        }
      ]
    });

    await alert.present();

  }

  //start my calendar
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  goback() {
    this.navCtrl.navigateRoot('/home');
  }

  getmyevents() {
    var data = {
      myno: localStorage.getItem('LinkususerID')
    }
    this.service.PostRequest(this.service.mainAPI + '/getmyevents', data).then(res => {
      console.log(res);
      this.myeventres = res;
      for (let i = 0; i < this.myeventres.length; i++) {
        var getstarttime = new Date(this.myeventres[i].starttime);
        var event = {
          title: this.myeventres[i].title,
          startTime: new Date(this.myeventres[i].starttime),
          endTime: new Date(this.myeventres[i].endtime),
          // allDay: this.event.allDay,
          desc: this.myeventres[i].description,
          eventkey: this.myeventres[i].eventkey,
        }
        this.eventSource.push(event);
        this.myCal.loadEvents();
      }
      console.log(this.eventSource);
      // this.eventSource = this.myeventres;
      // this.myCal.loadEvents();
    }, err => {
      console.log(err);
    })
  }

  getStarredMessage() {

    var obj = {
      "myfavourite": "1",
      "uid": localStorage.getItem('LinkususerID')

    }
    this.service.PostRequest(this.service.mainAPI + '/getMyfavouriteChats', obj).then(res => {
      console.log('GetRequest' + JSON.stringify(res));
      this.showloading = false;
      this.favouritechat = res;
      this.favouritechat.forEach(element => {
        var myfavouritedata = 0;
        if (element.myfavourite == "1" && element.sentby == localStorage.getItem('LinkususerID')) {
          myfavouritedata = element.myfavourite;
        }
        else if ((element.sentby != localStorage.getItem('LinkususerID') && element.buddyfavourite == "1")) {
          myfavouritedata = element.buddyfavourite;
        }
        if (myfavouritedata == 1) {
          var name;
          if (element.sentby != localStorage.getItem('LinkususerID')) {
            name = element.sentby;
          }
          else {
            name = element.sentto;
          }
          var data = {
            mobile: name
          }
          this.service.PostRequest(this.service.mainAPI + '/getUserInfo', data).then(res => {
            console.log('getUserInfo : ' + JSON.stringify(res));
            var username;
            if (element.sentby != localStorage.getItem('LinkususerID')) {
              username = res[0].username;
            }
            else if (element.sentto != localStorage.getItem('LinkususerID')) {
              username = res[0].username;
            }
            else {
              username = 'You';
            }

            var array = {
              message: this.service.decryptText(element.message),
              sentby: element.sentby,
              username: username,
              message_id: element.message_id,
              timestamp: element.timestamp,
              sentto: element.sentto,
              buddyid: element.buddyid,
              username1: name,
              buddyImage: element.buddyImage,
              location: element.location,
              latitude: element.latitude,
              status: "1",
              channel: "android",
              fileextension: element.fileextension,
              filetype: element.filetype,
              tagmessage: this.service.encryptText(element.tagmessage),
              tagfileextension: element.tagfileextension,
              tagtime: element.tagtime,
              tagfiletype: element.tagfiletype,
              forwardmsg: element.forwardmsg,
              livelocation: element.livelocation,

              showMore: false,

            }
            this.starredallmessages.push(array);
          });



        }
        // else if((element.sentby != localStorage.getItem('LinkususerID') && element.buddyfavourite=="1" ))
        // {
        //   var array1 = {
        //     message: this.service.encryptText(element.message),
        //     sentby: element.sentby,
        //     message_id: element.message_id,
        //     timestamp: element.timestamp,
        //     sentto: element.sentto,
        //     buddyid: element,
        //     username: element.buddyid,
        //     buddyImage: element.buddyImage,
        //     location: false,
        //     latitude: false,
        //     status: "1",
        //     channel: "android",
        //     fileextension: element.fileextension,
        //     filetype: element.filetype,
        //     tagmessage: this.service.encryptText(element.tagmessage),
        //     tagfileextension: element.tagfileextension,
        //     tagtime: element.tagtime,
        //     tagfiletype: element.tagfiletype,
        //     forwardmsg: element.forwardmsg,
        //     livelocation: element.livelocation,
        //     selected: false,
        //     // attachtext:this.service.encryptText(null),
        //     selectedColor: "none",
        //     showMore: false,
        //     favourite:null,
        //   }
        //   this.allmessages.push(array1);
        // }

      });

    }, err => {
      console.log(err);

    })
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-") + " " + this.tConv24(date.getHours() + ":" + date.getMinutes());
  }
  tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    var hour = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = hour + ts.substr(2, 3) + ampm;
    return ts;
  }

  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    var data = {
      title: this.event.title,
      eventkey: localStorage.getItem('LinkususerID') + "_" + new Date().getTime(),
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      desc: this.event.desc,
      createdby: localStorage.getItem('LinkususerID'),
      createdby_name: localStorage.getItem('name')
    }

    this.service.PostRequest(this.service.mainAPI + '/add_event', data).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
      if (err.error.text == "insert successfully") {
        this.service.presentToast("New Event Added Successfully!")
      }
    })

    this.eventSource.push(eventCopy);
    console.log(this.eventSource);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    console.log("onEventSelected " + JSON.stringify(event));

    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'M/d/yy, h:mm a', this.locale);
    let end = formatDate(event.endTime, 'M/d/yy, h:mm a', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      cssClass: 'my-custom-class',
      message: 'From: ' + start + '<br>To: ' + end,
      buttons: [
        {
          text: 'share invite',
          cssClass: 'disablebtn',
          handler: () => {
            //   $(".disablebtn").css("pointer-events",'none');

            $(".disablebtn").prop("disabled", true);
            // alert.present();
            this.opencontacts(event);
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    alert.present();
  }

  async opencontacts(data) {
    const modal = await this.modalController.create({
      component: ContactlistPage,
      componentProps: data
    });

    modal.onDidDismiss().then((dataReturned) => {
      this.loadingCtrl.dismiss();
    });

    return await modal.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
  //end my calendar

  //My shelf start
  searchusershelf(searchbar) {
    //this.filteredusers = ;
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {

      this.getmyfiles();
      return;
    }

    this.sent_files = this.sent_files.filter((v) => {
      if (v.fileextension.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {
        return false;
      }
    })
    this.received_files = this.received_files.filter((v) => {
      if (v.fileextension.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {
        return false;
      }
    })

  }
  onCancelshelf(event) {
    console.log('CANCEL', event);
    this.getmyfiles();
  }


  getmyfiles() {
    this.sent_files = [];
    this.received_files = [];
    var new_sent = [];
    var new_received = [];
    var data = {
      mobile: localStorage.getItem('LinkususerID')
    }
    this.service.PostRequest(this.service.mainAPI + '/get_myfiles', data).then(res => {
      console.log(res);
      this.files = res;


      this.files.forEach(element => {
        try {
          element.message = this.service.decryptText(element.message);
        } catch (err) {

        }
        if (element.sentby == localStorage.getItem('LinkususerID')) {
          this.sent_files.push(element);
        }
        if (element.sentto == localStorage.getItem('LinkususerID')) {
          this.received_files.push(element);
        }

      });
      console.log(this.received_files);
      console.log(this.sent_files);

      this.sent_files.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });
      this.received_files.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });

      this.sent_files.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });
    }, err => {
      console.log(err);
      if (err.error.text == "no data found") {
        this.nofiles = true;
      }
    })
  }

  async opencontact(data) {
    const modal = await this.modalController.create({
      component: ContactlistPage,
      componentProps: {
        filedata: data,
        share_event: "file"
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      this.loadingCtrl.dismiss();
    });
    return await modal.present();
  }

  async openaction(data) {

    if (data.filetype == 'jpg' || data.filetype == 'png' || data.filetype == 'bmp' || data.filetype == 'image') {
      const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [
          {

            text: 'Share',
            icon: 'share',
            handler: () => {
              this.opencontact(data);

            }
          },
          {

            text: 'View',
            icon: 'eye-outline',

            handler: () => {
              var obj = {
                photourl: data.message,
                noarrow: 1,

              }
              //this.photoViewer.show(file);
              window.open(data.message, '_blank');
            }
          },
          {

            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }

          },

        ]
      }).then(actionsheet => {
        actionsheet.present();
      });
    }
    else {

      const actionSheet = await this.actionSheetController.create({
        cssClass: 'my-custom-class',
        buttons: [
          {

            text: 'Share',
            icon: 'share',
            handler: () => {
              this.opencontact(data);

            }
          },
          {

            text: 'View',
            icon: 'eye-outline',

            handler: () => {

              window.open(data.message, '_blank');
            }
          },
          {

            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }

          },

        ]
      }).then(actionsheet => {
        actionsheet.present();
      });
    }
  }
  //end My shelf

  //start My MoM
  remove_app(i) {
    this.employee_details.splice(i, 1);
    console.log(this.employee_details);
  }

  add_employee() {
    this.employee_details.push({
      'name': '',
      'task': '',
      'deadline': ''
    });
  }
  async momopencontacts() {
    var data = {
      event: 'mom',
      attendees: this.attendes
    }
    const modal = await this.modalController.create({
      component: ContactlistPage,
      componentProps: data
    });

    modal.onDidDismiss().then((recvdata) => {
      this.loadingCtrl.dismiss();
      console.log(recvdata);
      this.attendes = recvdata.data;
      if (this.attendes.length != 0) {
        this.tot_attendes = '';
        for (let i = 0; i < this.attendes.length; i++) {
          if (this.attendes[i].username != undefined) {
            this.tot_attendes += this.attendes[i].username + ', '
          }
          else {
            this.tot_attendes += this.attendes[i].groupname + ', '
          }

        }
      } else {
        this.tot_attendes = '';
      }
    });

    return await modal.present();
  }
  async momopencontacts1() {
    var data = {
      event: 'mom',
      attendees: this.attendes
    }
    console.log("momopencontacts1 :" + this.attendes)
    const modal = await this.modalController.create({
      component: ContactlistPage,
      componentProps: data
    });

    modal.onDidDismiss().then((recvdata) => {
      this.loadingCtrl.dismiss();
      console.log(recvdata);
      this.attendes1 = recvdata.data;
      console.log("momopencontacts2 :" + this.attendes1.length)

      if (this.attendes1.length != 0) {
        this.calledby = '';
        for (let i = 0; i < this.attendes1.length; i++) {
          if (this.attendes1[i].username != undefined) {
            this.calledby += this.attendes1[i].username + ', '
          }
          else {
            this.calledby += this.attendes1[i].groupname + ', '
          }
        }
      } else {
        this.calledby = '';
      }
    });

    return await modal.present();
  }

  async momsave() {

    for (let i = 0; i < this.employee_details.length; i++) {
      if (this.employee_details[i].name != '' || this.employee_details[i].task != '' || this.employee_details[i].deadline != '') {
        this.mom_msg += '<b>' + this.employee_details[i].name + '</b><br/>Task: <br/>' + this.employee_details[i].task + '<br>Deadline: </br>' + formatDate(this.employee_details[i].deadline, 'd/M/yy, h:mm a', this.locale) + '<br><br>'
      } else {
        this.service.presentToast("Please fill employee task details!");
      }
    }
    // if(this.attendes.length!=0){
    //   for(let i =0;i<this.attendes.length;i++){
    //     this.tot_attendes += this.attendes[i].username+','
    //   }
    // }else{
    //   this.service.presentToast("Please select attendees of the Meeting!");
    // }
    console.log("called: " + this.calledby, "agenda: " + this.agenda, "totattendes: " + this.tot_attendes, "discussion: " + this.discussion, "conclusion: " + this.conclusion, "mom_msg: " + this.mom_msg);

    if (this.calledby != undefined && this.agenda != undefined && this.tot_attendes != '' && this.discussion != undefined && this.conclusion != undefined && this.mom_msg != '') {
      this.groupmom = '<b>Called By:</b> ' + this.calledby + '<br/><br/><b>Agenda:</b> ' + this.agenda + '<br/><br/><b>Attendees:</b> ' + this.tot_attendes + '<br/><br/><b>Discussion:</b> ' + this.discussion + '<br/><br/><b>Conclusion:</b> ' + this.conclusion + '<br/><br/><b>Action Plan:</b><br/> ' + this.mom_msg;
      var data = {
        message: this.groupmom
      }

      const model = await this.modalController.create({
        component: GrouplistPage,
        componentProps: {
          msg: this.groupmom

        }
      });

      model.present();
      model.onDidDismiss().then(data => {
        this.mompage = false;
        this.buddies = true;
      });

      console.log(data);
    } else {
      this.service.presentToast("Please provide all necessary details");
    }


  }

  getallcontacts() {
    this.contacts = [];
    // this.presentLoadingWithOptions()
    var data = {
      compid: this.compid
    }
    this.service.PostRequest(this.service.mainAPI + '/getUserMstComp', data).then(res => {
      if (res['status'] != 0) {
        console.log(res);
        this.contact_res = res;
        this.contact_res.sort((a, b) => a.username.localeCompare(b.username))
        this.contact_res.forEach(element => {
          if (element.mobile != this.my_no) {
            this.contacts.push(element);
          }
          this.contacts.sort((a, b) => a.username.localeCompare(b.username))
        });
        this.loadingdismiss();
      }
    }, err => {
      this.loadingdismiss();

      console.log(err);
    })
  }
  //End My Mom


  //Upcoming events
  getusers() {
    // this.presentToast()
    this.showloading = true;
    var data = {
      compid: this.compid
    }
    this.service.PostRequest(this.service.mainAPI + '/getUserMstComp', data).then(res => {
      if (res['status'] != 0) {
        this.showloading = false;
        // console.log(res);
        this.loadingdismiss()
        this.contacts1 = res;
        this.contacts1.forEach(element => {
          if (element.username != "undefined" && element.dob != undefined) {
            this.mycontacts.push(element);
          }
          if (element.mobile != this.me && element.dob && new Date(element.dob).getDate() == new Date().getDate() && new Date(element.dob).getMonth() == new Date().getMonth()) {
            element.bday = true;
            this.bdaynotify(element.username);
          }
          for (let i = 0; i < 7; i++) {
            if (new Date(new Date(element.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getDate() == new Date().getDate() && new Date(new Date(element.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getMonth() == new Date().getMonth()) {
              element.advbday = true;
              element.color = 'green'
            }
            else if (new Date(new Date(element.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getDate() == new Date().getDate() && new Date(new Date(element.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getMonth() == new Date().getMonth()) {
              element.belatedbday = true;
              element.color = 'red'
            }
          }
        });
        console.log(this.mycontacts);
        this.sortedcontacts = this.mycontacts.sort((a, b) => {
          var adate = new Date(a.dob).getTime();
          var bdate = new Date(b.dob).getTime();
          console.log(adate, bdate)
          return adate - bdate;
        })
        console.log(this.sortedcontacts);
      }
    }, err => {
      console.log(err);
      //  this.loadingdismiss()

    })
  }

  searchuserbirthday(searchbar) {
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
  onCancelbirthday(event) {
    this.mycontacts = [];

    this.getusers();
  }
  bdaynotify(name) {
    this.localNotifications.schedule({
      title: "BirthDay Remainder",
      text: "It's " + name + " Birthday Today!",
      trigger: { in: 2, unit: ELocalNotificationTriggerUnit.HOUR, count: 3 }
    })
  }

  async sendwishes(buddy) {
    console.log(buddy);
    if (buddy.bday && buddy.bday == true) {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Birthday!',
        subHeader: 'Share your Wishes to ' + buddy.username + ' on this Special Day !',
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

              if (data.wishes == undefined || data.wishes == '' || data.wishes.trim() == '') {
                this.service.presentToast("Please Enter Your Wishes")
              }
              else {

                console.log(data);
                var sendata = new Date();

                var array2 = {
                  message: this.ApiserviceService.encryptText(data.wishes),
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
                  channel: "web",
                  fileextension: '',
                  tagmessage: this.ApiserviceService.encryptText(''),
                  tagfileextension: '',
                  tagfiletype: '',
                  attachtext: this.ApiserviceService.encryptText(null),
                  tagtime: '',
                  Taskfrom: '',
                  Taskto: '',
                  chatType: "1",
                  selfdestruct: "false"  //For Self Destruct message
                }
                // if (this.platform.is('android')) {

                //   this.buddychatService.insertRecords(array, status).then(res => {
                //   })
                // }
                // online data insert
                this.BuddyChatProvider.createMessage(array2, "1").then(res => {
                  console.log(res);
                  if (this.networkProvider.CurrentStatus == true) {
                    // this.buddychatService.updateMsgstatus(this.message_id, this.message_id1);
                  }
                }, err => {
                  console.log(err);
                });
                this.service.presentToast("Wishes Sent")
              }
            }
          }
        ]
      });

      await alert.present();

    } else {

      for (let i = 0; i < 7; i++) {
        if (new Date(new Date(buddy.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getDate() == new Date().getDate() && new Date(new Date(buddy.dob).getTime() - (i * 24 * 60 * 60 * 1000)).getMonth() == new Date().getMonth()) {
          console.log("Advance wishes");
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Advance Wishes!',
            subHeader: 'Share your Wishes to ' + buddy.username + ' in Advance!',
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
                    message: this.ApiserviceService.encryptText(data.wishes),
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
                    attachtext: this.ApiserviceService.encryptText(null),
                    fileextension: '',
                    tagmessage: this.ApiserviceService.encryptText(''),
                    tagfileextension: '',
                    tagfiletype: '',
                    tagtime: '',
                    Taskfrom: '',
                    channel: "web",
                    Taskto: '',
                    chatType: "1",
                    selfdestruct: "false"  //For Self Destruct message
                  }
                  // if (this.platform.is('android')) {

                  //   this.buddychatService.insertRecords(array, status).then(res => {
                  //   })
                  // }
                  // online data insert
                  this.BuddyChatProvider.createMessage(array, "1").then(res => {
                    console.log(res);
                    if (this.networkProvider.CurrentStatus == true) {
                      // this.buddychatService.updateMsgstatus(this.message_id, this.message_id1);
                    }
                  }, err => {
                    console.log(err);
                  });
                  this.service.presentToast("Wishes Sent")
                }
              }
            ]
          });

          await alert.present();
        } else if (new Date(new Date(buddy.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getDate() == new Date().getDate() && new Date(new Date(buddy.dob).getTime() + (i * 24 * 60 * 60 * 1000)).getMonth() == new Date().getMonth()) {
          console.log("Belated wishes");
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Forgot to Wish?',
            subHeader: 'Share your Belated Wishes to ' + buddy.username + ' now!',
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
                    message: this.ApiserviceService.encryptText(data.wishes),
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
                    attachtext: this.ApiserviceService.encryptText(null),
                    tagmessage: this.ApiserviceService.encryptText(''),
                    tagfileextension: '',
                    tagfiletype: '',
                    tagtime: '',
                    channel: "web",
                    Taskfrom: '',
                    Taskto: '',
                    chatType: "1",
                    selfdestruct: "false"  //For Self Destruct message
                  }
                  // if (this.platform.is('android')) {

                  //   this.buddychatService.insertRecords(array, status).then(res => {
                  //   })
                  // }
                  // online data insert
                  this.BuddyChatProvider.createMessage(array, "1").then(res => {
                    console.log(res);
                    if (this.networkProvider.CurrentStatus == true) {
                      // this.buddychatService.updateMsgstatus(this.message_id, this.message_id1);
                    }
                  }, err => {
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
  //end upcoming events

  //project milestone start
  remove_milestone(i) {
    this.milestones.splice(i, 1);
    console.log(this.milestones);
  }
  add_milestone() {
    if (this.projectname == undefined || this.projectid == undefined) {
      this.service.presentToast("Project Name or Project ID cannot be Empty!")
    } else {
      this.milestones.push({
        'text': '',
        'startdate': '',
        'deadline': '',
        'description': ''
      });
    }
  }

  submit() {
    console.log(this.milestones);
    console.log(this.projectname, this.projectid, this.milestones);
    if (this.projectname == undefined || this.projectid == undefined) {
      this.service.presentToast("Project Name or Project ID cannot be Empty!")
    } else if (this.milestones.length > 0) {
      var count = 0;
      for (let i = 0; i < this.milestones.length; i++) {

        if (this.milestones[i].text == "" || this.milestones[i].deadline == "" || this.milestones[i].startdate == "") {
          count++;
          console.log(count);
        }
        console.log(count);
        if (count > 0) {
          this.service.presentToast("Please fill all Milestone details!")
        }
      }
      console.log(count);
      if (count == 0) {
        for (let i = 0; i < this.milestones.length; i++) {
          var data = {
            projectname: this.projectname,
            milestone: this.milestones[i].text,
            startdate: this.milestones[i].startdate,
            duedate: this.milestones[i].deadline,
            description: this.milestones[i].description,
            projectid: this.projectid,
            status: "1"
          }
          this.service.PostRequest(this.service.mainAPI + '/add_milestone', data).then(res => {
            console.log(res);

          }, err => {
            console.log(err);
            if (err.error.text == "insert successfully") {
              this.request++;
              console.log(this.request);
              if (this.milestones.length == this.request) {
                this.service.presentToast("New Milestones are added for the Project : " + this.projectname);
                this.milestones = [{
                  'text': '',
                  'startdate': '',
                  'deadline': ''
                }];
                this.projectname = '';
                this.projectid = '';
                this.getprojects();
                this.getprojectstat('');
              }
            }
          })
          console.log(this.request);
        }
      }
    }

    this.request = 0;
  }

  getprojects() {
    this.service.GetRequest(this.service.mainAPI + '/get_allproject').then(res => {
      console.log(res);
      this.allprojects = res;
    }, err => {
      console.log(err);
    })
  }
  getprojectstat(projecid) {
    var count = 0;
    console.log("this.project :" + this.project)
    var data = {
      projectid: projecid
    }
    this.service.PostRequest(this.service.mainAPI + '/get_projectstatus', data).then(res => {
      console.log(res);
      this.projectstat = res;
      this.projectstat.forEach(element => {

        var date1, date2;
        date1 = new Date(element.startdate);
        date2 = new Date(element.duedate);
        // get total seconds between two dates
        var res = Math.abs(date1 - date2) / 1000;
        var days = Math.floor(res / 86400);
        element.Difference_In_Days = days
        element.startdate1 = this.convert(new Date(element.startdate))
        element.duedate1 = this.convert(new Date(element.duedate))
        if (element.status == "2") {
          count++
        }
      });
      this.progress1 = Number((count / this.projectstat.length).toFixed(2));
      console.log(this.progress);
    }, err => {
      console.log(err);
    })
  }


  changestat(project, val) {
    if (val == "1" || val == "0") {
      var data = {
        completedate: '',
        projectid: project.projectid,
        duedate: project.duedate,
        status: val
      }
      this.service.PostRequest(this.service.mainAPI + '/upd_projectstatus', data).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
        if (err.error.text == "update successfully") {
          this.service.presentToast("Status Updated Successfully!");
          this.getprojects();
          this.getprojectstat('');

        }
      })
    }
    if (val == "2") {
      var data1 = {
        completedate: new Date().getTime(),
        projectid: project.projectid,
        duedate: project.duedate,
        status: val
      }
      this.service.PostRequest(this.service.mainAPI + '/upd_projectstatus', data1).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
        if (err.error.text == "update successfully") {
          this.service.presentToast("Status Updated Successfully!");
          this.getprojects();
          this.getprojectstat('');
        }
      })
    }


  }
  showstatus(i) {
    if (this.statusview[i] == false) {
      this.statusview[i] = true;
    } else {
      this.statusview[i] = false;
    }

  }
  closestat(i) {
    console.log(i);
    this.statusview[i] = false;
  }

  toggle_create() {
    this.tcreate = true;

  }

  toggle_view() {
    this.tcreate = false;
    this.project = ''
    this.projectstat = []
    this.allprojects = [];
    this.getprojects();
    this.getprojectstat('');

  }
  //project milestone end

  async changepassword() {
    const model = await this.modalController.create({
      component: ChangepwdPage,
      cssClass: 'popupmodal',
      componentProps: {

        //locationValue: locationValue,

      }
    });

    model.present();
    model.onWillDismiss().then(data => {

    });
  }


  async customize() {
    const model = await this.modalController.create({
      component: CustomizeComponent,
      componentProps: {
        //locationValue: locationValue,

      }
    });

    model.present();
    model.onWillDismiss().then(data => {

    });
  }
  profileUpdate(profileInfo) {
    this.LoginProvider.updateProfileDetails(profileInfo, localStorage.getItem("LinkususerID")).then(res => {

    });
  }
  setFocusOnInput() {
    this.ionInput.setFocus();
  }
  filteritems(searchbar) {

    var q = searchbar.target.value;

    this.allmessages = this.allmessages.filter((v) => {
      if (v.message.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {

        return false;

      }
    })

    if (q.length == 0) {
      this.getchat(this.scrollValue);
      this.setFocusOnInput()
    }
  }
  setFocusOnInput1() {
    this.ionInput1.setFocus();
  }
  filteritems1(searchbar) {

    var q = searchbar.target.value;

    this.allgroupmsgs = this.allgroupmsgs.filter((v) => {
      if (v.message.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {

        return false;

      }
    })
    if (q.length == 0) {
      this.getchat(this.scrollValue);
      this.setFocusOnInput1()
    }
  }
}

