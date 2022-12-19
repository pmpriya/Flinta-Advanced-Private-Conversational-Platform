import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';


import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { GruopProvider } from "../../providers/ServerDb/group";
import { ApiserviceService } from '../apiservice.service';
import { NetworkService } from "../network.service";
import { Network } from '@ionic-native/network/ngx'
import { Socket } from 'ngx-socket-io';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  colorCode: any;

  allmygroups = [];
  opengrps = [];
  constructor(private ThemeSwitcherService: ThemeSwitcherService,private socket:Socket, private network:Network,private NetworkService: NetworkService,  private navCtrl: NavController, private service: ApiserviceService, private GruopProvider: GruopProvider, public sanitizer: DomSanitizer, private platform: Platform,  public loadingCtrl: LoadingController) {
    this.colorCode = ThemeSwitcherService.DayColorCode;

    this.network.onConnect().subscribe(() => {
      this.onlinegroupdata();
    })

    this.socket.on('recentmessgae', (msg) => {
      
      
        this.onlinegroupdata();
      
    })
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    
    console.log("GroupsPage ionViewWillEnter")

    if (this.NetworkService.CurrentStatus == false) {
     
    }
    else {
     this.onlinegroupdata();
    }

  }

  onlinegroupdata()
  {
    console.log("GroupsPage onlinedata")

    this.GruopProvider.getGroupContactlist().then(data => {
      
      var getdta: any;
      getdta = data;
      getdta.sort(function (a, b) {
        var c = new Date(parseInt(a.timestamp));
        var d = new Date(parseInt(b.timestamp));
        return c < d ? 1 : -1;
      });
      if (data["flag"] == null) {
        this.groupInfo(data);

        if (this.platform.is('android')) {
          getdta.forEach(element => {
           

          });
        }
      }
    }).catch(res => {
      this.onlinegroupdata();
      
      

    })
  }
  
  groupInfo(mainList) {
    this.allmygroups = [];

    if (mainList != null) {
      mainList.forEach(value => {
        this.allmygroups.push(value)
      });
    }


  }
  ionViewDidLeave() {
    
  }

  addgroup() {
    this.navCtrl.navigateForward('groupcreation', {

    })

    
    
    
    
    
  }

  openchat(group) {
    
    this.GruopProvider.currentgroupname = group.groupname;
    this.GruopProvider.currentgroupProfileImage = group.groupimage;

    if (this.NetworkService.CurrentStatus == true) {
      this.GruopProvider.getintogroup(group.groupkey, group.groupname, group.groupimage, group.opengroup);
    }

    var obj =
    {
      groupimage: group.groupimage,
      ownerUid: group.owner,
      groupkey: group.groupkey,
      groupname: group.groupname,
      opengroup: group.opengroup,
      groupcreated: group.groupcreated
    }
    this.GruopProvider.initializegroup(obj);
    if (this.platform.is('android')) {
     
    }
    else {
      this.navCtrl.navigateForward('groupchat', {
        queryParams: obj,
      })
    }


  }
  async presentToast() {
    const loading = await this.loadingCtrl.create({
      spinner: 'crescent',

      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',

    });
    return await loading.present();
  }
  async loadingdismiss() {

    return await this.loadingCtrl.dismiss();
  }
}
