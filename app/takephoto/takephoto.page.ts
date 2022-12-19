/**
 * Display camera to Take picture
 */

import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { PopoverController, ToastController, NavController, ModalController, ActionSheetController, AlertController, Platform, LoadingController,NavParams } from '@ionic/angular';
import {CropphotoPage} from '../cropphoto/cropphoto.page'
@Component({
  selector: 'app-takephoto',
  templateUrl: './takephoto.page.html',
  styleUrls: ['./takephoto.page.scss'],
})
export class TakephotoPage implements OnInit {

  @ViewChild('video')

  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;
  capuredeafter:boolean=true;
  capuredebefore:boolean=false;

  public captures;
  myCaptureImage:any;

  /**
 * Constructor
 */


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl:ModalController) {

    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        
          this.video.nativeElement.play();
      });

  }

  }
  async ngOnInit() {

  }

  /**
 * Event fired on capturig the photo
 */


 async  capture() {
    
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures=this.canvas.nativeElement.toDataURL("image/png");
    if(this.captures){

      this.myCaptureImage=this.captures;

    
  
    }
    console.log('this.captures',this.captures)
    this.capuredeafter=false;
    this.capuredebefore=true;
    let stream = this.video.nativeElement.srcObject;
    let tracks = stream.getTracks();
  
    tracks.forEach(function(track) {
      track.stop();
    });
  
    this.video.nativeElement.srcObject = null;
   
}
  /**
   * On Canceling the photo
   */


dismiss(){
  let stream = this.video.nativeElement.srcObject;
  let tracks = stream.getTracks();

  tracks.forEach(function(track) {
    track.stop();
  });

  this.video.nativeElement.srcObject = null;
  this.modalCtrl.dismiss();
 
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad TakephotoPage');
  }
  sendpic(){

    this.modalCtrl.dismiss(this.captures);

  }

  dismissModal() {
    console.log("entered")
    this.modalCtrl.dismiss();
 
  }

}
