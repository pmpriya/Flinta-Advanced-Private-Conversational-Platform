import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, PopoverController, } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-gallerylist',
  templateUrl: './gallerylist.component.html',
  styleUrls: ['./gallerylist.component.scss'],
})
export class GallerylistComponent implements OnInit {


  constructor(private Storage: Storage,private NavParams:NavParams, public navCtrl: NavController, public popoverController: PopoverController) {
   
    
   }

  ngOnInit() { }


  buddyinfo(value) {
    
    this.popoverController.dismiss({ "buddyinfo": value });
  }
}
