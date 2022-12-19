import { Component, ViewChild, OnInit, NgZone, HostListener, ElementRef, ChangeDetectorRef, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { MenuController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { formatDate } from '@angular/common';

import { PopoverController, ToastController, NavController, ModalController, ActionSheetController, AlertController, Platform, LoadingController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { AssigntaskPage } from '../assigntask/assigntask.page';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';

import { IonBackButtonDelegate } from '@ionic/angular';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';


import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { NetworkService } from "../network.service";
import { Network } from '@ionic-native/network/ngx'


import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';


import { FileOpener } from '@ionic-native/file-opener/ngx';

import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { File } from '@ionic-native/file/ngx';

declare var cordova: any;
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { JsonPipe } from '@angular/common';

import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";

declare var MediaRecorder: any;
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DoubleTapDirective } from '../directives/double-tap.directive';


import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

import { GooglelocationPage } from "../googlelocation/googlelocation.page";
import { SearchFilterPage } from "../search-filter/search-filter.page";
import { HttpClient } from '@angular/common/http/';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventsService } from "../events.service";
import { BuddymenuComponent } from "../buddymenu/buddymenu.component";


import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { VideoPage } from "../video/video.page";
import { VideocallPage } from "../videocall/videocall.page";
import { async } from '@angular/core/testing';
import { isNgTemplate } from '@angular/compiler';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
declare var $;
@Component({
  selector: 'app-buddychat-room',
  templateUrl: './buddychat-room.page.html',
  styleUrls: ['./buddychat-room.page.scss'],
})
export class BuddychatRoomPage implements OnInit {
  @ViewChild(IonBackButtonDelegate, { static: false }) backButton: IonBackButtonDelegate;

  @ViewChild('content') private content: any;
  buddydetails: any;
  tarea_size: any = 3;
  tarea_size_min: any = 1;
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

  session;
  webRTCClient;
  incomingCallId = 0;
  myCallId;
  status;
  calleeId;
  myTimerInterval: any;
  slideBoolean: boolean = false;
  datacheckflag: boolean = true;
  
  groupmembers: any;
  
  showEmojiPicker = false;
  

  webFileUploadname: any;
  webFileUploadFileType: any;

  mediaRecordFlag: boolean = false;
  mediaRecorder;
  
  private win: any = window;
  localfileName: any;
  FileBase64: any;
  Uid: any;
  
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

  
  protected interval: any;

  sendRecord: any;

  
  
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
  showpop: any;
  titleStyle: any;

  mapshowpop: any;
  maptitleStyle: any;
  gteMapLatLong: any;
  buddyinfo: any;
  selfId: any;
  selfRev: any;
  callid: any;
  callName: any;
  
  pageAlive: boolean = false;
  getMap = 'https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyD_Lmybdnx6s2TjMvPK57fD44xGjjJPA8A&'
  
  
  
  
  
  
  
  taskmessageto;
  taskmessagefrom;
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true 
  }

  
  
  PERMISSION = {
    WRITE_EXTERNAL: this.diagnostic.permission.WRITE_EXTERNAL_STORAGE,
    READ_EXTERNAL: this.diagnostic.permission.READ_EXTERNAL_STORAGE,
    CAMERA: this.diagnostic.permission.CAMERA
  };

  LocationPERMISSION = {
    ACCESS_COARSE_LOCATION: this.diagnostic.permission.ACCESS_COARSE_LOCATION,
  };
  
  

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
  @ViewChild('chat_input') chat_input: ElementRef;
  private selecteItem: string;
  textIndex: string;
  subscription: Subscription;
  self_destruct: boolean = false;
  imageLink: any;
  temp_disable: boolean = false;
  constructor(private crop: Crop, private Base64: Base64, private cd: ChangeDetectorRef, private speechRecognition: SpeechRecognition, @Inject(LOCALE_ID) private locale: string, private nativeAudio: NativeAudio, private network: Network,private popoverController: PopoverController, private actionSheet: ActionSheetController, private photoViewer: PhotoViewer, private geolocation: Geolocation, private menu: MenuController, private fileOpener: FileOpener, private FileTransfer: FileTransfer, public ImagePicker: ImagePicker, private events: EventsService, private media: Media, private ImghandlerProvider: ImghandlerProvider, private filepath: FilePath, private http: HttpClient, private loadingCtrl: LoadingController, private file: File, private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy, private BuddyChatProvider: BuddyChatProvider, private platform: Platform, private networkProvider: NetworkService, private camera: Camera, private diagnostic: Diagnostic, public sanitizer: DomSanitizer, public activatedRoute: ActivatedRoute, private socket: Socket, private toastCtrl: ToastController, private service: ApiserviceService, public navCtrl: NavController, public modalController: ModalController, public alertController: AlertController, private localNotifications: LocalNotifications) {
    

    
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('backButton Handler was called!');

      var todo = {
        uid: this.Uid,
        backclick: true
      }
      this.socket.emit('recentmessgae', todo);

      
      this.navCtrl.navigateRoot(['/home'])

    })
    this.BuddyTyping = false;
    if (localStorage.getItem('theme') == 'day') {
      this.imageLink = '../../assets/imgs/chatBackground.png'
    }
    if (localStorage.getItem('theme') == 'night') {
      this.imageLink = '../../assets/imgs/chatbg1.jpg'
    }
    console.log(this.BuddyChatProvider.buddy);
    this.Uid = localStorage.getItem("FlintauserID").toString();
    this.currentUser = localStorage.getItem("FlintauserID").toString();
    this.buddydetails = this.BuddyChatProvider.buddy;
    this.buddy = this.BuddyChatProvider.buddy;
    this.buddyinfo = this.buddydetails;
    this.showEmojiPicker = false;
    this.pageAlive = true;

    this.callid = 0;
    this.callName = 0;

    this.message_id = localStorage.getItem('mobile') + '_' + this.buddydetails.mobile;
    this.message_id1 = this.buddydetails.mobile + '_' + localStorage.getItem('mobile');
    console.log("this.buddydetails :" + JSON.stringify(this.buddydetails))

    var myinfo = {
      "username": localStorage.getItem("username"),
      "mobile": localStorage.getItem("FlintauserID"),
    }

    
    
    
    
    
    
    

    this.groupmembers = [];
    this.groupmembers.push(myinfo);


    this.networkProvider.initializeNetworkEvents();
    this.showEmojiPicker = false;
    

    


    console.log("this.buddyinfo", this.buddyinfo)

    this.tempMsg = '';


    if (this.platform.is('android') || this.platform.is('ios')) {
      this.mobileicon = true;
    }
    this.showpop = 'false'
    this.mapshowpop = 'false'

    this.allmessages = [];
    this.tempArrayList = [];
    
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
        
        this.message = this.tempMsg + ' ' + text["emojis:created"];
        this.tempMsg = this.message;

      }
    })
    this.Receive();

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

    
    this.speechRecognition.getSupportedLanguages()
      .then(
        (languages: string[]) => console.log(languages),
        (error) => console.log(error)
      )


  }

  getHtmlText(text) {
    return this.sanitizer.bypassSecurityTrustHtml(text)
  }
  speechTotext() {
    
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission))

    
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
      this.message = matches[0].toString(); 
      this.speechRecognition.stopListening()
      this.sendMessage() 

      this.cd.detectChanges();
    });

  }

  searchshow() {
    this.searchinput = true;
    this.tempArrayList = [];
    this.tempArrayList = this.allmessages;
    console.log("this.tempArrayList :" + this.tempArrayList.length)

  }

  onCancel(event) {
    this.searchinput = false;
    this.scrollValue = 10;
    this.getchat(this.scrollValue)
  }
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
          
          
          return v.message.replace(matchingString, '<span style="color:red">' + matchingString + '</span>')
        }
      });
    }
  }
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
  ZoomFile(file) {
    var obj = {
      src: file,
      images: this.allmessages,
    }
    
    this.navCtrl.navigateForward('zoom', {
      queryParams: obj,
    })
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

  openLocation(val) {

    if (val == 0) {
      window.open('https://google.com/maps/?q=' + this.gteMapLatLong, '_system');
    }
    else {
      this.platform.ready().then(() => {

        this.geolocation.getCurrentPosition().then((position) => {

          if (this.platform.is('ios') || this.platform.is('android')) {
            
            if (this.platform.is('ios')) {
              window.open('maps://?q=' + "Shared location" + '&daddr=' + this.gteMapLatLong, '_system');
            };
            
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
  deleteFunction() {
    
    var deleteArray = [];
    this.allmessages.forEach(element => {
      if (element.selected == true) {
        deleteArray.push(element)
      }
    });
    console.log("deleteArray :" + deleteArray.length)
    this.BuddyChatProvider.deleteMessage(deleteArray).then(res => {
      
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
    this.allmessages.forEach(element => {
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
      "flag": "single",
      "buddyInfo": this.buddydetails
    }

    this.navCtrl.navigateForward('groupcreation', {
      queryParams: obj,
    })
  }
  forwardSelection(selectedValue, item) {


    console.log("forwardSelection :" + selectedValue + ":" + JSON.stringify(item))
    this.allmessages.forEach(element => {


      if (element.timestamp == item.timestamp && selectedValue == true) {
        console.log("forwardSelection 1:" + selectedValue + ":" + JSON.stringify(item))

        
        element.selectedColor = "rgb(0 150 136 / 8%)"
      }
      else if (element.timestamp == item.timestamp && selectedValue == false) {
        console.log("forwardSelection 2:" + selectedValue + ":" + JSON.stringify(item))

        
        element.selectedColor = "transparent"
      }
    });
    console.log("forwardClick :" + this.forwardClick)
    if (this.arrayAlreadyHasArray(this.allmessages) == true) {
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

  Receive() {

    
    this.socket.on('chatmessage', (msg) => {

      console.log(msg);
      
      if (msg.selfdestruct == "true" && msg.status == "1" && msg.sentto == this.Uid) {
        let rec_msg = msg.message;

        var matches = rec_msg.match(/[\w\d\’\'-]+/gi);
        
        console.log(matches.length);

        setTimeout(() => {
          const index = this.allmessages.indexOf(item);
          if (index > -1) {
            this.allmessages.splice(index, 1);
          }
        }, 462 * matches.length);
      }

      
      
      console.log("Receive chatmessage" + JSON.stringify(msg) + ":" + JSON.stringify(this.BuddyChatProvider.buddy))
      var item = {};
      
      if (this.pageAlive == true && (msg["message_id"] == this.Uid + "_" + this.buddy.mobile || msg["message_id"] == this.buddy.mobile + "_" + this.Uid)) {

        
        
        
        
        if (this.platform.is('android')) {

          if (msg["message_id"] == this.buddy.mobile + "_" + this.Uid) {
            
            
          }

        }
        
        if (msg["sentby"] == this.Uid && msg["messageid"] == null && msg["status"] == 2) {
          console.log("Receive chatmessage 111" + JSON.stringify(msg))

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
                
                var str = element.message.split(" by ");
                var description = str[0];
                element.message = str[1];
                
                var str = element.message.split(" to ");
                var start_time = str[0];
                var end_time = str[1];
                
                var data = {
                  title: title,
                  startTime: new Date(start_time).toISOString(),
                  endTime: new Date(end_time).toISOString(),
                  desc: description,
                  createdby: element.sentto,
                  
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
                

              }
            }

          });
          console.log("this.allmessages :" + JSON.stringify(this.allmessages))
          
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

          if (msg["sentby"] != this.Uid && msg["status"] != 2) {

            var item1 = {

              message: msg["message"],
              sentby: msg["sentby"],
              username: msg["username"],
              photourl: msg["photourl"],
              message_id: msg["message_id"],
              timestamp: msg["timestamp"],
              sentto: msg["sentto"],
              location: msg["location"],
              latitude: msg["latitude"],
              
              filetype: msg["filetype"],
              tagmessage: msg["tagmessage"],
              tagfileextension: msg["tagfileextension"],
              tagtime: msg["tagtime"],
              Tagsend: msg["Tagsend"],
              Tagto: msg["Tagto"],
              Date: msg["Date"],
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
            this.nativeAudio.play('receive', () => console.log('sent is done playing'));

            this.allmessages.push(item1);

            if (this.unreadCount != null) {
              this.unreadMessageShow();
            }


            var messageid = msg["message_id"];

            this.socket.emit('status_change', item1);

            this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
              console.log("status_change :" + JSON.stringify(res))
            })


            

            
            
            

            
            
            

            

            
            

            

            
            

            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            


            
            

            
            
            
            
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            

            
            
            
            

            
            

            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            


            
            

            
            
            
            
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            



            console.log("new message allmessages ::" + JSON.stringify(msg["message"]))
            console.log("new message allmessages ::" + JSON.stringify(this.allmessages))

            
            this.removeDups(this.allmessages);
            

            this.datewiseshow();
            this.scrollToBottomOnInit();
            
          }

        }



      }

    });


    this.socket.on('status_change', (msg) => {
      console.log("receive status_change :" + JSON.stringify(msg))

      if (msg.sentby == this.Uid && msg.status == "2" && msg.message_id == this.Uid + "_" + this.buddydetails.mobile) {
        this.allmessages.forEach(element => {
          
          element.status = "2"
          
        });
      }

    })


    this.socket.on('online_offline', (msg) => {
      console.log("receive online_offline :" + JSON.stringify(msg))
      if (msg.mobile == this.buddy.mobile) {
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

      if (msg.sender == this.buddydetails.mobile && msg.receiver == this.Uid && msg.typing == true) {
        this.BuddyTyping = true;
      }
      if (msg.sender == this.buddydetails.mobile && msg.receiver == this.Uid && msg.typing == false) {
        this.BuddyTyping = false;
      }
      console.log("BuddyTyping :" + this.BuddyTyping)

    })
    
    
    
    
    
    
    
    
    

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
            

            var item1 = {
              callid: this.callid,
              buddyid: this.Uid,
              myname: localStorage.getItem("username")
            }

            
            
            
            
            
            

            this.socket.emit('reject_call', item1);

          }
        },
        {
          text: "Accept",
          
          handler: () => {
            this.audioCall();
          }
        }]
    });
    
    
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
  closeModal() {
    this.menu.enable(false, 'first');
    
  }
  clickEVent() {
    
    
    

    

    
    
    
    

    

    

    this.menu.enable(true, 'first');
    this.menu.open('first');
    console.log("calick")
    
    

    
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
          
          if (element.uid == this.Uid && element.buddyid == this.buddydetails.mobile) {
            this.myblocked = true;
          }

        });
      }

    }, err => {
      console.log(err);

    })
  }
  clearunreadmessage() {
    var data = {
      uid: this.Uid,
      buddyid: this.buddydetails.mobile,
      message_id: this.buddydetails.mobile + "_" + this.Uid,
    }
    

    this.service.PostRequest(this.service.mainAPI + '/updateUnreadtcount', data).then(res => {
      this.loadingdismiss();
    }).catch(res=>{
      this.loadingdismiss();
    })

    
    
  }
  ionViewDidLeave() {
    this.loadingdismiss();
    
    
  }
  ngOnInit() {
    this.clearunreadmessage();

    var room = { sender: localStorage.getItem('mobile'), receiver: this.buddydetails.mobile };
    
    this.nativeAudio.preloadSimple('sent', 'assets/mp3/sent.mp3').then(res => {
    })

    this.nativeAudio.preloadSimple('receive', 'assets/mp3/receive.wav').then(res => {
    })

    this.scrollValue = 10;
    this.pageAlive = true;
    this.checkblocked();
    this.getchat(this.scrollValue);

    this.socket.connect();
    

    
    
    

    

    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
  }

  ionViewDidEnter() {
    
    console.log('ionViewDidEnter' + this.forwardFlag);
    this.setUIBackButtonAction();

    if (this.networkProvider.forwardFlow == true) {
      this.scrollValue = 10;
      this.getchat(this.scrollValue)
    }

  }

  setUIBackButtonAction() {
    this.backButton.onClick = () => {
      
      console.log("back lcik")
      var todo = {
        uid: this.Uid,
        backclick: true
      }
      this.socket.emit('recentmessgae', todo);

      
      this.navCtrl.navigateRoot(['/home'])
      
      
      
    };
  }
  scrollToBottomOnInit() {
    
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom(400);
      }
    }, 500);
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
      
      
      
      
    });

    return await modal.present();
    
    
    
  }


  getchat(scrollValue) {
    this.onlinedata(scrollValue);
  }
  getUsersList() {
    console.log("doRefresh")
    this.scrollValue = parseInt(this.scrollValue) + 10;
    this.getchat(this.scrollValue);
  }
  onlinedata(scrollValue) {
    this.presentLoadingWithOptions();

    var data = {
      message_id: this.message_id,
      message_id1: this.message_id1,
      limit: scrollValue
    }


    
    
    

    console.log("onlinedata called:" + this.networkProvider.CurrentStatus)
    if (this.networkProvider.CurrentStatus == true) {

      this.service.PostRequest(this.service.mainAPI + '/buddy_chatlist', data).then(res => {
        this.loadingdismiss();
        console.log(res);

        this.old_message = res;
        this.allmessages = [];



        this.old_message.forEach(async element => {


          

          

          

          if (element.sentby != this.Uid && element.status == "1") {
            this.unreadCount++;
          }
          console.log("this.unreadCount 1111111:" + this.unreadCount)

          var item = {
            createdAt: element.timestamp,
            filetype: element.filetype,
            msgtype: element.filetype,
            message: element.message,
            sentby: element.sentby,
            message_id: element.message_id,
            timestamp: element.timestamp,
            sentto: element.sentto,
            status: element.status,
            countStatus: element.status,
            fileextension: element.fileextension,
            tagmessage: element.tagmessage,
            tagfileextension: element.tagfileextension,
            tagfiletype: element.tagfiletype,
            tagtime: element.tagtime,
            unreadCount: this.unreadCount,
            livelocation: element.livelocation,
            forwardmsg: element.forwardmsg,
            selected: false,
            selectedColor: "none",
            showMore: false
          }

          this.allmessages.push(item);

          console.log('this.allmessages' + JSON.stringify(this.allmessages));

          if (element.selfdestruct == "true" && element.status == "2" && element.sentto == this.Uid) {
            let msg = element.message;

            var matches = msg.match(/[\w\d\’\'-]+/gi);
            
            console.log(matches.length);

            setTimeout(() => {
              const index = this.allmessages.indexOf(item);
              if (index > -1) {
                this.allmessages.splice(index, 1);
              }
            });
          }
          
          if (element.selfdestruct == "true" && element.status == "1" && element.sentto == this.Uid) {
            let msg = element.message;

            var matches = msg.match(/[\w\d\’\'-]+/gi);
            
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
            
            var str = element.message.split(" by ");
            var description = str[0];
            element.message = str[1];
            
            var str = element.message.split(" to ");
            var start_time = str[0];
            var end_time = str[1];
            
            var data = {
              title: title,
              startTime: new Date(start_time).toISOString(),
              endTime: new Date(end_time).toISOString(),
              desc: description,
              createdby: element.sentto,
              
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

          
          

          
          


        });
        if (this.platform.is('android')) {
          
          
          
          
          
          
          
          
          
          

          
          
          
          
          
          
          
          

          
          
          
        }
        this.BuddyChatProvider.updatechatmesage(this.buddyinfo.mobile + "_" + this.Uid).then(res => {
          console.log("updatechatmesage :" + JSON.stringify(res))
          this.loadingdismiss();

        }).catch(res=>{
          this.loadingdismiss();

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
        

        console.log("this.allmessages:" + JSON.stringify(this.allmessages));
      }, err => {
        this.loadingdismiss();
        console.log(err);
      })
    }
    else {
     
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

      if (value.status == "1") {
        value.status = "2"

        this.socket.emit('status_change', value);
      }

    });


  }
  convertDateFormat(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    return (dd + "-" + mm + "-" + yyyy);

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
  hidetext(msg) {
    if (msg.selfdestruct == "true" && msg.status == "2" && msg.sentto == this.Uid) {
      
      
      
      
      console.log("selfdestruct message");
      return false;
    } else {
      return true;
    }

  }
  send(msg) {
    console.log("Send item :" + JSON.stringify(msg))
    if (msg != '') {

      
      this.socket.emit('chatmessage', msg);
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
    if (this.message != undefined && this.message != '') {
      var status = "0";
      console.log("this.networkProvider.CurrentStatus :" + this.networkProvider.CurrentStatus)
      if (this.networkProvider.CurrentStatus == true) {
        status = "1";
      }
      console.log("status :" + status)
      let re = /\*/gi;



      console.log("check message:" + this.Textbold(this.message))
      var array1 = {
        buddyid: this.buddyinfo.mobile,
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
        tagmessage: this.tagmessage,
        tagfileextension: this.tagfileextension,
        tagfiletype: this.filetype,
        tagtime: this.tagtime,
        Taskfrom: '',
        Taskto: '',
        chatType: "1",
        forwardmsg: null,
        showMore: false,
        selfdestruct: this.self_destruct   

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
        attachtext:null,
        showMore: false,
        selfdestruct: this.self_destruct,  
      }
      console.log(array);
      this.allmessages.push(array);
      this.scrollToBottomOnInit();
      
      
      

      
      

      

      
      this.BuddyChatProvider.createMessage(array, "1").then(res => {
        if (this.networkProvider.CurrentStatus == true) {
          
        }
      });
      

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
      
      this.scrollToBottomOnInit();


    }

  }


  fileChangeEvent(fileInput: any) {
    console.log("fileChangeEvent ")

    
    if (fileInput.target.files && fileInput.target.files[0]) {
      
      const max_size = 1024;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      

      
      var FileSize = fileInput.target.files[0].size / 1024 / 1024;

      
      
      
      

      
      

      if (fileInput.target.files[0].type != 'image/png' && fileInput.target.files[0].type != 'image/PNG' &&
        fileInput.target.files[0].type != 'image/jpeg' && fileInput.target.files[0].type != 'image/JPEG'
        && fileInput.target.files[0].type != 'image/jpg' && fileInput.target.files[0].type != 'image/JPG') {
        

        $("#file").val('')
        
        

        return false;
      }

      
      
      

      
      
      
      
      
      


      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          


          if (img_height > max_height && img_width > max_width) {
            alert(
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px');
            return false;
          } else {

            
            

            

            const imgBase64Path = e.target.result;
            console.log("imgBase64Path :" + imgBase64Path)
            
            
            
            
            var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);
            var base64result = imgBase64Path.split(',')[1]

            var imagename = "HereAppCompanylogo" + imagecif + ".jpg";
            var profilepic = "data:image/jpeg;base64," + base64result;

            
            

            var file = this.dataURLtoFile(profilepic, imagename);

            
            const formData: any = new FormData();
            formData.append("upload", file, imagename);

            

            
            
            
            
            
            
            
            
            
            
            

            




            
            
            
            
            


            

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
                
                self.geolocation.getCurrentPosition().then((pos) => {

                  const location = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    time: new Date(),
                    sender: localStorage.getItem('FlintauserID'),
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

          }, 10000); 

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
          message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
          location: 'true',
          
          status: status,
          filetype: mapType,
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
          attachtext:null,
          showMore: false
        }


        console.log('array data' + JSON.stringify(array));
        this.send(array);
        
        
        
        


        this.allmessages.push(array);
        this.scrollToBottomOnInit();

        
        
        
        
        
        
        
        this.BuddyChatProvider.createMessage(array, "1").then(res => {
          if (this.networkProvider.CurrentStatus == true) {
            
          }
        });


        
        
        
        

      }
    });
  }
  fileshare() {

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.Camera).then(
      result => {
        if (result.hasPermission) {

          
          this.askToTurnOnGPSnew();
        } else {

          
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
        
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              
              this.askToTurnOnGPSnew();
            },
            error => {
              
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
        

        this.mobileLcoation("", "");

      },
      error => this.presentAlert('Please check your internet connection')
    );
  }

  addGallery() {
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


              
              if (this.networkProvider.CurrentStatus == false) {
                this.loadingdismiss();

                var status1 = "0";

                var array1 = {
                  message: file,
                  sentby: this.Uid,
                  message_id: profilepic,
                  timestamp: new Date().getTime(),
                  sentto: this.buddy.mobile,

                  buddyid: this.buddyinfo.mobile,
                  username: this.buddyinfo.username,
                  buddyImage: this.buddyinfo.photourl,

                  location: false,
                  latitude: false,
                  status: status1,
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
                  attachtext:null,
                  selfdestruct: this.self_destruct,   
                  selected: false,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false
                }

                this.allmessages.push(array1);
                this.scrollToBottomOnInit();
                if (this.platform.is('android')) {
                  
                  console.log("before sending :" + JSON.stringify(array1))
                  
                  

                  
                  this.BuddyChatProvider.createMessage(array1, "1").then(res => {
                    this.scrollToBottomOnInit();

                  });
                }
              }
              else {
                


                var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

                var imagename = "flinta" + imagecif + ".jpg";
                var profilepic = file;
                var file1 = this.dataURLtoFile(profilepic, imagename);
                var url = this.service.mainAPI + '/uploadflintaimage';
                const formData: any = new FormData();
                formData.append("upload", file1, imagename);

                this.http.post(url, formData)

                  .subscribe(
                    (value) => {
                      console.log("subscribe :" + JSON.stringify(value))
                      console.log("subscribe :" + this.service.ImagePath + imagename)
                      this.loadingdismiss();

                    },
                    
                    (err) => {
                      console.log("err :" + JSON.stringify(err))

                      console.log("error :" + this.service.ImagePath + imagename)

                      this.loadingdismiss();
                      var status = "0";
                      if (this.networkProvider.CurrentStatus == true) {
                        status = "1";
                      }
                      var array = {
                        message: this.service.ImagePath + imagename,
                        sentby: this.Uid,
                        message_id: this.Uid + "_" + this.buddy.mobile,
                        timestamp: new Date().getTime(),
                        sentto: this.buddy.mobile,

                        buddyid: this.buddyinfo.mobile,
                        username: this.buddyinfo.username,
                        buddyImage: this.buddyinfo.photourl,
                        attachtext:null,

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
                        selfdestruct: this.self_destruct,   
                        selected: false,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false
                      }


                      this.send(array)
                      this.allmessages.push(array);
                      this.scrollToBottomOnInit();

                      console.log("before send ahat")
                      

                      
                      
                      
                      
                      

                      this.BuddyChatProvider.createMessage(array, "1").then(res => {
                        this.scrollToBottomOnInit();
                        if (this.networkProvider.CurrentStatus == true) {
                          
                        }
                      });


                      
                      
                      console.log("galleryPicMsg 4")
                    })

              }



            })
          });
      }
    }, (err) => { this.loadingdismiss(); });

  }
  
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
      correctOrientation: true 
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log("sendPicCamera :" + imageData)
      

      this.crop.crop(imageData, { quality: 100 })
        .then(
          newImage => {

            this.Base64.encodeFile(newImage).then((base64File: string) => {
              var base64result = base64File.split(',')[1]
              console.log("base64File :" + base64result);


              var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

              var imagename = "flinta" + imagecif + ".jpg";
              var profilepic = "data:image/jpeg;base64," + base64result;
              var file = this.dataURLtoFile(profilepic, imagename);
              var url = this.service.mainAPI + '/uploadflintaimage';
              const formData: any = new FormData();
              formData.append("upload", file, imagename);


              
              if (this.networkProvider.CurrentStatus == false) {
                this.loadingdismiss();

                var status1 = "0";

                var array1 = {
                  message: profilepic,
                  sentby: this.Uid,
                  message_id: this.Uid + "_" + this.buddy.mobile,
                  timestamp: new Date().getTime(),
                  sentto: this.buddy.mobile,
                  buddyid: this.buddyinfo.mobile,
                  username: this.buddyinfo.username,
                  buddyImage: this.buddyinfo.photourl,
                  location: false,
                  latitude: false,
                  status: status1,
                  filetype: "image",
                  tagmessage: this.tagmessage,
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  Tagto: this.Tagto,
                  attachtext:null,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  fileextension: this.createFileName(),
                  Taskfrom: '',
                  Taskto: '',
                  chatType: "1",
                  selfdestruct: this.self_destruct,   
                  selected: false,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false
                }

                this.allmessages.push(array1);
                this.scrollToBottomOnInit();
                if (this.platform.is('android')) {
                  
                  console.log("before sending :" + JSON.stringify(array1))
                  
                  

                  
                  this.BuddyChatProvider.createMessage(array1, "1").then(res => {

                  });
                }
              }
              else {
                
                this.http.post(url, formData)

                  .subscribe(
                    (value) => {
                      
                      
                      this.loadingdismiss();


                    },
                    
                    (err) => {
                      
                      
                      
                      this.loadingdismiss();

                      var status = "0";
                      if (this.networkProvider.CurrentStatus == true) {
                        status = "1";
                      }
                      var array = {
                        message: this.service.ImagePath + imagename,
                        sentby: this.Uid,
                        message_id: this.Uid + "_" + this.buddy.mobile,
                        timestamp: new Date().getTime(),
                        sentto: this.buddy.mobile,
                        attachtext:null,

                        buddyid: this.buddyinfo.mobile,
                        username: this.buddyinfo.username,
                        buddyImage: this.buddyinfo.photourl,

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
                        selfdestruct: this.self_destruct,   
                        selected: false,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false
                      }
                      this.send(array)
                      this.allmessages.push(array);
                      console.log("before send ahat")
                      this.scrollToBottomOnInit();

                      if (this.platform.is('android')) {
                        
                        
                        
                      }

                      
                      this.BuddyChatProvider.createMessage(array, "1").then(res => {
                        this.scrollToBottomOnInit();
                        if (this.networkProvider.CurrentStatus == true) {
                          
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
      console.log("err:" + JSON.stringify(err))
    })
  }
  dataURLtoFile(dataURI, filename) {
    
    

    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };

  
  private createFileName1() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".png";
    return newFileName;
  }

  
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }


  
  galleryPicMsg1() {
    if (this.platform.is('android') || this.platform.is('ios')) {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => {
          console.log('Has permission?', result.hasPermission)
          
        },
        err => {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        }
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);

      
      
      
      
      

      
      
      
      
      
      
      
      
      
      
      



    }
  }

  async AllowedFormats() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: "File Format Only Images are allowed (  PNG | JPEG | GIF | dotx | xls | PDF | TXT | flv | avi | mp4)",
      buttons: [
        
        
        
        
        
        
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
        if (this.showpop == 'true') {
          this.showpop = 'false'
        }
        
        
        
        

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

              
              if (this.networkProvider.CurrentStatus == false) {
                this.loadingdismiss();

                var status1 = "0";

                var array1 = {
                  message: profilepic,
                  sentby: this.Uid,
                  message_id: this.Uid + "_" + this.buddy.mobile,
                  timestamp: new Date().getTime(),
                  sentto: this.buddy.mobile,
                  buddyid: this.buddyinfo.mobile,
                  username: this.buddyinfo.username,
                  buddyImage: this.buddyinfo.photourl,
                  location: false,
                  latitude: false,
                  status: status1,
                  filetype: getinfo[0],
                  fileextension: currentName,
                  tagmessage: this.tagmessage,
                  tagfileextension: this.tagfileextension,
                  tagtime: this.tagtime,
                  Tagsend: this.Tagsend,
                  attachtext:null,
                  Tagto: this.Tagto,
                  Date: new Date(),
                  tagfiletype: this.filetype,
                  Taglatitude: this.latitude,
                  Taglocation: this.location,
                  Taskfrom: '',
                  Taskto: '',
                  chatType: "1",
                  selfdestruct: this.self_destruct,   
                  selected: false,
                  forwardmsg: null,
                  selectedColor: "none",
                  showMore: false
                }

                
                this.allmessages.push(array1);
                this.scrollToBottomOnInit();
                if (this.platform.is('android')) {
                  
                  console.log("before sending :" + JSON.stringify(array1))
                  
                  

                  
                  this.BuddyChatProvider.createMessage(array1, "1").then(res => {
                    this.scrollToBottomOnInit();

                  });
                }

              }
              else {
                var file1 = this.dataURLtoFile(profilepic, imagename);
                var url = this.service.mainAPI + '/uploadflintaimage';
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


                        message: this.service.ImagePath + imagename,
                        sentby: this.Uid,
                        message_id: this.Uid + "_" + this.buddy.mobile,

                        buddyid: this.buddyinfo.mobile,
                        username: this.buddyinfo.username,
                        buddyImage: this.buddyinfo.photourl,
                        attachtext:null,

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
                        selfdestruct: this.self_destruct,   
                        selected: false,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false
                      }
                      this.send(array)
                      this.allmessages.push(array);
                      this.scrollToBottomOnInit();

                      console.log("before send ahat")
                      
                      
                      
                      
                      
                      

                      this.BuddyChatProvider.createMessage(array, "1").then(res => {
                        this.scrollToBottomOnInit();
                        if (this.networkProvider.CurrentStatus == true) {
                          
                        }
                      });

                    },
                    
                    (err) => {
                      
                      this.loadingdismiss();
                      console.log("file uplaod 2")

                      var status = "0";
                      if (this.networkProvider.CurrentStatus == true) {
                        status = "1";
                      }
                      var array = {
                        displayName: this.BuddyChatProvider.buddy.displayName,
                        photourl: this.BuddyChatProvider.buddy.photourl,


                        message: this.service.ImagePath + imagename,
                        sentby: this.Uid,
                        message_id: this.Uid + "_" + this.buddy.mobile,

                        buddyid: this.buddyinfo.mobile,
                        username: this.buddyinfo.username,
                        buddyImage: this.buddyinfo.photourl,
                        attachtext:null,

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
                        selfdestruct: this.self_destruct,   
                        selected: false,
                        forwardmsg: null,
                        selectedColor: "none",
                        showMore: false
                      }
                      this.send(array)
                      this.allmessages.push(array);
                      console.log("before send ahat")
                      this.scrollToBottomOnInit();

                      
                      
                      
                      
                      
                      
                      this.BuddyChatProvider.createMessage(array, "1").then(res => {
                        this.scrollToBottomOnInit();
                        if (this.networkProvider.CurrentStatus == true) {
                          
                        }
                      });


                      
                      
                      console.log("galleryPicMsg 4")
                    })

              }

            },
              
              (err) => {
                this.loadingdismiss();
                console.log("galleryPicMsg err:" + JSON.stringify(err))

              })


            
            
            
            
            

          }
          else {
            this.loadingdismiss();
            this.AllowedFormats();
          }
        }).catch((err) => {
          this.loadingdismiss();
          console.log('fileChooser Error2: ' + JSON.stringify(err));
          

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
    
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file.resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));

          fileName = name;

          
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });

          
          
          console.log("fileName:" + fileName + "imgBlob : " + imgBlob)
          resolve({
            fileName,
            imgBlob
          });

        })
        .catch(e => reject(e));
    });
  }
  
  makeblob(dataURL) {
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

  
  async addMarker() {
    this.showpop = 'false'

    if (this.platform.is('android') || this.platform.is('ios')) {


      const permissions = Object.keys(this.LocationPERMISSION).map(k => this.LocationPERMISSION[k]);
      this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
        console.log("requestAllPermissions :" + JSON.stringify(status));
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          console.log("canRequest :" + JSON.stringify(canRequest))
          if (canRequest) {
            
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
            message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
            location: 'true',
            
            status: status,
            filetype: mapType,
            tagmessage: this.tagmessage,
            tagfileextension: this.tagfileextension,
            tagtime: this.tagtime,
            Tagsend: this.Tagsend,
            attachtext:null,
            Tagto: this.Tagto,
            Date: new Date(),
            tagfiletype: this.filetype,
            Taglatitude: this.latitude,
            Taglocation: this.location,
            fileextension: '',
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            selfdestruct: this.self_destruct,   
            livelocation: true,
            selected: false,
            forwardmsg: null,
            selectedColor: "none",
            showMore: false
          }
          this.send(array);
          this.allmessages.push(array);
          this.scrollToBottomOnInit();

          console.log("before send ahat")
          this.BuddyChatProvider.createMessage(array, "1");
          
          
          
          
          
          this.scrollToBottomOnInit();
          
          
          
          

        }
      });
    }


  }


  async liveLocation(locationValue, timestamp, sentby) {


    
    
    
    
    
    
    
    
    

    
    
    
    
    


    if (this.platform.is('android') || this.platform.is('ios')) {


      const permissions = Object.keys(this.LocationPERMISSION).map(k => this.LocationPERMISSION[k]);
      this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
        console.log("requestAllPermissions :" + JSON.stringify(status));
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {
          console.log("canRequest :" + JSON.stringify(canRequest))
          if (canRequest) {
            
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
            message: data["data"]["currlatLng"] + ',' + data["data"]["currlatLongng"],
            location: 'true',
            
            status: status,
            filetype: mapType,
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
            attachtext:null,
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            selfdestruct: this.self_destruct,  
            selected: false,
            forwardmsg: null,
            livelocation: false,
            selectedColor: "none",
            showMore: false
          }
          this.send(array);
          this.allmessages.push(array);
          this.scrollToBottomOnInit();

          console.log("before send ahat")
          this.BuddyChatProvider.createMessage(array, "1");
          
          
          
          
          
          this.scrollToBottomOnInit();
          
          
          
          

        }
      });
    }


  }

  txtKeyUp() {
    
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

      
      
      
      
      
      var range = [];

      for (var i = 0; i < data.split(' ').length; i++) {
        range.push(data.split(' ')[i]);
      }


      console.log("range 1  :" + range + "  : " + range.length);
      
      var rangespace = range.join(' ');
      
      


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
      
      console.log("record duration :" + this.audio.getDuration() + " : " + this.audio.getCurrentPosition);
    }

  }
  stopRecord() {
    this.mediaRecordFlag = false;
    this.newMsgBtn = true;
    if (this.platform.is('ios') || this.platform.is('android')) {

      this.audio.stopRecord();
      let data = { filename: this.fileName };
      
      
      
      this.recording = false;
      
      console.log("File path 1212:" + this.fileName + " : " + this.audiofilePath)


      
      this.saveRecord();

      
    }

  }
  
  cancelRecord() {
    this.mediaRecordFlag = true;
    this.newMsgBtn = true;
    if (this.platform.is('ios') || this.platform.is('android')) {
      this.audio.stopRecord();
      this.recording = false;
    }


  }
  
  saveRecord() {
    let metadata = {
      contentType: 'audio/mp3',
    };
    let filePath = `${this.file.externalDataDirectory}` + `${this.fileName}`;
    var newPath = this.file.externalDataDirectory.replace(/file:\/\//g, 'app-file://') + this.fileName;
    console.log("filePath :" + filePath + ":" + newPath)
    this.file.readAsDataURL(this.file.externalDataDirectory, this.fileName).then((file) => {
      

      var status = "0";
      if (this.networkProvider.CurrentStatus == true) {
        status = "1";
      }

      var array = {
        message: file,
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
        filetype: "mp3",
        tagmessage: this.tagmessage,
        tagfileextension: this.tagfileextension,
        tagtime: this.tagtime,
        Tagsend: this.Tagsend,
        Tagto: this.Tagto,
        Date: new Date(),
        tagfiletype: this.filetype,
        Taglatitude: this.latitude,
        Taglocation: this.location,
        fileextension: this.fileName,
        Taskfrom: '',
        Taskto: '',
        attachtext:null,
        chatType: "1",
        forwardmsg: null,
        selected: false,
        selectedColor: "none",
        showMore: false
      }
      if (this.networkProvider.CurrentStatus == false) {
        this.allmessages.push(array);
        this.scrollToBottomOnInit();
        
        
        
        
        

        
         
        
        this.BuddyChatProvider.createMessage(array, "1").then(res => {
          this.scrollToBottomOnInit();

        });
      }
      else {
        this.send(array);
        this.allmessages.push(array);
        this.scrollToBottomOnInit();

        console.log("before send ahat")
        this.BuddyChatProvider.createMessage(array, "1").then(res => {
          
          

          
          
          
          
        });
        this.scrollToBottomOnInit();
      }

    })

  }

  onPress($event, item, i) {
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

    let actionSheet = this.actionSheet.create({
      header: 'My Options',
      buttons: [
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

            
            
            
            
            
            
            
            
            
          }
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          handler: () => {
            this.forwardClick = false;
            this.forwardFlag = false
            this.deleteFlag = true;
            item.selected = true;
            this.forwardSelection(item.selected, item)

            
            
            
            
            
            
            
            
            
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
            var getchatlist = this.allmessages;
            this.allmessages = [];
            getchatlist.forEach(element => {
              if (element.timestamp == item.timestamp || element.tagtime == item.timestamp) {
                this.allmessages.push(element)
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

  
  stopAudio() {
    this.audio.stop();

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
  async save_event(msg, chat) {
    console.log(msg, chat);
    var str = msg.split(" - ");
    var title = str[0];
    var msg = str[1];
    
    var str = msg.split(" by ");
    var description = str[0];
    var msg = str[1];
    
    var str = msg.split(" to ");
    var start_time = str[0];
    var end_time = str[1];
    
    var data = {
      title: title,
      startTime: new Date(start_time),
      endTime: new Date(end_time),
      desc: description,
      createdby: localStorage.getItem('mobile'),
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
  fileFilter() {
    var obj = {
      "message": this.allmessages,
      "buddyInfo": this.buddydetails
    }
    this.navCtrl.navigateForward('file-filter', {
      queryParams: obj,
    })
  }

  ionViewWillLeave() {
    this.networkProvider.forwardFlow = false;
    
    this.pageAlive = false;
    this.txtKeyUp();
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

  
  async blockMethod() {

    console.log("this.blocked  :" + this.myblocked)
    var mess = null, alertmessage = null, sendmessage = null;
    if (this.myblocked == true) {
      mess = "Do you want unblock?"
      alertmessage = "UnBlocked Successfully"
      sendmessage = localStorage.getItem("username") + " UnBlocked";
    }
    else {
      mess = "Do you want block?"
      alertmessage = "Blocked Successfully";
      if(localStorage.getItem("username")!=undefined){
        sendmessage = "You Blocked" + this.buddyinfo.username;
      }
      else{
        sendmessage = localStorage.getItem("username") + 'Blocked You';
  
      }
   

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
              fileextension: '',
              attachtext:null,
              tagmessage: this.tagmessage,
              tagfileextension: this.tagfileextension,
              tagfiletype: this.filetype,
              tagtime: this.tagtime,
              Taskfrom: '',
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
              attachtext:null,
              location: false,
              latitude: undefined + ',' + undefined,
              status: status,
              filetype: "title",
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

            this.BuddyChatProvider.createMessage(array, "1").then(res => {

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
      
    });
    popover.present();

    popover.onWillDismiss().then(data => {

      console.log("menuCLick onDidDismiss : " + JSON.stringify(data));
      if (data["data"].buddyinfo == "1") {
        this.clickEVent(); 
      }
      else if (data["data"].buddyinfo == "2") {
        this.fileFilter(); 
      }
      else if (data["data"].buddyinfo == "3") {
        this.chatfilter(); 
      }
      else if (data["data"].buddyinfo == "4") {

        this.blockMethod(); 
      }
      else if (data["data"].buddyinfo == "5") {

        this.searchshow(); 
      }
    })
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

}
