import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastController, NavController, NavParams, ModalController } from '@ionic/angular';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-assigntask',
  templateUrl: './assigntask.page.html',
  styleUrls: ['./assigntask.page.scss'],
})
export class AssigntaskPage implements OnInit {
  public taskdetails: any;
  taskdata: any;
  buddyname: any;
  status: any;
  user: any;
  assign_to: any;
  assign_to_no: any;
  my_no: any;
  empSerach:any;
  selectempCode: any;
  contacts: any = [];
  empCodeList1=[];
  contact_res: any;
  statusoption = []
  message_id: any;
  compid:any;
  constructor(public activatedRoute: ActivatedRoute, private socket: Socket, private toastCtrl: ToastController, private service: ApiserviceService, public navCtrl: NavController, private navParams: NavParams, private modalController: ModalController,) {
    this.my_no = localStorage.getItem('mobile');
    this.compid=localStorage.getItem('compid');
  }

  async ngOnInit() {
    console.log(this.navParams);
    this.taskdata = this.navParams.data.msg_data;
    console.log("taskdata :" + JSON.stringify(this.taskdata))
    this.statusoption = [
      { name: "Assign", value: "1" },

    ]
    this.status='1';
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    await this.getallcontacts();
    
    
    
    
    
    

    
    
    
    
    

  }

  async getallcontacts() {
    var data={
      compid:this.compid
    }
     await this.service.PostRequest(this.service.mainAPI + '/getUserMstComp',data).then(res => {
      if(res['status']!=0){
     console.log(res);
      this.contact_res = res;
      this.contact_res.forEach(element => {
        if (element.mobile != this.my_no) {
          this.contacts.push(element);
        }
        
      });
      this.contacts.sort((a, b) => a.username.localeCompare(b.username))
    }
      
    }, err => {
      console.log(err);
    })
  }
  SearchValue(searchbar) {
    console.log("this.empSerach.length :"+this.empSerach.length)

    if (this.empSerach == undefined || this.empSerach.length == 0 || this.empSerach.length <2) {
      this.empCodeList1 = []
      this.selectempCode = null;
    }
    else {
      this.empCodeList1 = this.contacts;

      this.empCodeList1 = this.empCodeList1.filter((item) => {
        return (item.username.toLowerCase().indexOf(this.empSerach.toLowerCase()) > -1);
      })
      console.log("serach value" + this.empSerach)
    }

  }
  selectedvalue(mobile, username) {
    console.log("click:"+mobile+":"+username)
    this.empCodeList1 = []
    this.empSerach = username;
    this.selectempCode = mobile;
  }
  onCancel(event) {
    console.log('CANCEL', event);
    this.empCodeList1 = []
    this.empSerach =undefined;
    this.selectempCode=undefined;
  }
  assigntask() {
    console.log("from_date :" + (<HTMLInputElement>document.getElementById('from_date')).value, this.assign_to, this.status);
    var d = new Date;
    
    if ( this.status != undefined
      && (<HTMLInputElement>document.getElementById('due_date')).value != "" &&
      this.empSerach!=undefined && this.selectempCode !=undefined
      && (<HTMLInputElement>document.getElementById('due_date')).value != null
      && (<HTMLInputElement>document.getElementById('due_date')).value != undefined
      && (<HTMLInputElement>document.getElementById('from_date')).value != ""
      && (<HTMLInputElement>document.getElementById('from_date')).value != undefined
      && (<HTMLInputElement>document.getElementById('esti_time')).value != ""
      && (<HTMLInputElement>document.getElementById('esti_time')).value != undefined) {
      if (this.taskdata.message_id == undefined) {
        this.message_id = this.taskdata.groupkey
      } else {
        this.message_id = this.taskdata.message_id
      }
      var data = {
        message_id: this.message_id,
        message: this.taskdata.message,
        assigned_by: localStorage.getItem('username'),
        assigned_by_no: localStorage.getItem('mobile'),
        
        
        assigned_to: this.empSerach,
        assigned_to_no:  this.selectempCode,

        assigned_at: String(new Date().getDate() + '-' +   (new Date().getMonth() + 1)+ '-' + new Date().getFullYear()),
        completed_at: '',
        due_at: (<HTMLInputElement>document.getElementById('due_date')).value,
        from_date: (<HTMLInputElement>document.getElementById('from_date')).value,
        esti_time: (<HTMLInputElement>document.getElementById('esti_time')).value,
        status: this.status
      }
      console.log(data);
      this.service.PostRequest(this.service.mainAPI + '/add_task', data).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
        if (err.error.text == "insert successfully") {
          this.service.presentToast("Task Created Successfully!");
          this.modalController.dismiss();
        }
      })
    } else {
      this.service.presentToast("Please Input all Details!");
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
