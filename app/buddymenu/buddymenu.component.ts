import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, PopoverController, } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-buddymenu',
  templateUrl: './buddymenu.component.html',
  styleUrls: ['./buddymenu.component.scss'],
})
export class BuddymenuComponent implements OnInit {

  blockTitle="Block";
  constructor(private Storage: Storage,private NavParams:NavParams, public navCtrl: NavController, public popoverController: PopoverController) {
    console.log("BuddymenuComponent :"+this.NavParams.get('myblocked'))
    if(this.NavParams.get('myblocked')=="true" || this.NavParams.get('myblocked')==true){
      this.blockTitle="UnBlock"
    }
    
   }

  ngOnInit() { }


  buddyinfo(value) {
    this.popoverController.dismiss({ "buddyinfo": value });
  }

}

