import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http/';

import { Platform, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NetworkService } from "../app/network.service";
import { BuddyChatProvider } from "../providers/ServerDb/buddyChat";
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx'
// import { FirebaseMessagingWebProvider } from '../providers/firebase-messaging-web/firebase-messaging-web';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/Authentication.service';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { ThemeSwitcherService } from './theme-switcher.service';
import { Socket } from 'ngx-socket-io';
import { VideoPage } from "../app/video/video.page";
import { VideocallPage } from "../app/videocall/videocall.page";
// import * as firebase from 'firebase'
// import { NotificationsService } from "./notifications.service";
import { environment } from "../environments/environment";
import { firebase } from '@firebase/app';
import { ApiserviceService } from './apiservice.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  androidimage: boolean;
  CallCount: any;
  callid: any;
  groupCall: any;
  buddyid: any;
  callerId: any;
  receiverId: any;
  buddyimage: any;
  buddyname: any;
  private loading: any;
  private isShowing = false;
  typeCall: any;
  callName: any;
  PERMISSION = {
    CAMERA: this.diagnostic.permission.CAMERA,
    CALL_PHONE: this.diagnostic.permission.CALL_PHONE,
    RECORD_AUDIO: this.diagnostic.permission.RECORD_AUDIO,
    WRITE_EXTERNAL: this.diagnostic.permission.WRITE_EXTERNAL_STORAGE,
    READ_EXTERNAL: this.diagnostic.permission.READ_EXTERNAL_STORAGE,
  };
  //   ngAfterViewInit() {
  //     this.platform.ready().then(async () => {
  //        await this.notificationsService.requestPermission();
  //     });
  // }
  //   async ngOnInit() {
  //     firebase.initializeApp(environment.firebaseConfig);
  //     await this.notificationsService.init();
  //   }
  constructor(
    // private notificationsService: NotificationsService,
    private afMessaging: AngularFireMessaging,
    private storage: Storage,
    private loadingController: LoadingController,
    private nativeAudio: NativeAudio,
    private modalController: ModalController,
    private alertController: AlertController,
    private socket: Socket,
    private fcm: FCM,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    private NetworkService: NetworkService,
    private network: Network,
    private http: HttpClient,
    private BuddyChatProvider: BuddyChatProvider,
    private authenticationService: AuthenticationService,
    private router: Router,
    public themeSwitcher: ThemeSwitcherService,
    private ApiserviceService: ApiserviceService
  ) {
    this.initializeApp();
    console.log("initializeApp")





    this.callerId = 0;
    this.receiverId = 0;

    this.callid = 0;
    this.buddyid = 0;
    this.callName = 0;
    this.buddyimage = null;
  }
  ngOnDestroy() {
    alert("ionViewWillLeave")
  }
  listenFireMessaging() {
    this.afMessaging.messages
      .subscribe((message) => { console.log('Message received: ', message); });
  }
  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {
          console.log("token :" + token)
          console.log('Permission granted! Save to the server:' + token);
        },
        (error) => { console.log("Permission error :" + JSON.stringify(error)); }
      );
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.listenFireMessaging();
      this.requestPermission();
      this.nativeAudio.preloadComplex('calling', 'assets/mp3/calling.mp3', 1, 1, 0).then(res => { })
      this.nativeAudio.preloadComplex('flame', 'assets/mp3/flame.mp3', 1, 1, 0).then(res => { })
      this.nativeAudio.preloadComplex('hello', 'assets/mp3/hello.mp3', 1, 1, 0).then(res => { })
      this.nativeAudio.preloadComplex('lumia', 'assets/mp3/lumia.mp3', 1, 1, 0).then(res => { })



      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        // this.statusBar.backgroundColorByHexString('#000000');
      }

      this.splashScreen.hide();
      this.NetworkService.DeviceId = 0;
      this.NetworkService.initializeNetworkEvents();
      //  this.settheme();
      // this.themeSwitcher.cycleTheme();
      console.log("langualge :" + this.NetworkService.getCurrentNetworkStatus());
      this.Receive();
      console.log("FlintauserID :" + localStorage.getItem('FlintauserID'))


      // this.authenticationService.authState.subscribe(state => {
      //   console.log("stateV:"+state)
      //   if (state) {
      //     this.router.navigate(['home']);
      //   } else {
      //     this.router.navigate(['login']);
      //   }
      // });

      this.http.get('https://ipapi.co/json').subscribe(
        (response) => {
          this.NetworkService.CurrentStatus = true;
          console.log("https://ipapi.co/json :" + JSON.stringify(response));
          // if (this.loggedduserinfo != null)
          //   this.LoginProvider.userUpdatestatus(this.loggedduserinfo, "online","");
          if (localStorage.getItem("FlintauserID") != null) {

            this.BuddyChatProvider.updatemystatus(localStorage.getItem("FlintauserID"), "online", new Date().getTime(), this.NetworkService.DeviceId).then(res => {
              var obj =
                { "example": "" }

              this.socket.emit('profile_changes', obj);
            });
          }
        },
        (err) => {
          this.NetworkService.CurrentStatus = false;
          console.log("langualge :" + JSON.stringify(err));
        })
      this.storage.get("userLoginInfo").then((val: any) => {

        console.log("getLoggedUserInfo  :" + JSON.stringify(val))
        if (val != null) {
          localStorage.setItem("mobile", val[0].mobile)
          localStorage.setItem("FlintauserID", val[0].mobile);
          localStorage.setItem("username", val[0].username);
          localStorage.setItem("name", val[0].username);
          if (localStorage.getItem("photourl") == null) {
            localStorage.setItem("photourl", val[0].photourl);
          }

          localStorage.setItem("designation", val[0].designation);
          localStorage.setItem('password', val[0].password);
          console.log("getLoggedUserInfo home  :" + JSON.stringify(val))

          if (this.platform.is('android') || this.platform.is('ios')) {
            this.androidimage = true;

          }
          else {
            var data={
              mobile:val[0].mobile
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + '/getUserInfo', data).then(res => {
              if (res[0].userstatus == null || res[0].userstatus == "A") {
                this.router.navigate(['/webchat']);
              }
              else{
                this.ApiserviceService.presentToast("Your Login Id has been Blocked , Please Contact Your Admin")
                this.router.navigate(['/login']);
              }
            });
           
          }

        }
        else {
          console.log("loginpage")
          if (this.platform.is('android') || this.platform.is('ios')) {
            this.androidimage = true;
          }
          else {
            this.router.navigate(['/login']);

          }

        }
      })




      if (this.platform.is('android')) {

        this.requestAllPermissions();
      }



      if (this.platform.is('android')) {

        this.fcm.onNotification().subscribe(data => {
          console.log("onNotification :" + JSON.stringify(data))
          if (data.wasTapped) {
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log("onTokenRefresh :" + JSON.stringify(token))
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });

        this.fcm.getToken().then(token => {
          console.log("getToken :" + JSON.stringify(token))
          this.NetworkService.DeviceId = token;
          if (localStorage.getItem("FlintauserID") != null) {



            this.BuddyChatProvider.updatemystatus(localStorage.getItem("FlintauserID"), "online", new Date().getTime(), this.NetworkService.DeviceId).then(res => {
              var obj =
                { "example": "" }

              this.socket.emit('profile_changes', obj);
            });
          }

          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      }
      this.platform.pause.subscribe(() => {

        //inside the app
        //what you need to do
        console.log("pause subscribe")
        if (localStorage.getItem("FlintauserID") != null) {

          this.BuddyChatProvider.updatemystatus(localStorage.getItem("FlintauserID"), "offline", new Date().getTime(), this.NetworkService.DeviceId).then(res => {
            var obj =
              { "example": "" }

            this.socket.emit('profile_changes', obj);
          });
        }

      });
      this.platform.resume.subscribe(() => {

        //outside the app
        //what you need to do
        console.log("resume subscribe")
        if (localStorage.getItem("FlintauserID") != null) {

          this.BuddyChatProvider.updatemystatus(localStorage.getItem("FlintauserID"), "online", new Date().getTime(), this.NetworkService.DeviceId).then(res => {
            var obj =
              { "example": "" }

            this.socket.emit('profile_changes', obj);
          });
        }
      });

      this.network.onDisconnect().subscribe(() => {
        console.log('WE ARE OFFLINE');
        if (localStorage.getItem("FlintauserID") != null) {

          this.BuddyChatProvider.updatemystatus(localStorage.getItem("FlintauserID"), "offline", new Date().getTime(), this.NetworkService.DeviceId).then(res => {
            var obj =
              { "example": "" }

            this.socket.emit('profile_changes', obj);
          });
        }
      });



    });
  }

  // Change the theme to day mode b/w 6AM to 6PM and to night after 6PM
  settheme() {


    var d = Number(new Date().getHours());

    if (d >= 6 && d < 18) {
      console.log("day mode");
      this.themeSwitcher.setTheme('day');
      localStorage.setItem('theme', 'day');
    } else {
      console.log("night mode");
      this.themeSwitcher.setTheme('night');
      localStorage.setItem('theme', 'night');
    }


  }

  Receive() {
    // Socket receiving method 
    this.socket.on('audio_call', (msg) => {

      console.log("receive audio_call :" + JSON.stringify(msg))
      if (msg.buddy == localStorage.getItem("FlintauserID")) {

        this.callid = msg.callid;
        this.callName = msg.myname;
        this.buddyid = msg.myid


        if (msg.groupCall != null) {
          this.groupCall = msg.groupCall
        }
        else {
          this.groupCall = null;
        }
        this.callerId = msg.callerId;
        this.receiverId = msg.receiverId;

        this.typeCall = msg.typeCall

        this.buddyimage = msg.myimage
        this.buddyname = msg.buddyname

        if (this.platform.is('android')) {
          this.nativeAudio.stop(localStorage.getItem('callertone'))
        }

        if (msg.type != null) {
          // this.videocallPoup();
          this.videoCall();
        }
        else {
          this.videoCall();

          // this.audioCall();

          // this.audiocallPoup();
        }
        // /
      }
    })
  }
  async videocallPoup() {
    if (this.platform.is('android')) {
      this.nativeAudio.play(localStorage.getItem('callertone'), () => console.log('sent is done playing'));
    }
    this.loading = await this.alertController.create({
      header: 'Video Calling from ' + this.callName,
      message: "Do you accept call?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "cancelbtn",
          handler: () => {
            //something to do 
            if (this.platform.is('android')) {
              this.nativeAudio.stop(localStorage.getItem('callertone'))
            }
            var item1 = {
              callid: this.callid,
              buddyid: localStorage.getItem("FlintauserID"),
              myname: localStorage.getItem("username"),
              groupCall: this.groupCall,
            }

            // if (msg.buddy == this.Uid && msg.myid == this.buddydetails.mobile) {
            //   this.callid = msg.callid;
            //   this.callName = msg.myname;
            //   this.callPoup();
            //   // /
            // }


            this.socket.emit('reject_call', item1);
            this.loadingdismiss1();
          }
        },
        {
          text: "Accept",
          // cssClass: "confirmbtn",
          handler: () => {

            if (this.platform.is('android')) {
              this.nativeAudio.stop(localStorage.getItem('callertone'))
            }
            this.videoCall();

          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    await this.loading.present();
  }
  async loadingdismiss1() {

    // close action sheet
    try {
      const element = await this.alertController.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {
    }

    return await this.loadingController.dismiss();
  }
  async audiocallPoup() {

    if (this.platform.is('android')) {
      this.nativeAudio.play(localStorage.getItem('callertone'), () => console.log('sent is done playing'));
    }

    this.loading = await this.alertController.create({
      header: 'Audio Calling from ' + this.callName,
      message: "Do you accept call?",
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          cssClass: "cancelbtn",
          handler: () => {
            //something to do 


            if (this.platform.is('android')) {
              this.nativeAudio.stop(localStorage.getItem('callertone'))
            }

            var item1 = {
              callid: this.callid,
              buddyid: localStorage.getItem("FlintauserID"),
              myname: localStorage.getItem("username")
            }

            // if (msg.buddy == this.Uid && msg.myid == this.buddydetails.mobile) {
            //   this.callid = msg.callid;
            //   this.callName = msg.myname;
            //   this.callPoup();
            //   // /
            // }
            if (this.platform.is('android')) {
              this.nativeAudio.stop(localStorage.getItem('callertone'))
            }
            this.CallCount = true;
            this.socket.emit('reject_call', item1);
            this.loadingdismiss1();


          }
        },
        {
          text: "Accept",
          // cssClass: "confirmbtn",
          handler: () => {
            this.CallCount = true;
            if (this.platform.is('android')) {
              this.nativeAudio.stop(localStorage.getItem('callertone'))
            }
            this.audioCall();

          }
        }]
    });
    // statusalert.setTitle('Group created succesfully');
    // statusalert.setSubTitle('Your password changed successfully!!');
    if (this.loading && !this.loading._detached) {
      this.loading.dismiss();
    }

    await this.loading.present();
  }

  async loadingdismiss(): Promise<void> {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
  async videoCall() {

    var data = {
      buddy: this.buddyid,
      myid: localStorage.getItem("FlintauserID"),
      callid: this.callid,
      buddyimage: this.buddyimage,
      buddyname: this.callName,
      receive: true,
      typeCall: this.typeCall,
      groupCall: this.groupCall,
    }

    const model = await this.modalController.create({
      component: VideocallPage,
      componentProps: data
    });

    model.present();
    model.onWillDismiss().then(data => {
      this.loadingdismiss();
      this.alertController.dismiss();
    });
  }
  async audioCall() {
    this.loadingdismiss();
    var data = {
      buddy: this.buddyid,
      myid: localStorage.getItem("FlintauserID"),
      callid: this.callid,
      buddyimage: this.buddyimage,
      buddyname: this.callName,
      callerId: this.callerId,
      receiverId: this.receiverId,
      groupCall: this.groupCall,
      receive: true
    }

    const model = await this.modalController.create({
      component: VideoPage,
      componentProps: data
    });

    model.present();
    model.onWillDismiss().then(data => {
      this.loadingdismiss();
      this.alertController.dismiss();
    });
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
  requestAllPermissions() {
    const permissions = Object.keys(this.PERMISSION).map(k => this.PERMISSION[k]);
    this.diagnostic.requestRuntimePermissions(permissions).then((status) => {
      console.log("requestAllPermissions" + JSON.stringify(status));
    }, error => {
      console.log('requestAllPermissions Error: ' + error);
    });
  }
  ionViewDidEnter() {

    if (this.platform.is('android')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        success => console.log('Succes granted the permissions'),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    }
  }
}
