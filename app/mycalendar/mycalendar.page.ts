// import { CalendarComponent, } from 'ionic2-calendar/calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';
import { ApiserviceService } from '../apiservice.service';
import { ContactlistPage } from '../contactlist/contactlist.page';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-mycalendar',
  templateUrl: './mycalendar.page.html',
  styleUrls: ['./mycalendar.page.scss'],
})
export class MycalendarPage implements OnInit {
  
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
 
  minDate = new Date().toISOString();
 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  myeventres:any;
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, public service:ApiserviceService,public modalController:ModalController,public navCtrl:NavController,) { }

  ngOnInit() {
    this.resetEvent();
    this.getmyevents();
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  goback(){
    this.navCtrl.navigateRoot('/home');
  }

  getmyevents(){
    var data = {
      myno:localStorage.getItem('mobile')
    }
    this.service.PostRequest(this.service.mainAPI+'/getmyevents',data).then(res=>{
      console.log(res);
      this.myeventres = res;
      for(let i = 0;i<this.myeventres.length;i++){
        var getstarttime=new Date(this.myeventres[i].starttime);
        var event = {
          title: this.myeventres[i].title,
          startTime: new Date(this.myeventres[i].starttime),
          endTime: new Date(this.myeventres[i].endtime),
          // allDay: this.event.allDay,
          desc: this.myeventres[i].description,
          eventkey:this.myeventres[i].eventkey,
        }
        this.eventSource.push(event);
        this.myCal.loadEvents();
      }
      console.log(this.eventSource);
      // this.eventSource = this.myeventres;
      // this.myCal.loadEvents();
    },err=>{
      console.log(err);
    })
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-")+" "+this.tConv24(date.getHours()+":"+date.getMinutes());
  }
  tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    var hour = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = hour + ts.substr(2, 3) + ampm;
    return ts;
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay,
      desc: this.event.desc
    }
 
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    var data ={
      title:this.event.title,
      eventkey:localStorage.getItem('mobile')+"_"+new Date().getTime(),
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      desc: this.event.desc,
      createdby:localStorage.getItem('mobile'),
      createdby_name:localStorage.getItem('name')
    }

    this.service.PostRequest(this.service.mainAPI+'/add_event',data).then(res=>{
      console.log(res);
    },err=>{
      console.log(err);
      if(err.error.text=="insert successfully"){
        this.service.presentToast("New Event Added Successfully!")
      }
    })
 
    this.eventSource.push(eventCopy);
    console.log(this.eventSource);
    this.myCal.loadEvents();
    this.resetEvent();
  }

   // Change current month/week/day
 next() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slideNext();
}
 
back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 
// Change between month/week/day
changeMode(mode) {
  this.calendar.mode = mode;
}
 
// Focus today
today() {
  this.calendar.currentDate = new Date();
}
 
// Selected date reange and hence title changed
onViewTitleChanged(title) {
  this.viewTitle = title;
}
 
// Calendar event was clicked
async onEventSelected(event) {
  console.log("onEventSelected "+JSON.stringify(event));

  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'M/d/yy, h:mm a', this.locale);
  let end = formatDate(event.endTime, 'M/d/yy, h:mm a', this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    cssClass: 'my-custom-class',
    message: 'From: ' + start + '<br>To: ' + end,
    buttons: [
      {
      text: 'share invite',
      handler: () => {
        this.opencontacts(event);
        console.log('Confirm Cancel');
      }
    }, {
      text: 'Ok',
      handler: () => {
        console.log('Confirm Ok');
      }
    }
    ]
  });
  alert.present();
}

async opencontacts(data){
  const modal = await this.modalController.create({
    component: ContactlistPage,
    componentProps: data
  });
  
  modal.onDidDismiss().then((dataReturned) => {

  });

  return await modal.present();
}
 
// Time slot was clicked
onTimeSelected(ev) {
  let selected = new Date(ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours() + 1);
  this.event.endTime = (selected.toISOString());
}

}
