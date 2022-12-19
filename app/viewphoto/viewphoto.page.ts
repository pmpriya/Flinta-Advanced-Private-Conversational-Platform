/**
 * This dialog will be shown while viewing the image
 */

import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-viewphoto',
  templateUrl: './viewphoto.page.html',
  styleUrls: ['./viewphoto.page.scss'],
})
export class ViewphotoPage implements OnInit {
  image: any;
  filename: any;
  constructor(public navParams: NavParams, public modalctrl: ModalController) {
    this.image = this.navParams.get('photo');
    this.filename = this.GetFilename1(this.image)

  }
  GetFilename1(path) {
    path = path.substring(path.lastIndexOf("/") + 1);
    return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
  }
  ngOnInit() {
  }
  dismissModal() {
    this.modalctrl.dismiss();
  }

}
