import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { GruopChatProvider } from 'src/providers/ServerDb/groupChat';
import { NetworkService } from "../network.service";
import { GruopProvider } from "../../providers/ServerDb/group";
import { NavController,NavParams,AlertController,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.page.html',
  styleUrls: ['./grouplist.page.scss'],
})
export class GrouplistPage implements OnInit {

  allmygroups:any;
  contacts:any;
  mynumber:any;
  invite_groups = [];
  eventdata:any;
  Uid = localStorage.getItem("FlintauserID").toString();
  mom_msg:any;
  getdata:any;
  sendername:any;
  groupmembers = [];
  allgroupmsgs = [];
  constructor(private modelctrl:ModalController,public alertCtrl: AlertController,public navParams:NavParams,private service:ApiserviceService,public activatedRoute : ActivatedRoute,public GruopChatProvider:GruopChatProvider,private GruopProvider: GruopProvider,private networkProvider: NetworkService,public navCtrl: NavController,) {
  //   this.activatedRoute.queryParams.subscribe((res)=>{
  //     console.log(res);
  //     this.getdata = res;
     
  // });
  this.mom_msg = this.navParams.get('msg')
  
   }

  ngOnInit() {
    this.getgroups();
  }

  getgroups(){
    var data = {
      uid: localStorage.getItem("FlintauserID").toString()
  }
    this.service.PostRequest(this.service.mainAPI + "/getMyGroup", data).then(res => {
      console.log(res);
      this.allmygroups=res;
      this.allmygroups.forEach(element => {
        element.isChecked = false;
      });
  },err=>{
    console.log(err);
  })
  }

  getCheckboxValues(ev, data) {
    console.log(ev,data);
    if(ev.detail.checked){
      // Pushing the object into array
      this.invite_groups.push(data);

    }else {
      let removeIndex = this.invite_groups.findIndex(itm => itm===data);

      if(removeIndex !== -1)
        this.invite_groups.splice(removeIndex,1);
    }
    console.log(this.invite_groups);
  }

  sendinvite(){
    this.Uid = localStorage.getItem('FlintauserID')
    this.sendername = localStorage.getItem('username')
    for(let i=0;i<this.invite_groups.length;i++){
    // if(this.eventdata.share_event == "file"){
    //   this.sendMessage(this.eventdata.filedata);
    //   this.modalController.dismiss();
    // }else{
      var data = {
        groupname: this.invite_groups[i].groupname,
        groupkey: this.invite_groups[i].groupkey,
        message: this.service.encryptText(this.mom_msg),
        sentby: this.Uid,
        filetype: "mom",
        fileextension:'',
        sendername: this.sendername,
        timestamp: new Date().getTime(),
        status: "1",        
        tagmessage: this.service.encryptText(''),        
        tagfileextension: '',
        tagfiletype: '',
        tagtime: '',        
        replydisplayname: '',
        attachtext:this.service.encryptText(null),

      }
      this.GruopProvider.getGroupinfo(this.invite_groups[i].groupkey).then(res => {
        console.log("offline_online 1  :" + JSON.stringify(res))
        this.groupmembers=[];
        this.groupmembers = res["member"];

        this.GruopChatProvider.createMessage(data, "1", this.groupmembers).then(res => {
          if (this.networkProvider.CurrentStatus == true) {
            this.allgroupmsgs = [];
            // this.getchat(this.scrollValue);
          }
        })
      })
      this.presentAlert('Mom Created Successfully');
      this.modelctrl.dismiss();
}
}
async presentAlert(tittle) {
  var alert = await this.alertCtrl.create({

    message: tittle,
    buttons: ['OK']
  });

  await alert.present();
}
 dismissModal(){
   
    this.modelctrl.dismiss();
  }
}
