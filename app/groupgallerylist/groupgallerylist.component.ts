import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, PopoverController, } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-groupgallerylist',
  templateUrl: './groupgallerylist.component.html',
  styleUrls: ['./groupgallerylist.component.scss'],
})
export class GroupgallerylistComponent implements OnInit {

  constructor(private Storage: Storage,private NavParams:NavParams, public navCtrl: NavController, public popoverController: PopoverController) {
   
    
  }

 ngOnInit() { }


 buddyinfo(value) {
  
   this.popoverController.dismiss({ "buddyinfo": value });
 }
}
