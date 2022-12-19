/**
 * Displaying Video module
 */

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Platform, NavParams, ModalController, NavController, AlertController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Socket } from 'ngx-socket-io';
declare var apiRTC: any
declare let cordova: any;
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { NetworkService } from "../network.service";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { ApiserviceService } from '../apiservice.service';

declare var AudioToggle: any


@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})

  /**
   * Initial declarations
   */


export class VideoPage implements OnInit {
  myStreemAudio;
  buddyimage: any;
  isMute = false;
  ua: any;
  connectedSession: any;
  currentCall: any;
  localStream: any;
  remoteStream: any;
  muteValue: any;
  onCall: boolean;
  muteValue1: boolean = false;
  muteValue2: boolean = false;
  myid: any;
  opponentId: any;

  infoLabel: string;
  titike: any;
  callid: any;
  // You can add many other permissions
  // PERMISSION = {
  //   CAMERA: this.diagnostic.permission.CAMERA,
  //   WRITE_EXTERNAL: this.diagnostic.permission.WRITE_EXTERNAL_STORAGE,
  //   READ_EXTERNAL: this.diagnostic.permission.READ_EXTERNAL_STORAGE,
  // };
  status: any;
  receiveCall: any;
  mic_switch = true;
  buddyid: any;
  getcallId: any;
  callerId:any;
  receiverId:any;
  buddyname: any;

    //timer
    public timeBegan = null
    public timeStopped: any = null
    public stoppedDuration: any = 0
    public started = null
    public running = false
    public blankTime = "00:00.000"
    public time = "00:00.000"

/**
* On Loading
*/


  constructor(
    private ApiserviceService:ApiserviceService,
    private networkProvider: NetworkService,
    private BuddyChatProvider: BuddyChatProvider,
    private nativeAudio: NativeAudio,
    public sanitizer: DomSanitizer,
    private alertController: AlertController,
    private socket: Socket,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public platform: Platform,
    private navParams: NavParams,
    private modalController: ModalController
  ) {

    this.time=null;
    if (this.navParams.get("buddy") != null) {
      this.buddyid = this.navParams.get("buddy");
      console.log("buddy:" + this.buddyid)
    }

    if (this.navParams.get("callerId") != null) {
      this.callerId = this.navParams.get("callerId");
      console.log("callerId:" + this.callerId)
    }
    else{
      this.callerId =  this.navParams.get("myid")
    }
    if (this.navParams.get("receiverId") != null) {
      this.receiverId = this.navParams.get("receiverId");
      console.log("receiverId:" + this.receiverId)
    }

    if (this.navParams.get("callid") != null) {
      this.getcallId = this.navParams.get("callid");
      console.log("getcallId:" + this.getcallId)
    }

    this.buddyimage = this.navParams.get("buddyimage")
    this.buddyname = this.navParams.get("buddyname") + " Calling";

    this.receiveCall = false;
    this.muteValue = "assets/mic.png";
    this.muteValue1 = false;
    this.muteValue2 = false;
    this.ua = apiRTC.UserAgent = null;
    this.connectedSession = apiRTC.Session = null;
    this.currentCall = apiRTC.Call = null;
    this.localStream = apiRTC.Stream = null;
    this.remoteStream = apiRTC.Stream = null;
    this.titike = "Calling...."
    this.onCall = false;
    this.infoLabel = "Connecting...";

    this.status = "Connecting... "
    this.Receive();
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        cordova.plugins.iosrtc.registerGlobals();
      }
      const script = this.renderer.createElement("script");
      script.src = "https://cloud.apizee.com/apiRTC/apiRTC-latest.min.js";
      script.onload = () => {
        console.log("apiRTC loaded");
        this.startApp();
      };
      this.renderer.appendChild(this.elementRef.nativeElement, script);
    });
  }
  /**
   * Event fired on receiving the video
   */

  Receive() {
    this.socket.on('call_connected', (msg) => {
      console.log("call_connected:" + JSON.stringify(msg))
      if (msg.type=="audio" && msg.receiverId == this.navParams.get("buddy") && msg.callerId == localStorage.getItem("FlintauserID")) {
        this.start(); //friend timer start
      }
      else if (msg.type=="audio" && msg.callerId == this.navParams.get("buddy") && msg.receiverId == localStorage.getItem("FlintauserID")) {
        this.start(); //My timer start
      }
    })
    this.socket.on('reject_call', (msg) => {
      console.log("recive reject call:" + this.buddyid + ":" + this.callid + ":" + JSON.stringify(msg) + ":" + localStorage.getItem("FlintauserID") + ":" + this.navParams.get("callid"));
      if (msg.buddyid == localStorage.getItem("FlintauserID") && msg.myid == this.buddyid) {
        console.log("recive reject call 2:" + this.callid + ":" + JSON.stringify(msg) + ":" + localStorage.getItem("FlintauserID") + ":" + this.navParams.get("callid"));
        if (this.platform.is('android')) {
          this.nativeAudio.stop(localStorage.getItem('callertone'))
        }
        this.status = msg.myname + " Rejected Your Call"
        this.clearStreams();
        this.currentCall = null;
        this.onCall = false;

        
        this.closeModal1('1');
      }
      // else if (msg.callid == this.callid && msg.myid == localStorage.getItem("FlintauserID")) {
      //   console.log("recive reject call 3:" + this.callid + ":" + JSON.stringify(msg) + ":" + localStorage.getItem("FlintauserID") + ":" + this.navParams.get("callid"));
      //   this.status = msg.myname + " Rejected Your Call"
      //   this.clearStreams();
      //   this.currentCall = null;
      //   this.onCall = false;

      //   if (this.platform.is('android')) {
      //     this.nativeAudio.stop(localStorage.getItem('callertone'))
      //   }
      //   this.closeModal1();
      // }

    })

  }
  speakerModal() {
    AudioToggle.setAudioMode(AudioToggle.RINGTONE);
  }
  async closeModal1(value) {
    this.stop();

    this.alertController.dismiss();

    this.currentCall = null;
    this.onCall = false;
    this.alertController.dismiss();
    var item1 = {
      callid: this.callid,
      callerId:this.callerId,
      receiverId:this.navParams.get("buddy"),
      myid: this.navParams.get("myid"),
      buddyid: this.navParams.get("buddy"),
      myname: localStorage.getItem("username")
    }

    if(value!="1"){
      this.socket.emit('reject_call', item1);
    }
    // this.socket.disconnect();
    if (this.platform.is('android')) {
      this.nativeAudio.stop(localStorage.getItem('callertone'))
    }
    await this.modalController.dismiss({ "flag": "0" });
  }
  async closeModal() {
    this.stop();

    if (this.currentCall != null) {
      this.currentCall.hangUp();
      this.clearStreams();

      // this.localStream.release();

    }

    this.alertController.dismiss();
    var item1 = {
      callid: this.callid,
      myid: this.navParams.get("myid"),
      buddyid: this.navParams.get("buddy"),
      myname: localStorage.getItem("username")
    }


    this.socket.emit('reject_call', item1);

    this.clearStreams();
    this.currentCall = null;
    this.onCall = false;

    if (this.platform.is('android')) {
      this.nativeAudio.stop(localStorage.getItem('callertone'))
    }

    await this.modalController.dismiss({ "flag": "0" });
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

    console.log("time :" + this.time)
  };


  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }
  // ionViewDidLeave() {
  //   this.socket.emit('disconnect', {});
  // }
  // guid() {
  //   function s4() {
  //     return Math.floor(Math.random() * Math.floor(10002));
  //   }
  //   return s4();
  // }
  ngOnInit() {
    AudioToggle.setAudioMode(AudioToggle.EARPIECE);

    this.callid = 0;
    if (this.platform.is('android')) {
      this.nativeAudio.play(localStorage.getItem('callertone'), () => console.log('sent is done playing'));
    }
    // var room = { sender: localStorage.getItem('mobile'), receiver:Date.now()+this.guid() };
    // this.socket.emit('connectionestablish', room);

    this.socket.connect();

  }
  startApp() {
    console.log("startApp");

    apiRTC.setLogLevel(10);

    this.ua = new apiRTC.UserAgent({
      uri: "apzkey:e62a493fe9d2c32bcc374388c95bdd6e",
      // uri: "apzkey:a308fd83595964fde42cfcefe8afd478",


    });

    let registerInformation = {
      cloudUrl: "https://cloud.apizee.com",
    };

    this.ua
      .register(registerInformation)
      .then((session) => {
        console.log("User registered with session: ", session);

        session
          .on("contactListUpdate", (updatedContacts) => {
            console.log("contactListUpdate", updatedContacts);
          })
          .on("incomingCall", (invitation) => {
            invitation.accept().then((call) => {
              this.currentCall = call;
              this.setCallListeners();
              this.onCall = true;
            });
          });
        this.connectedSession = session;
        this.callid = session.getId();
        this.status = "Calling..."
        this.infoLabel = "Your id: " + this.callid;
        console.log("my id:" + this.infoLabel)
        if (this.navParams.get("callid") != null && this.navParams.get("callid") != 0) {
          if (this.platform.is('android')) {
            this.nativeAudio.stop(localStorage.getItem('callertone'))
          }
          console.log("Receive id:" + this.infoLabel)

          // this.onClickCall();
          this.receiveCall = true;

        }
        else {

          var item1 = {
            buddy: this.navParams.get("buddy"),
            myid: this.navParams.get("myid"),
            myname: localStorage.getItem("username"),
            callid: this.callid,
            buddyname: this.buddyname,
            myimage: localStorage.getItem("photourl"),

          }
          this.receiveCall = false;

          console.log("starting audio_call")
          this.socket.emit('audio_call', item1);

          // buddy: this.buddyinfo.mobile,
          // myid: this.Uid,
          // callid: this.callid,
          // buddyimage: this.buddyinfo.photourl,
          // buddyname: this.buddyinfo.username,

          var array1 = {
            buddyid: this.navParams.get("buddy"),
            message: this.ApiserviceService.encryptText('Voice Call' + " at " + this.formatAMPM()),
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
            filetype: "call text",
            fileextension: '',
            tagmessage: this.ApiserviceService.encryptText(''),
            tagfileextension: null,
            tagfiletype: null,
            tagtime: null,
            Taskfrom: '',
            Taskto: '',
            chatType: "1",
            attachtext:this.ApiserviceService.encryptText(null),
            selfdestruct: this.navParams.get("selfdestruct")  //For Self Destruct message

          }
          this.socket.emit('chatmessage', array1);

        


          var message_id = localStorage.getItem('mobile') + '_' + this.navParams.get("buddy");
          var message_id1 = this.navParams.get("buddy") + '_' + localStorage.getItem('mobile');

          this.BuddyChatProvider.createMessage(array1, "1").then(res => {
            if (this.networkProvider.CurrentStatus == true) {
            }
          });

        }
        //  buddy: this.buddyinfo.mobile,
        //  myid:this.Uid
        console.log("para :" + this.navParams.get("buddy"))


      })
      .catch(function (error) {
        console.error("User agent registration failed", error);
      });

    this.checkPermissions();
  }
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
  setCallListeners = () => {
    this.currentCall
      .on("localStreamAvailable", (stream) => {
        console.log("localStreamAvailable", stream);
        // this.myStreemAudio = stream.detail.stream;
        this.localStream = stream;
        stream.addInDiv(
          "local-stream",
          "local-media",
          { height: "150px" },
          false
        );
      })
      .on("streamAdded", (stream) => {
        console.log("streamAdded :", stream);
        this.remoteStream = stream;
        stream.addInDiv(
          "remote-stream",
          "remote-media",
          { height: "150px" },
          false
        );
      })
      .on("streamRemoved", (stream) => {
        console.log("streamAdded :", stream);
        stream.removeFromDiv("remote-stream", "remote-media");
        this.remoteStream = null;
      })
      .on("userMediaError", (e) => {
        console.error("userMediaError detected : ", e);
        console.error("userMediaError detected with error : ", e.error);
      })
      .on("hangup", () => {
        this.clearStreams();
        this.currentCall = null;
        this.onCall = false;
      });
  };

  onClickCall = () => {
    // this.opponentId="916605";
    console.log("opponentId :" + this.opponentId)

    if (!this.opponentId) {
      console.warn("Opponent number is null");
      return;
    }
    if (this.onCall) {
      console.warn("Call is already started");
      return;
    }
    let contact = this.connectedSession.getOrCreateContact(this.opponentId);
    let call = contact.call();
    if (!call) {
      console.warn("Cannot establish the call");
      return;
    }
    this.currentCall = call;
    this.setCallListeners();
    this.onCall = true;
  };

  pickUpcall() {
    this.callid = this.navParams.get("callid")
    this.opponentId = this.navParams.get("callid")
    this.onClickCall();
    var item1 = {
      callerId: localStorage.getItem("FlintauserID"),
      receiverId: this.navParams.get("buddy"),
      callid: this.navParams.get("callid"),
      type: "audio"
    }
    console.log("webRTC audio_call Created");
    this.socket.emit('call_connected', item1);

  }
  onClickHangUp = () => {
    this.clearStreams();
    if (this.currentCall != null) {
      this.currentCall.hangUp();
    }
    this.currentCall = null;
    this.onCall = false;
    this.closeModal1('0')
  };

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

  clearStreams = () => {
    if (this.localStream) {
      this.localStream.removeFromDiv("local-stream", "local-media");
    }
    if (this.remoteStream) {
      this.localStream.removeFromDiv("local-stream", "local-media");
    }
    this.localStream = null;
    this.remoteStream = null;
  };




  muteCall() {

    if (this.localStream.muteAudio != undefined || this.localStream.muteAudio !== null) {
      if (this.muteValue1 == false) {
        this.muteValue1 = true;
        this.muteValue = "assets/mute.png";
        this.localStream.muteAudio();
      }
      else {
        this.muteValue1 = false;
        this.muteValue = "assets/mic.png";
        this.localStream.unmuteAudio();
      }

    }
    else {
      alert("Please wait call not connecting yet...")
    }

    // if (val == 0) {
    //   this.localStream.getAudioTracks()[0].enabled = false;
    // } else {
    //   this.localStream.getAudioTracks()[0].enabled = true;
    // }

    console.log('muteCall' + this.muteValue1)
  }


  // muteVideo(val) {
  //   if(this.localStream != null && this.localStream.getAudioTracks().length > 0){
  //     this.mic_switch = !this.mic_switch;
  //     this.localStream.getAudioTracks()[0].enabled = this.mic_switch;
  //   }    
  // }
}