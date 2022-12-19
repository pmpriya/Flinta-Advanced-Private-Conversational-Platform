import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Platform, NavParams, ModalController, NavController, AlertController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
// import { UserInfoProvider } from "../../providers/database/UserInfo";
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { NetworkService } from "../network.service";
import { WebrtcService } from '../webrtc.service';

declare var apiRTC: any

declare let cordova: any;
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.page.html',
  styleUrls: ['./videocall.page.scss'],
})
export class VideocallPage implements OnInit {
  contacts: any;
  showCall: boolean;
  showHangup: boolean;
  showAnswer: boolean;
  showReject: boolean;
  showStatus: boolean;
  showRemoteVideo: boolean = true;
  AudioCall: any;
  showMyVideo: boolean = true;
  rejected: any;
  session;
  webRTCClient;
  incomingCallId = 0;
  status;
  calleeId;
  buddyimage: any;
  myphoto: any;
  buddyProfilename: any;
  muteValue: any;
  muteValue1: boolean = false;
  videoValue1: boolean = false;
  videomuteValue: any;

  receiveCall: any;
  localStraem: any;
  streamReady: boolean = false;
  callReceive: boolean = false;
  //timer
  public timeBegan = null
  public timeStopped: any = null
  public stoppedDuration: any = 0
  public started = null
  public running = false
  public blankTime = "00:00.000"
  public time = "00:00.000"
  public dispalyoption: any;
  public Receivedispalyoption: any;

  group_call_creator: any;
  callerId: any;
  groupcall: any;
  call: any;

  callStatus: any;
  callReciveStatus: any;
  callTimeStamp: any;

  topVideoFrame = 'partner-video';
  FlintauserID: string;
  partnerId: string;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;

  videoCall:boolean=false;
  constructor(private networkProvider: NetworkService, private elementRef: ElementRef, private webRTC: WebrtcService,
    private BuddyChatProvider: BuddyChatProvider, private renderer: Renderer2,
     private platform: Platform, private sanitizer: DomSanitizer, private ApiserviceService: ApiserviceService, private alertController: AlertController, private modalController: ModalController, private nativeAudio: NativeAudio, private socket: Socket, private navParams: NavParams) {
    // this.nativeAudio.preloadSimple('uniqueI1', 'assets/mp3/sent.mp3').then(res => {
    // })
    this.time = null;
    this.time = null;
    this.receiveCall = false;
    this.muteValue = "assets/mic.png";
    this.muteValue1 = false;

    this.videomuteValue = "assets/mute_video.png";
    this.videoValue1 = false;


    this.buddyimage = this.navParams.get("buddyimage")
    this.myphoto = localStorage.getItem("photourl")
    this.buddyProfilename = "Connected with " + this.navParams.get("buddyname");
    this.rejected = "";

    this.AudioCall = this.navParams.get("typeCall");
    this.call = this.navParams.get("callid");


    if (this.navParams.get("group_call") != null) {
      this.group_call_creator = localStorage.getItem("FlintauserID");
      this.contacts = this.navParams.get("contacts");
      this.groupcall = true;
    } else {
      this.contacts = [];
      this.group_call_creator = null;
      this.groupcall = false;
    }



    console.log("this.AudioCall :" + this.AudioCall + ":" + this.navParams.get("typeCall"))
    if (this.AudioCall == "Voice") {
      this.dispalyoption = "none"
      this.videoCall=false
    }
    else {
      this.dispalyoption = "block"
      this.videoCall=true
    }

    console.log("dispalyoption :" + this.dispalyoption)
    this.Receive();

  }


  ionViewDidEnter() {
    this.Receivedispalyoption = "none";

    if (this.platform.is('android')) {
      this.checkPermissions();
    }
    this.receiveCall = false;

    this.callTimeStamp = new Date().getTime();
    console.log("Videocall 1 :" + this.callTimeStamp);
    this.myEl = this.elementRef.nativeElement.querySelector('#my-video');
    this.myEl.volume=0;

    this.partnerEl = this.elementRef.nativeElement.querySelector('#partner-video');


    //My ConnnectionStarted
    this.HangUp();


    if (this.navParams.get("receive") != null) {

      this.callReciveStatus = "Incoming " + this.AudioCall + " Call"
      // this.receiveCall = true;
      var item1 = {
        Incoming: true,
        receiveIncomingId: this.navParams.get("buddy")
      }

      this.socket.emit('call_connected', item1);

      if (this.platform.is('android')) {
        this.nativeAudio.play(localStorage.getItem('callertone'), () => console.log('sent is done playing'));
      }

      //Buddy Connection Started
      this.partnerId = this.navParams.get("callid")
      // this.callBuddy();
      this.receiveCall = true;

    }
    else {

      this.FlintauserID = new Date().getTime().toString()
      this.StartMyCall();
      this.callStatus = "Calling..."
    }



    console.log("callStatus :" + this.callStatus + ":" + this.receiveCall)


    this.socket.connect();

    this.showStatus = false;


  }
  //MyConnection
  StartMyCall() {

    this.webRTC.init(this.FlintauserID, this.myEl, this.partnerEl,this.videoCall);

  
    if (this.navParams.get("receive") != null) {

    }
    else {
      if (this.contacts != null && this.contacts.length != 0) {

        this.contacts.forEach(element => {

          var item1 = {
            callerId: this.navParams.get("myid"),
            receiverId: element.uid,
            buddy: element.uid,
            myid: this.navParams.get("myid"),
            myimage: localStorage.getItem("photourl"),
            myname: localStorage.getItem("username"),
            callid: this.FlintauserID,
            typeCall: this.AudioCall,
            groupCall: true,
            callTimeStamp: this.callTimeStamp
          }
          console.log("webRTC audio_call Group Created");

          this.socket.emit('audio_call', item1);

          this.callerId = this.navParams.get("myid");

          var callType = null;
          if (this.AudioCall == "Voice") {
            callType = "call text";
          }
          else {
            callType = "video text"
          }

          var array1 = {
            buddyid: element.uid,
            message: this.ApiserviceService.encryptText(this.AudioCall + ' Call' + " at " + this.formatAMPM()),
            sentby: localStorage.getItem("FlintauserID"),
            username: element.username,
            buddyImage: this.navParams.get("buddyimage"),
            message_id: localStorage.getItem("FlintauserID") + "_" + element.uid,
            timestamp: new Date().getTime(),
            deviceid: '0',
            sentto: element.uid,
            location: false,
            latitude: undefined + ',' + undefined,
            status: status,
            filetype: callType,
            fileextension: '',
            tagmessage: this.ApiserviceService.encryptText(''),
            tagfileextension: null,
            tagfiletype: null,
            tagtime: null,
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            selfdestruct: false

          }
          this.socket.emit('chatmessage', array1);

          if (this.platform.is('android')) {
            // this.buddychatService.insertRecords(array1, status).then(res => {
            // })
          }


          var message_id = localStorage.getItem('mobile') + '_' + this.navParams.get("buddy");
          var message_id1 = this.navParams.get("buddy") + '_' + localStorage.getItem('mobile');

          this.BuddyChatProvider.createMessage(array1, "1").then(res => {
            // if (this.networkProvider.CurrentStatus == true) {
            //   this.buddychatService.updateMsgstatus(message_id, message_id1);
            // }
          });
        });


      } else {
        var item1 = {
          callerId: this.navParams.get("myid"),
          receiverId: this.navParams.get("buddy"),
          buddy: this.navParams.get("buddy"),
          myid: this.navParams.get("myid"),
          myimage: localStorage.getItem("photourl"),
          myname: localStorage.getItem("username"),
          callid: this.FlintauserID,
          typeCall: this.AudioCall,
          callTimeStamp: this.callTimeStamp

        }
        console.log("Videocall 1 Created");

        this.socket.emit('audio_call', item1);

        this.callerId = this.navParams.get("myid");

        var callType = null;
        if (this.AudioCall == "Voice") {
          callType = "call text";
        }
        else {
          callType = "video text"
        }

        var array1 = {
          buddyid: this.navParams.get("buddy"),
          message: this.ApiserviceService.encryptText(this.AudioCall + ' Call' + " at " + this.formatAMPM()),
          sentby: localStorage.getItem("FlintauserID"),
          username: this.navParams.get("buddyname"),
          buddyImage: this.navParams.get("buddyimage"),
          message_id: localStorage.getItem("FlintauserID") + "_" + this.navParams.get("buddy"),
          timestamp: new Date().getTime(),
          deviceid: this.navParams.get("buddydeviceid"),
          sentto: this.navParams.get("buddy"),
          location: false,
          latitude: undefined + ',' + undefined,
          status: status,
          filetype: callType,
          fileextension: '',
          tagmessage: this.ApiserviceService.encryptText(''),
          tagfileextension: null,
          tagfiletype: null,
          tagtime: null,
          Taskfrom: '',
          Taskto: '',
          chatType: "1",
          selfdestruct: this.navParams.get("selfdestruct")  //For Self Destruct message

        }
        this.socket.emit('chatmessage', array1);

        // if (this.platform.is('android')) {
        //   this.buddychatService.insertRecords(array1, status).then(res => {
        //   })
        // }


        var message_id = localStorage.getItem('mobile') + '_' + this.navParams.get("buddy");
        var message_id1 = this.navParams.get("buddy") + '_' + localStorage.getItem('mobile');

        this.BuddyChatProvider.createMessage(array1, "1").then(res => {
          // if (this.networkProvider.CurrentStatus == true) {
          //   this.buddychatService.updateMsgstatus(message_id, message_id1);
          // }
        });
      }
    }



  }

  //BuyddyCall
  callBuddy() {
    var FlintauserID = new Date().getTime().toString()
    this.webRTC.init(FlintauserID, this.myEl, this.partnerEl,this.videoCall);

    if (this.platform.is('android')) {
      this.nativeAudio.stop(localStorage.getItem('callertone'))
    }
    this.start();
    console.log("this.partnerId " + this.partnerId)
    this.swapVideo('my-video');
    this.streamReady = true;
    this.receiveCall = false;

    setTimeout(() => {                           //<<<---using ()=> syntax
      this.webRTC.call(this.partnerId);

    }, 3000);
    this.showRemoteVideo = true;
    this.Receivedispalyoption = "block"
    console.log("Im receiver 1" + this.Receivedispalyoption)

    var item1 = {
      callerId: localStorage.getItem("FlintauserID"), //friend
      receiverId: this.navParams.get("buddy"), //ME
      callid: this.FlintauserID

    }
    console.log("webRTC audio_call Created");
    this.socket.emit('call_connected', item1);


  }


  ngOnInit() {



  }
  HangUp() {
    try {
      this.webRTC.hangUp();

    }
    catch (err) {
      console.log("hangUp error:" + err)
    }
  }
  async closeModal1() {
    // this.stop();
    apiRTC.disconnect();
    this.alertController.dismiss();

    if (this.calleeId == undefined) {
      this.calleeId = this.FlintauserID
    }


    if (this.platform.is('android')) {
      this.nativeAudio.stop(localStorage.getItem('callertone'))
    }
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
    apiRTC.disconnect();

    await this.modalController.dismiss({ "flag": "0" });
  }

  async closeModal() {

    this.stop();
    this.alertController.dismiss();
    if (this.calleeId == undefined) {
      this.calleeId = this.FlintauserID
    }
    this.HangUp();

    if (this.navParams.get("callid") != null && this.navParams.get("callid") != 0) {
      var item2 = {
        callid: this.navParams.get("callid"),
        buddyid: this.navParams.get("buddy"),
        myname: localStorage.getItem("username"),
        group_call_creator: this.group_call_creator,
        callTimeStamp: this.callTimeStamp
      }
      this.HangUp();

      console.log("before reject_call:" + JSON.stringify(item2) + ":" + this.calleeId)
      this.socket.emit('reject_call', item2);

      // this.incomingCallId = this.navParams.get("callid");

    }
    else {
      var item1 = {
        callid: this.calleeId,
        buddyid: this.navParams.get("buddy"),
        myname: localStorage.getItem("username"),
        group_call_creator: this.group_call_creator,
        callTimeStamp: this.callTimeStamp

      }
      // this.incomingCallId = this.calleeId;
      this.HangUp();
      console.log("before reject_call:" + JSON.stringify(item1) + ":" + this.calleeId)
      this.socket.emit('reject_call', item1);
    }

    if (this.platform.is('android')) {
      this.nativeAudio.stop(localStorage.getItem('callertone'))
    }
    clearInterval(this.started);
    apiRTC.disconnect();
    await this.modalController.dismiss({ "flag": "0" });
  }
  Receive() {

    this.socket.on('call_connected', (msg) => {
      console.log("call_connected:" + JSON.stringify(msg))

      if (msg.Incoming == true && this.navParams.get("buddy") == msg.receiveIncomingId) {
        this.callStatus = "Ringing"

      }

      // callerId: localStorage.getItem("FlintauserID"),
      // receiverId: this.navParams.get("buddy"),
      // callid: this.FlintauserID

      if (msg.receiverId == this.navParams.get("buddy") && msg.callerId == localStorage.getItem("FlintauserID")) {
        this.streamReady = true;
        this.start(); //friend timer start
        console.log("call_connected socket receive 1")

      }
      else if (msg.callerId == this.navParams.get("buddy") && msg.receiverId == localStorage.getItem("FlintauserID")) {
        // if (this.platform.is('android')) {
        //   this.nativeAudio.play(localStorage.getItem('callertone'), () => console.log('sent is done playing'));
        // }
        this.streamReady = true;
        console.log("Receivedispalyoption 2" + this.Receivedispalyoption)
        this.showRemoteVideo = true;
        this.Receivedispalyoption = "block"
        console.log("Receivedispalyoption 1" + this.Receivedispalyoption)
        console.log("call_connected socket receive 2")

        this.start(); //My timer start
      }
    })
    this.socket.on('reject_call', (msg) => {

      console.log("vide call reject call:" + this.FlintauserID + ":" + this.calleeId + ":" + JSON.stringify(msg) + ":" + localStorage.getItem("FlintauserID") + ":" + this.navParams.get("callid"));
      // if ( (msg.callid == this.calleeId || msg.callid == this.FlintauserID) && msg.buddyid == this.navParams.get("buddy")) {

      console.log("rejected call :" + this.group_call_creator + ":" + this.navParams.get("buddy"))

      console.log("rejected call 2:" + msg.callid +":"+ this.FlintauserID+":"+this.partnerId+":"+msg.buddyid+":"+localStorage.getItem("FlintauserID"))


      if (this.group_call_creator == null && msg.group_call_creator == this.navParams.get("buddy")) {
        this.stop();
        this.status = msg.myname + " Disconnected Your Call"
        // this.ApiserviceService.presentAlert("Alert", this.status);
        this.showStatus = true;
        if (this.platform.is('android')) {
          this.nativeAudio.stop(localStorage.getItem('callertone'))
        }
        this.HangUp();
        this.stop();

        this.closeModal1();

      }
      else if (msg.buddyid == localStorage.getItem("FlintauserID") && msg.callid == this.FlintauserID) {
        this.stop();

        this.status = msg.myname + " Rejected Your Call"
        // this.ApiserviceService.presentAlert("Alert", this.status);
        this.showStatus = true;
        if (this.platform.is('android')) {
          this.nativeAudio.stop(localStorage.getItem('callertone'))
        }
        this.HangUp();
        this.stop();

        this.closeModal1();

      }
      else if ((msg.callid == this.FlintauserID || msg.callid == this.navParams.get("callid")) && msg.buddyid == localStorage.getItem("FlintauserID")) {
        this.status = msg.myname + " Rejected Your Call"
        this.stop();

        this.showStatus = true;
        if (this.platform.is('android')) {
          this.nativeAudio.stop(localStorage.getItem('callertone'))
        }

        // this.incomingCallId = msg.callid;
        this.HangUp();
        this.stop();

        this.closeModal1();

      }

    })

  }


  swapVideo(topVideo: string) {
    this.topVideoFrame = topVideo;
  }

  muteVideo() {

    if (this.videoValue1 == false) {
      this.webRTC.muteVideo(this.videoValue1)
      this.videoValue1 = true;
      this.videomuteValue = "assets/unmute_video.png";
    }
    else if (this.videoValue1 == true) {
      this.webRTC.muteVideo(this.videoValue1)
      this.videoValue1 = false;
      this.videomuteValue = "assets/mute_video.png";
    }

  }


  muteAudio() {

    if (this.muteValue1 == false) {
      this.webRTC.muteAduio(this.muteValue1);
      this.muteValue1 = true;
      this.muteValue = "assets/mute.png";
    }
    else if (this.muteValue1 == true) {
      this.webRTC.muteAduio(this.muteValue1);
      this.muteValue1 = false;
      this.muteValue = "assets/mic.png";

    }
  }


  checkPermissions = () => {
    cordova.plugins.diagnostic.requestRuntimePermissions(
      (statuses) => {
        console.log("Permissions statuses: ", statuses);
      },
      (error) => {
        console.error("The following error occurred: ", error);
      },
      [
        cordova.plugins.diagnostic.permission.CAMERA,
        cordova.plugins.diagnostic.permission.RECORD_AUDIO,
      ]
    );
  };

  formatAMPM() {
    var d = new Date(),
      minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
      hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
      ampm = d.getHours() >= 12 ? 'pm' : 'am',
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + this.tConv24(hours + ':' + minutes);

    return this.tConv24(hours + ':' + minutes);
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

  clockRunning() {
    let currentTime: any = new Date()
    let timeElapsed: any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
    let hour = timeElapsed.getUTCHours()
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    let ms = timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2)
    // + "." + this.zeroPrefix(ms, 3);

    // console.log("time :" + this.time)
  };


  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }
  stop() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }
  start() {
    if (this.running) return;
    if (this.timeBegan === null) {
      // this.reset();
      this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration: any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }






  ionViewWillLeave() {
    // this.webRTCClient.release();
    this.stop();

  }



}
