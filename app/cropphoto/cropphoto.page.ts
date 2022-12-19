import { Component, OnInit,ViewChild } from '@angular/core';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { PopoverController, ToastController, NavController, ModalController, ActionSheetController, AlertController, Platform, LoadingController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cropphoto',
  templateUrl: './cropphoto.page.html',
  styleUrls: ['./cropphoto.page.scss'],
})
export class CropphotoPage implements OnInit {

  data:any;
  myCaptureImage:any;
  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;
  cropperSettings: CropperSettings;
  file:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modelctrl:ModalController) {

    
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.data = {};

    let myImage = this.navParams.get('myImage');
    this.myCaptureImage = this.navParams.get('myCaptureImage');
    
    console.log('myImage',myImage)
    if(myImage){
      this.fileChangeListener(myImage)
    } 
    
    
  }

  onUploadChange(evt: any) {
    console.log('evt@@@@@@@@@@@@@@@@@@', evt)
    const file = evt.target.files[0];
    if (evt) {
      this.fileChangeListener(evt)
    }
  }

  fileChangeListener($event) {
    var image:any = new Image();
    console.log('image',image)
    var file:File = $event.target.files[0];
    console.log('file',file)
    var myReader:FileReader = new FileReader();
    
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      console.log('loadEvent',loadEvent)
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
 
    };
 
    myReader.readAsDataURL(file);
}

imageEvent($event) {
  console.log('$event',$event)
  var image:any = new Image();
  console.log('image',image)
  this.file = $event.path[0].currentSrc;
 // this.cropper.setImage(file);
  
}


dismiss() {
   this.modelctrl.dismiss();
 }

 sendpic(){
   console.log('this.data.image',this.file)
  this.modelctrl.dismiss(this.file);
}

  ngOnInit() {
  }

}
