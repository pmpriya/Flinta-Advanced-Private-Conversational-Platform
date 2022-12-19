import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { PopoverController, ToastController, NavController, ModalController, ActionSheetController, AlertController, Platform, LoadingController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-multipleimageupload',
  templateUrl: './multipleimageupload.page.html',
  styleUrls: ['./multipleimageupload.page.scss'],
})
export class MultipleimageuploadPage implements OnInit {
  webFileUploadFileType: "";
  image: any;
  webFileUploadname: any;
  multiupload = [];
  MultiUploadimage = [];
  lastimage;
  fileType;
  size;
  // shareText:any;
  webFileUploadsize;
  constructor(public modelctrl: ModalController, public sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams) {
    this.multiupload = this.navParams.get("Multiimage");

    if (this.navParams.get("pasteimage") == 'paste') {

      this.handleReaderLoaded2(this.multiupload);

    }
    else {
      for (var i = 0; i < this.multiupload.length; i++) {

        console.log(this.multiupload);

        if(Math.round(this.multiupload[i].size / 1000000) > 10){
          this.modelctrl.dismiss();
          alert("Upload media file must be max 10MB or less!");
          this.multiupload = [];
        }else{
          this.fileType = this.multiupload[i].name.substring(this.multiupload[i].name.lastIndexOf(".") + 1);

          this.webFileUploadname = this.multiupload[i].name;
          this.webFileUploadFileType = this.multiupload[i].type;
  
          this.webFileUploadsize = Math.round(this.multiupload[i].size / 1024) + " KB";
          console.log("this.webFileUploadsize", this.webFileUploadsize);
          const reader = new FileReader();
          reader.onload = this.handleReaderLoaded.bind(this);
          reader.readAsBinaryString(this.multiupload[i]);
        }
      
      }
    }



    //  for(var i=0; i<this.multiupload.length; i++){


    //   this.fileType= this.multiupload[i].name.substring(this.multiupload[i].name.lastIndexOf(".") + 1);

    //   this.webFileUploadname =this.multiupload[i].name;
    //   this.webFileUploadFileType = this.multiupload[i].type;

    //   this.webFileUploadsize = Math.round( this.multiupload[i].size / 1024) + " KB"; 
    //   console.log("this.webFileUploadsize",this.webFileUploadsize);

    //     const reader = new FileReader();
    //     reader.onload = this.handleReaderLoaded.bind(this);
    //     reader.readAsBinaryString(this.multiupload[i]);
    // }

  }
  handleReaderLoaded2(bas464) {

    var imagecif = Math.floor((Math.random() * 1000000000000000) + 1);

    var imagename = "flinta" + imagecif + ".jpg";

    this.MultiUploadimage.push({
      webFileUploadFileType: 'image/jpeg',
      image: bas464,
      webFileUploadname: imagename,
      fileType: 'jpg',
      size: '6kB',
      shareText: '',
      visible:'block'
    })

    this.lastimage = this.MultiUploadimage[this.MultiUploadimage.length - 1].image;
    this.webFileUploadFileType = this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadFileType;
    this.fileType = this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadname.substring(this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadname.lastIndexOf(".") + 1);

  }
  handleReaderLoaded(e) {


    this.MultiUploadimage.push({
      webFileUploadFileType: this.webFileUploadFileType,
      image: "data:" + this.webFileUploadFileType + ";base64," + btoa(e.target.result),
      webFileUploadname: this.webFileUploadname,
      fileType: this.fileType,
      size: this.webFileUploadsize,
      shareText: '',
      visible:'block'
    })

    this.lastimage = this.MultiUploadimage[this.MultiUploadimage.length - 1].image;
    this.webFileUploadFileType = this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadFileType;
    this.fileType = this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadname.substring(this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadname.lastIndexOf(".") + 1);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MutipleimageuploadPage');
  }
  onUploadChangepop(evt: any) {

    if( this.MultiUploadimage.length!=0){
      this.MultiUploadimage.forEach(element => {
        element.visible='none'
      });
    }
    for (var i = 0; i < evt.target.files.length; i++) {
      
      this.webFileUploadname = evt.target.files[i].name;
      this.webFileUploadFileType = evt.target.files[i].type;

      this.fileType = evt.target.files[i].name.substring(evt.target.files[i].name.lastIndexOf(".") + 1);

      this.size = Math.round(evt.target.files[i].size / 1024) + " KB";
      'Size: ' + Math.round(this.size / 1024) + " KB";
      console.log("this.size", this.size);

      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(evt.target.files[i]);
    }
  }
  selectimage(item,index) {

    if( this.MultiUploadimage.length!=0){

      for (var i = 0; i < this.MultiUploadimage.length; i++) {
        if(i==index){
          this.MultiUploadimage[i].visible='block'
        }
        else{
          this.MultiUploadimage[i].visible='none'

        }
      }
     
    }

    this.lastimage = item.image;
    this.webFileUploadFileType = item.webFileUploadFileType;
    this.fileType = item.webFileUploadname.substring(item.webFileUploadname.lastIndexOf(".") + 1);

  
  }
  handleReaderLoaded1(e) {

    this.MultiUploadimage.push({
      webFileUploadFileType: this.webFileUploadFileType,
      image: "data:" + this.webFileUploadFileType + ";base64," + btoa(e.target.result),
      webFileUploadname: this.webFileUploadname,
      fileType: this.fileType,
      size: this.webFileUploadsize,
      shareText: '',
      visible:'block'

    })
    this.lastimage = this.MultiUploadimage[this.MultiUploadimage.length - 1].image;
    this.webFileUploadFileType = this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadFileType;
    this.fileType = this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadname.substring(this.MultiUploadimage[this.MultiUploadimage.length - 1].webFileUploadname.lastIndexOf(".") + 1);

  }

  sendImages() {

    console.log("MultiUploadimage : " + JSON.stringify(this.MultiUploadimage));
    this.modelctrl.dismiss({ images: this.MultiUploadimage });
  }
  dismissModal() {
    this.modelctrl.dismiss();
  }
  uploadclosedata(item, index) {

    this.MultiUploadimage.splice(index, 1)
  }
  ngOnInit() {
  }

}
