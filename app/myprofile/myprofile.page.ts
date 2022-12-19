import { Component, OnInit } from '@angular/core';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { NavController, LoadingController, Platform, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { Media, MediaObject } from '@ionic-native/media/ngx';
import { ApiserviceService } from '../apiservice.service';
import { HttpClient } from '@angular/common/http/';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { LoginProvider } from "../../providers/ServerDb/loginprovider";
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Socket } from 'ngx-socket-io';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {
  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true //Corrects Android orientation quirks
  }
  buddydetails: any;
  tones = [{ name: 'Calling', value: 'calling' }, { name: 'Flame', value: 'flame' }, { name: 'Hello', value: 'hello' }, { name: 'Lumia', value: 'lumia' }];
  calltone = localStorage.getItem('callertone');
  oldtone = localStorage.getItem('callertone');
  colorCode:any;
  constructor(private themeSwitcher:ThemeSwitcherService, private photoViewer: PhotoViewer, private socket: Socket, private nativeAudio: NativeAudio, private LoginProvider: LoginProvider, private Base64: Base64, private crop: Crop, private http: HttpClient, private service: ApiserviceService, private camera: Camera, private loadingCtrl: LoadingController, private actionSheet: ActionSheetController, public sanitizer: DomSanitizer, private BuddyChatProvider: BuddyChatProvider) {
    this.BuddyChatProvider.getMyProfileinfo(localStorage.getItem("FlintauserID")).then(res => {
      console.log("my info :" + JSON.stringify(res))
      this.buddydetails = res[0]

    })
  }

  ngOnInit() {
  
    this.colorCode={'color': this.themeSwitcher.DayColorCode}

  }
  ionViewWillLeave(){
    this.stoptone()
  }

  ionViewDidLeave()
  {
    this.stoptone()
  }

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

  updateImage() {

    var d = Number(new Date().getHours());

    var colorStyle=null,colorStyleColor=null;
    if (d >= 6 && d < 18) {
      colorStyle="EditionIcon1"
      colorStyleColor="action-sheets-groups-page1"
    } else {
      colorStyle="EditionIcon"
      colorStyleColor="action-sheets-groups-page"
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
            this.photoViewer.show(this.buddydetails.photourl);

          }
        },
        {
          cssClass: colorStyle,
          text: 'Take photo',
          icon: 'camera-outline',
          handler: () => {
            this.cameraImage();
          }
        },
        {
          cssClass: colorStyle,
          text: 'Choose photo from Gallery',
          icon: 'aperture-outline',
          handler: () => {
            this.openGallery();
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
  //Poopandi camera  

  removePhoto() {
    localStorage.setItem('photourl', "default");

    this.LoginProvider.updateImage("default", localStorage.getItem("FlintauserID")).then(res => {

    }).catch(err => {
    })

   
    this.buddydetails.photourl = "default"

    var obj =
      { "example": "" }

    this.socket.emit('profile_changes', obj);
  }

  openGallery() {

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

  udpateImage(base64Image) {

    this.presentToast();
    console.log("base64Image :" + base64Image)
    this.buddydetails.photourl = base64Image;
    // localStorage.setItem('photourl',base64Image);
    var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

    var imagename = "Flinta_profile" + imagecif + ".jpg";
    var file = this.dataURLtoFile(base64Image, imagename);
    var url = this.service.mainAPI + '/uploadflintaimage';
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
          this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("FlintauserID")).then(res => {

          }).catch(err => {
            this.loadingdismiss();
          })

      
        },
        // success,
        (err) => {

          var obj =
            { "example": "" }

          this.socket.emit('profile_changes', obj);

          this.loadingdismiss();
          this.buddydetails.photourl = this.service.ImagePath + imagename;
          localStorage.setItem('photourl', this.service.ImagePath + imagename);

          this.LoginProvider.updateImage(this.service.ImagePath + imagename, localStorage.getItem("FlintauserID")).then(res => {

          }).catch(err => {
            this.loadingdismiss();
          })

        })
  }
  cameraImage() {

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

  async presentToast() {
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
}
