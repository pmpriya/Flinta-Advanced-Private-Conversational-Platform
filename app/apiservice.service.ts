import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  ImagePath: any;
  mainAPI: any;
  smsLink: any;
  // socketconfig: any;
  public _content: string;
  crypto_password = 'd6F3Efeq';

  constructor(public http: HttpClient, public alertController: AlertController, public toastController: ToastController, private localNotifications: LocalNotifications) {

    // this.ImagePath = "http://192.168.0.127/Testntiremydesk/Uploaddocu/SSTPL/";

  //  this.mainAPI = "http://192.168.0.127:8153";
      // this.mainAPI = "http://192.168.0.127:8153";
    this.mainAPI = "http://192.168.0.127:8153";
    this.ImagePath = this.mainAPI+"/uploadFiles/";
   
      //  this.ImagePath = "http://192.168.0.127/ntiremydesk/Uploaddocu/SSTPL/";
      //   this.mainAPI = "http://192.168.0.127:8153";

    this.smsLink = "https://apps.vibgyortel.in/apps/sendsms.jsp?user=sunsmt&password=Otpsun@2020&&mobiles=";

    console.log("ApiserviceService :" + this.convertText("encrypt", "Bhargavi") + ":" + this.convertText("decript", "U2FsdGVkX19XG2B9yhDFPwbW5J/02GGYyfFPUuiKjnc="))

  }

  //flinta COUCH-DB POST REquest
  //  public PostRequest(url, param) {
  //   return new Promise((resolve, reject) => {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type':  'application/json',
  //         'Authorization': 'Basic '+window.btoa('ssg:ssgflinta')
  //       })
  //     }
  //       this.http.post(url, param, httpOptions).subscribe(resp => {
  //           resolve(resp);
  //       }, error => {
  //           reject(error);
  //       });
  //   });
  // }
  //Encription and Decription
  //method is used to encrypt and decrypt the text  
  convertText(conversion: string, plainText: string) {
    if (conversion == "encrypt") {
      return CryptoJS.AES.encrypt(plainText.trim(), this.crypto_password.trim()).toString();
    }
    else {
      return CryptoJS.AES.decrypt(plainText.trim(), this.crypto_password.trim()).toString(CryptoJS.enc.Utf8);

    }
  }
  encryptText(plainText: string) {
      return CryptoJS.AES.encrypt(plainText, this.crypto_password).toString();
  }
  decryptText(plainText: string) {
    return CryptoJS.AES.decrypt(plainText, this.crypto_password).toString(CryptoJS.enc.Utf8);
  }

  public PostRequest(url, param) {
    return new Promise((resolve, reject) => {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post(url, param, {
        headers: options,
      }).subscribe(resp => {
        resolve(resp);
      }, error => {
        reject(error);
      });

    });
  }

  public GetRequest(url) {
    return new Promise((resolve, reject) => {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.http.get(url, {
        headers: options,
      }).subscribe(resp => {
        resolve(resp);
      }, error => {
        reject(error);
      });
    });
  }
  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      cssClass: "toastcss",
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  setremainder(title, time) {
    let today = new Date().toLocaleDateString();
    if (new Date(time).toLocaleDateString() == today) {
      var notif_time = new Date(time).getTime() - 300000;
      console.log(new Date(time));
      this.localNotifications.schedule({
        text: title,
        trigger: { at: new Date(notif_time) },
        led: 'FF0000',
        sound: 'file://src/assets/mp3/reminder.mp3',
        lockscreen: true,
        foreground: true
      });
    }
  }
}
