import { Injectable } from "@angular/core";
// import { FirebaseApp } from 'angularfire2';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Badge } from '@ionic-native/badge';

@Injectable()
export class FirebaseMessagingProvider {
  private messaging;




  // AuthKey = "AAAADLdD_Ps:APA91bEUniW0h9v1I0hKJV7OJMwNLLZycRPgAHYC_P0zZ3F5iIwBc6tuGj-SDHglnafQUTOQmbexRcKbmbIa_eHUNpepvqxy-6nXCjmGSmbBb0yCFtwflPJd2ENEBFeeesadCJj0ZCMo";
  AuthKey = "AAAAhy89xtk:APA91bEQc0O2YL7ATUNZNEHuTJkrKC_AxNotEBiI9HAtbHYGxd9d1x29X2xA3lHtXeqO3jexd11fKadIPzoLuDRvLymSdKVQQnTKTuDi---lUB3r7upyYt5uSAvtsCRnGfXN2RDYLWRg";

  constructor(private http: HttpClient, public alertCtrl: AlertController) {


  }

  FCM_PLUGIN_ACTIVITY() {
    // alert("messageclick");
  }



  //Poopandi push notification trigger (single chat)
  initPushNotification(BuddyDeviceId, msg, name, txtType, MyId, count, buddyImg, buddyId) {


    let body = null;
    // var playerid = [];
    // playerid.push(BuddyDeviceId)


    let str: string = name;

    var showMessage = str[0].toUpperCase() + str.slice(1);
    if (count != 1 && count!=0) {
      showMessage = str[0].toUpperCase() + str.slice(1) + "(" + count + " messages)";
    }

    console.log("before :" + BuddyDeviceId + ":" + txtType)
    if (txtType == "text") {
      console.log("before notiication")


      body = {
        // "include_player_ids": playerid,
        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": msg,
          "large_icon": buddyImg,
          "tag": MyId,
          "collapse_id": MyId,
          "collapse_key": MyId,
          "android_group": "Flinta"
        }

      }

    }
    else if (txtType == "image" || txtType == 'JPG' || txtType == 'jpg' || txtType == 'png' || txtType == 'PNG' || txtType == 'JPEG' || txtType == 'jpeg' || txtType == 'gif' || txtType == 'GIF') {


      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "📷 Photo",
          "collapse_id": MyId,
          "collapse_key": MyId,
          "tag": MyId,

          "big_picture": msg,
          "large_icon": buddyImg,
          "android_group": MyId
        }
      }

    }

    else if (txtType == "video" || txtType == "mp4" || txtType == "avi" || txtType == "flv") {

      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "🎥 Video",
          "collapse_id": MyId,
          "collapse_key": MyId,
          "tag": MyId,

          "large_icon": buddyImg,
          "android_group": MyId
        }
      }

    }
    else if (txtType == "application" || txtType == "PDF" || txtType == "pdf" || txtType == "dotx" || txtType == "dot" || txtType == "doc" || txtType == "xls"
      || txtType == "xlsx" || txtType == "xlt" || txtType == "txt" || txtType == "TXT" || txtType == "pps" || txtType == "ppa" || txtType == "pptx") {

      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "📁 File",
          "collapse_id": MyId,
          "collapse_key": MyId,
          "tag": MyId,

          "large_icon": buddyImg,
          "android_group": MyId
        }

      }

    }
    else if (txtType == "audio" || txtType == "mp3") {

      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "🔊 Audio",
          "collapse_id": MyId,
          "collapse_key": MyId,
          "tag": MyId,

          "large_icon": buddyImg,
          "android_group": MyId
        }
      }

    }

    console.log("notifications body :" + JSON.stringify(body))
    let options = new HttpHeaders().set('Content-Type', 'application/json');

    //this.http.post("https://onesignal.com/api/v1/notifications?app_id="+this.onesignalAppId, body, {
    //https://fcm.googleapis.com/fcm/send
    //https://onesignal.com/api/v1/notifications?app_id="+this.onesignalAppId
    this.http.post("https://fcm.googleapis.com/fcm/send", body, {

      headers: options.set('Authorization', 'key=' + this.AuthKey),
    }).subscribe(resp => {

      console.log("respose :" + JSON.stringify(resp) + ":BuddyDeviceId:" + BuddyDeviceId)
      // console.log("==============:" + resp["_body"]);
      // var obj = JSON.parse(resp['_body'])
      // console.log("new one:" + JSON.stringify(obj.data) + "  ::  " + obj.token);
      // console.log("new one:" + JSON.stringify(obj.data) + "  ::  " + obj.token);
    }, error => {
      console.log("error :" + JSON.stringify(error))
      console.log(JSON.stringify(error));
    });
  }

  //Poopandi push notification trigger (group chat)
  initGroupPushNotification(BuddyDeviceId, msg, name, txtType, MyId, count, groupName, groupImg, buddyId) {



    console.log("initGroupPushNotification :" + BuddyDeviceId + ":" + name + ":" + msg)
    let body = null;
    var playerid = [];
    playerid.push(BuddyDeviceId)


    let str: string = groupName;

    var showMessage = str[0].toUpperCase() + str.slice(1);
    if (count != 0) {
      showMessage = str[0].toUpperCase() + str.slice(1) + "(" + count + " messages)";
    }
    if (txtType == "text") {
      console.log("before notiication")

      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": name + ":" + msg,
          "collapse_key": buddyId,

          "large_icon": groupImg,
          "tag": buddyId,
          "android_group": "Flinta"
        }
      }

    }
    else if (txtType == "image" || txtType == 'JPG' || txtType == 'jpg' || txtType == 'png' || txtType == 'PNG' || txtType == 'JPEG' || txtType == 'jpeg' || txtType == 'gif' || txtType == 'GIF') {


      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "📷 Photo",
          "tag": buddyId,

          "android_group": "Flinta",
          "big_picture": msg,
          "large_icon": groupImg
        }

      }

    }

    else if (txtType == "video" || txtType == "mp4" || txtType == "avi" || txtType == "flv") {

      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "🎥 Video",
          "tag": buddyId,

          "large_icon": groupImg,
          "android_group": "Flinta"
        }
      }

    }
    else if (txtType == "application" || txtType == "PDF" || txtType == "pdf" || txtType == "dotx" || txtType == "dot" || txtType == "doc" || txtType == "xls"
      || txtType == "xlsx" || txtType == "xlt" || txtType == "txt" || txtType == "TXT" || txtType == "pps" || txtType == "ppa" || txtType == "pptx") {

      body = {
        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "📁 File",
          "tag": buddyId,

          "large_icon": groupImg,
          "android_group": "Flinta"
        }

      }

    }
    else if (txtType == "audio" || txtType == "mp3") {

      body = {

        "to": BuddyDeviceId,
        "priority": "high",
        // "data": {
        //   "Flinta":"Flinta"
        // },
        "notification": {
          "sound": "default",
          "icon": "notification_icon",

          "title": showMessage,
          "body": "🔊 Audio",
          "tag": buddyId,

          "large_icon": groupImg,
          "android_group": "Flinta"
        }
      }

    }

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    //https://fcm.googleapis.com/fcm/send
    //https://onesignal.com/api/v1/notifications?app_id="+this.onesignalAppId
    this.http.post("https://fcm.googleapis.com/fcm/send", body, {
      headers: options.set('Authorization', 'key=' + this.AuthKey),
    }).subscribe(resp => {

      console.log("respose :" + JSON.stringify(resp) + ":BuddyDeviceId:" + BuddyDeviceId)
      // console.log("==============:" + resp["_body"]);
      // var obj = JSON.parse(resp['_body'])
      // console.log("new one:" + JSON.stringify(obj.data) + "  ::  " + obj.token);
      // console.log("new one:" + JSON.stringify(obj.data) + "  ::  " + obj.token);
    }, error => {
      console.log("error :" + JSON.stringify(error))
      console.log(JSON.stringify(error));
    });
  }

}