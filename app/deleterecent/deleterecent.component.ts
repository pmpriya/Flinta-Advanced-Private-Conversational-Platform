import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, PopoverController, } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-deleterecent',
  templateUrl: './deleterecent.component.html',
  styleUrls: ['./deleterecent.component.scss'],
})
export class DeleterecentComponent implements OnInit {
 
  constructor(private Storage: Storage,private NavParams:NavParams, public navCtrl: NavController, public popoverController: PopoverController) {
    console.log("BuddymenuComponent :"+this.NavParams.get('myblocked'))
 
    
   }

  ngOnInit() { }


  buddyinfo(value) {
    this.popoverController.dismiss({ "buddyinfo": value });
  }
}
