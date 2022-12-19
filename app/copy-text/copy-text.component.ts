import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, PopoverController, } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-copy-text',
  templateUrl: './copy-text.component.html',
  styleUrls: ['./copy-text.component.scss'],
})
export class CopyTextComponent implements OnInit {

  constructor(private Storage: Storage,private NavParams:NavParams, public navCtrl: NavController, public popoverController: PopoverController) {
    console.log("BuddymenuComponent :"+this.NavParams.get('myblocked'))
 
    
   }

  ngOnInit() { }


  buddyinfo(value) {
    this.popoverController.dismiss({ "buddyinfo": value });
  }
}
