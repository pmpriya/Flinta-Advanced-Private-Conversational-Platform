import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController,ModalController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';
import { NetworkService, ConnectionStatus } from '../network.service';
import { AuthenticationService } from '././../services/Authentication.service';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { parseJSON } from 'jquery';
import { ThemeSwitcherService } from '../theme-switcher.service';
import { Socket } from 'ngx-socket-io';
declare var window;
import * as CryptoJS from 'crypto-js';

import { ChangepwdPage } from '../changepwd/changepwd.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  allusers: any;
  checkFlag: boolean = false;
  audio: any;

  phone: any;
  password: any;
  loginres: any;
  userdata: any;
  showValue: any;
  Remember: any;
  
  crypto_password = 'd6F3Efeq';


  constructor(private modelctrl:ModalController,private socket: Socket, private loadingController: LoadingController, private alertController: AlertController, private BuddyChatProvider: BuddyChatProvider, private platform: Platform, private authService: AuthenticationService, public navCtrl: NavController, private service: ApiserviceService, private networkService: NetworkService, public themeSwitcher: ThemeSwitcherService) {
    console.log(this.networkService.getCurrentNetworkStatus())
    this.showValue = { "type": "password", "text": "Show" };
    
    
    
    
    
    
  }
  
  convertText(conversion: string, plainText: string) {
    if (conversion == "encrypt") {
      return CryptoJS.AES.encrypt(plainText.trim(), this.crypto_password.trim()).toString();
    }
    else {
      return CryptoJS.AES.decrypt(plainText.trim(), this.crypto_password.trim()).toString(CryptoJS.enc.Utf8);

    }
  }

  
  showPassword() {
    if (this.showValue.type == "password") {
      this.checkFlag = true;
      this.showValue = { "type": "text", "text": "Hide" }
    } else {
      this.checkFlag = false;
      this.showValue = { "type": "password", "text": "Show" }
    }
  };
  ionViewDidEnter() {
    

    if (window.localStorage.getItem("username") != null && window.localStorage.getItem("username") != '' && window.localStorage.getItem("username") != 'null' && window.localStorage.getItem("password") != null) {
      this.phone = window.localStorage.getItem("username");
      this.password = window.localStorage.getItem("password");
      this.Remember = true;
    }
  }
  remeberpassword(Remember) {
    
    console.log("userall :" + Remember)

    if (this.Remember == true) {
      window.localStorage.setItem("username", this.phone);
      window.localStorage.setItem("password", this.password);
    } else {
      window.localStorage.setItem("username", null);
      window.localStorage.setItem("password", null);
    }

  }
  ngOnInit() {
    this.socket.connect();
    window.history.go(-1);


  }

  async login() {
    console.log("this.password :" + this.password + ":" + this.phone)
    if ((this.password == undefined && this.phone == undefined) || (this.password == '' && this.phone == '')) {
      this.service.presentToast("Please Enter Mobile Number and Password");
    }

    else if (this.phone == undefined || this.phone == '') {
      this.service.presentToast("Please Enter Mobile Number");
    }
    else if (this.password == undefined || this.password == '') {
      this.service.presentToast("Please Enter Password");
    }
    else if (this.networkService.CurrentStatus == true) {
      var data = {
        mobile: this.phone,
        password: this.password
      }

      this.service.PostRequest(this.service.mainAPI + '/login_mobile', data).then(async res => {
        this.authService.loginFLow = true;
        console.log("login:" + JSON.stringify(res))
        console.log(res);
        this.userdata = res;
        if (this.userdata && this.userdata.length > 0) {
          
          localStorage.setItem('name', this.userdata[0].username);
          localStorage.setItem('mobile', this.userdata[0].mobile);
          localStorage.setItem('FlintauserID', this.userdata[0].mobile);
          localStorage.setItem('password', this.userdata[0].password);
          localStorage.setItem('photourl', this.userdata[0].photourl);
          localStorage.setItem("username", this.userdata[0].username)
          localStorage.setItem("email", this.userdata[0].email)
          localStorage.setItem("designation", this.userdata[0].designation);
          localStorage.setItem('experts', this.userdata[0].experts);
          localStorage.setItem('compid', this.userdata[0].compid);
          
          localStorage.setItem('adminlogin', this.userdata[0].adminlogin);
          localStorage.setItem('callertone', 'calling');
          this.BuddyChatProvider.updatemystatus(this.userdata[0].mobile, "online", new Date().getTime(), this.networkService.DeviceId);

          var todo = {
            uid: this.userdata[0].mobile,
            backclick: true
          }
          this.socket.emit('recentmessgae', todo);
      
        
          
          
          
          if (this.userdata[0].logged == null && (this.userdata[0].userstatus == null || this.userdata[0].userstatus == "A")) {

            var obj1 = {
              "logininfo": res,
              "loginflow": true
            }
            this.authService.setLoggedUserInfo(null)
            
            const model = await this.modelctrl.create({
              component: ChangepwdPage,
              cssClass: 'popupmodal',
              componentProps: {
               
                queryParams: obj1,
        
              },
              backdropDismiss:false
  
            });
        
            model.present();
            model.onWillDismiss().then(data => {
        
            });
          }
          else  if (this.userdata[0].userstatus == null || this.userdata[0].userstatus == "A") {
              
              
              
              
              
              
              
              
              
                console.log("login 2:" + JSON.stringify(res))

              
              this.authService.setLoggedUserInfo(res)
              
              this.navCtrl.navigateRoot('webchat');
              
            }
            else {
              this.service.presentToast("Your Login Id has been Blocked , Please Contact Your Admin")
            }

        }
      }, err => {
        console.log(err);
        if (err.status == 404) {
          this.service.presentAlert("Alert", "Invalid User!");
        }
        if (err.error.text == "Incorrect Username and Password") {
          this.service.presentToast("Incorrect Username or Password");
        }
      })

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    }
    else {
      this.service.presentAlert("Network Problem", "Please check your network connectivity");
    }
  }

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
  async forgotPassword() {
    var alert = await this.alertController.create({
      cssClass: 'popupg',
      message: 'Please Enter Mobile Number',
      inputs: [
        {
          name: 'otp',
          type: 'number',
          placeholder: 'Mobile Number'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

          handler: (blah) => {
            
          }
        }, {
          text: 'Confirm',

          handler: (input) => {
            console.log("input.otp :" + input.otp)
            if (input.otp != null && input.otp != '') {
              var obj = {
                mobile: input.otp
              }

              this.service.PostRequest(this.service.mainAPI + '/forgotpass', obj).then(resp => {

                if (resp["flag"] == "1") {
                  this.presentLoadingWithOptions();

                  var getdta = parseJSON(resp["data"])
                  var newotp = Math.floor(Math.random() * 90000) + 10000;
                  var obj = {
                    password: newotp.toString(),
                    mobile: input.otp
                  }

                  this.service.PostRequest(this.service.mainAPI + '/newPassword', obj).then(resp => {


                  }).catch(error => {
                    var obj = {
                      mobile: input.otp,
                      username: getdta[0].username,
                      newotp: newotp,
                      email: getdta[0].email,
                    };
                    this.service.PostRequest(this.service.mainAPI + '/send_mail_sms', obj).then(res => {
                      this.loadingdismiss();

                      console.log("Senting ..otp email:" + res);

                      this.service.presentAlert("", 'Your Temporary Password Shared To Your Email/Mobile Number');

                      
                      
                      

                      

                      
                      

                      

                    }, error => {
                      this.loadingdismiss();

                      this.service.presentAlert("", 'Your Temporary Password Shared To Your Email/Mobile Number');

                      
                      
                      

                      

                      
                      

                      
                    });
                  })
                }
                else {
                  this.forgotPassword();
                  this.service.presentAlert("", 'Please Enter Registered Mobile Number');
                }
              })
            }
            else {
              this.forgotPassword();

              this.service.presentAlert("", 'Please Enter Mobile Number');
            }

          }
        }
      ]
    });
    await alert.present();
  }
  move2register() {
    this.navCtrl.navigateRoot('signup');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',

      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',


    });
    return await loading.present();
  }
  async loadingdismiss() {

    return await this.loadingController.dismiss();
  }
}

