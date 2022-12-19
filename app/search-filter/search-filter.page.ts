import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { GruopChatProvider } from "../../providers/ServerDb/groupChat";
import { EventsService } from '../events.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {

  groupmembers = [];
  contactsSelected: any;


  fromdate: any;
  todate: any;
  todayDate: any;

  constructor(public events: EventsService, public modalController: ModalController, private navParams: NavParams) {
    this.contactsSelected = [];
    this.todayDate = new Date().toISOString().split('T')[0];

    var today = new Date();
    this.fromdate = today.toISOString().substr(0, 10);

    this.todate = today.toISOString().substr(0, 10);

    this.groupmembers = [];
    if (this.navParams.get("groupmembers") != null) {
      this.groupmembers = this.navParams.get("groupmembers");
      this.groupmembers.forEach(element => {
        element.selected = false;
      });
    }
  }

  async closeModal() {
    await this.modalController.dismiss({ "flag": "0" });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GrpchatfilterPage');
    // this.groupmembers = this.navParams.get("groupmembers");
  }

  change(contact) {

    if (contact.selected) {
      this.contactsSelected.push(contact);
    }
    else {
      this.contactsSelected.pop(contact);
    }
    console.log("contactsSelected : " + JSON.stringify(this.contactsSelected))

  }

  Showall() {
  

    this.modalController.dismiss(
      {
        person: this.contactsSelected,
        fromdate: this.fromdate,
        todate: this.todate
      });

  }


  ngOnInit() {
  }

}
