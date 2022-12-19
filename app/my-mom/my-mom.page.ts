import { Component, OnInit ,Inject, LOCALE_ID } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ContactlistPage } from '../contactlist/contactlist.page';
// import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-my-mom',
  templateUrl: './my-mom.page.html',
  styleUrls: ['./my-mom.page.scss'],
})
export class MyMomPage implements OnInit {

  public employee_details:any=[];
  msg:any='';
  calledby:any;
  agenda:any;
  attendes:any;
  discussion:any;
  conclusion:any;
  contact_res:any;
  contacts:any = [];
  my_no:any;
  tot_attendes:any='';
  groupmom:any;
  compid:any;
  constructor(private service:ApiserviceService,public router : Router,@Inject(LOCALE_ID) private locale: string,public modalController:ModalController) { 
    this.my_no = localStorage.getItem('mobile');
    this.compid=localStorage.getItem('compid');
  }

  ngOnInit() {
    this.getallcontacts();
  }

  remove_app(i){
    this.employee_details.splice(i,1);
    console.log(this.employee_details);
  }

  add_employee(){
    this.employee_details.push({
     'name':'',
     'task':'',
     'deadline':''
    });
}

// portChange(event: {
//   component: IonicSelectableComponent,
//   value: any
// }) {
//   console.log('port:', event.value);
// }

// portChange(event: { component: SelectSearchable, value: any }) {
//   console.log('value:', event.value);
// }

async opencontacts(data){
  data={
    event:'mom',
    attendees:this.attendes
  }
  const modal = await this.modalController.create({
    component: ContactlistPage,
    componentProps: data
  });
  
  modal.onDidDismiss().then((recvdata) => {
    console.log(recvdata);
    this.attendes = recvdata.data;
    if(this.attendes.length!=0){
      this.tot_attendes = '';
      for(let i =0;i<this.attendes.length;i++){
        this.tot_attendes += this.attendes[i].username+', '
      }
    }else{
      this.tot_attendes = '';
    }
  });

  return await modal.present();
}

save(){
  console.log(this.calledby,this.agenda,this.tot_attendes,this.discussion,this.conclusion,this.msg);
  for(let i =0;i<this.employee_details.length;i++){
    if(this.employee_details[i].name!=''||this.employee_details[i].task!=''||this.employee_details[i].deadline!=''){
      this.msg += '<b>'+this.employee_details[i].name +'</b><br/>Task: <br/>'+this.employee_details[i].task+ '<br>Deadline: </br>'+formatDate(this.employee_details[i].deadline, 'd/M/yy, h:mm a', this.locale)+'<br><br>'
    }else{
      this.service.presentToast("Please fill employee task details!");
    }
  }
  // if(this.attendes.length!=0){
  //   for(let i =0;i<this.attendes.length;i++){
  //     this.tot_attendes += this.attendes[i].username+','
  //   }
  // }else{
  //   this.service.presentToast("Please select attendees of the Meeting!");
  // }
 
 
 
if(this.calledby!=undefined&&this.agenda!=undefined&&this.tot_attendes!=''&&this.discussion!=undefined&&this.conclusion!=undefined&&this.msg!=''){
  this.groupmom = '<b>Called By:</b> '+this.calledby+'<br/><br/><b>Agenda:</b> '+this.agenda+'<br/><br/><b>Attendees:</b> '+this.tot_attendes+'<br/><br/><b>Discussion:</b> '+this.discussion+'<br/><br/><b>Conclusion:</b> '+this.conclusion+'<br/><br/><b>Action Plan:</b><br/> '+this.msg;
  var data = {
    msg:this.groupmom
  }
  this.router.navigate(['/grouplist'],{
    queryParams: data,
    });
  console.log(data);
}else{
  this.service.presentToast("Please provide all necessary details");
}
  
  
}

getallcontacts(){
  var data={
    compid:this.compid
  }
    this.service.PostRequest(this.service.mainAPI + '/getUserMstComp',data).then(res => {
      if(res['status']!=0){
    console.log(res);
    this.contact_res = res;
    this.contact_res.sort((a, b) => a.username.localeCompare(b.username))
    this.contact_res.forEach(element => {
      if(element.mobile!=this.my_no){
        this.contacts.push(element);
      }
      this.contacts.sort((a, b) => a.username.localeCompare(b.username))
    });
  }
  }, err => {
    console.log(err);
  })
}

}
