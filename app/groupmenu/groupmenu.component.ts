import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, PopoverController, } from '@ionic/angular';

@Component({
  selector: 'app-groupmenu',
  templateUrl: './groupmenu.component.html',
  styleUrls: ['./groupmenu.component.scss'],
})
export class GroupmenuComponent implements OnInit {

  constructor(private NavParams:NavParams, public navCtrl: NavController, public popoverController: PopoverController) {

  }

  ngOnInit() {}

  
  buddyinfo(value) {
    this.popoverController.dismiss({ "buddyinfo": value });
  }
}
