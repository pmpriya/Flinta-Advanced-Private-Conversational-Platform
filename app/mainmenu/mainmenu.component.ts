import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, PopoverController, } from '@ionic/angular';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss'],
})
export class MainmenuComponent implements OnInit {

  
  constructor(public popoverController: PopoverController) {
 
    
   }

  ngOnInit() { }


  buddyinfo(value) {
    this.popoverController.dismiss({ "buddyinfo": value });
  }

}
