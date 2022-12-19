import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, AlertController, } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BuddyChatProvider } from "../../providers/ServerDb/buddyChat";
import { NetworkService } from "../../app/network.service";
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-recentchat-menu',
  templateUrl: './recentchat-menu.component.html',
  styleUrls: ['./recentchat-menu.component.scss'],
})
export class RecentchatMenuComponent implements OnInit {

  calltone = "calling";
  tones: any[];
  colorCode:any;
  colorCode1:any;
  constructor(private ThemeSwitcherService: ThemeSwitcherService, private BuddyChatProvider: BuddyChatProvider, private NetworkService: NetworkService, private nativeAudio: NativeAudio,
    private Storage: Storage, public navCtrl: NavController, public popoverController: PopoverController, public alertController: AlertController) {
    // setTimeout(() => {
    //  }, 2000);

  }

  ngOnInit() {

    // console.log(this.tones,this.calltone);
  }
  settheme() {
    var d = Number(new Date().getHours());

    if (d >= 6 && d < 18) {
      this.colorCode1 = "black"
   
    } else {
      this.colorCode1 = "#ffffff"
     
    }
    console.log("this.colorCode1:"+this.colorCode1)
  }
  ionViewDidEnter() {

  }





  async logout() {
    this.popoverController.dismiss();
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Are you sure to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Okay',
          handler: () => {
            if (localStorage.getItem("FlintauserID") != null) {
              this.BuddyChatProvider.updatemystatus(localStorage.getItem("FlintauserID"), "offline", new Date().getTime(), this.NetworkService.DeviceId);
            }
            localStorage.clear();
            this.Storage.remove("userLoginInfo")
            this.Storage.remove("USER_INFO")
            this.navCtrl.navigateRoot("/login");
          }
        }
      ]
    });

    await alert.present();

  }

  changeTheme() {
    this.popoverController.dismiss();
    this.showPrompt();

  }

  showPrompt() {
    this.alertController.create({
      // header: 'Prompt Alert',
      // subHeader: 'Change Theme',
      message: 'Select the color',
      inputs: [
        {
          type: 'radio',
          label: 'Default',
          value: '#7A62FE'
        },
        {
          type: 'radio',
          label: 'AntiqueWhite',
          value: '#FAEBD7'
        },
        {
          type: 'radio',
          label: 'Aqua',
          value: '#00FFFF'
        },
        // {
        //   type: 'radio',
        //   label: 'Aqua',
        //   value: '#00FFFF'
        // },
        {
          type: 'radio',
          label: 'Aquamarine',
          value: '#7FFFD4'
        },
        {
          type: 'radio',
          label: 'Bisque',
          value: '#FFE4C4'
        },
        {
          type: 'radio',
          label: 'Black',
          value: '#000000'
        },
        {
          type: 'radio',
          label: 'Blue',
          value: '#0000FF'
        },
        {
          type: 'radio',
          label: 'BlueViolet',
          value: '#8A2BE2'
        },
        {
          type: 'radio',
          label: 'Brown',
          value: '#A52A2A'
        },
        {
          type: 'radio',
          label: 'BurlyWood',
          value: '#DEB887'
        },
        {
          type: 'radio',
          label: 'CadetBlue',
          value: '#5F9EA0'
        },
        {
          type: 'radio',
          label: 'Chartreuse',
          value: '#7FFF00'
        },
        {
          type: 'radio',
          label: 'Chocolate',
          value: '#D2691E'
        },
        {
          type: 'radio',
          label: 'Coral',
          value: '#FF7F50'
        },
        {
          type: 'radio',
          label: 'CornflowerBlue',
          value: '#6495ED'
        },
        {
          type: 'radio',
          label: 'Crimson',
          value: '#DC143C'
        },
        {
          type: 'radio',
          label: 'Cyan',
          value: '#00FFFF'
        },
        {
          type: 'radio',
          label: 'DarkBlue',
          value: '#00008B'
        },
        {
          type: 'radio',
          label: 'DarkCyan',
          value: '#008B8B'
        },
        {
          type: 'radio',
          label: 'DarkGoldenRod',
          value: '#B8860B'
        },
        {
          type: 'radio',
          label: 'DarkGray',
          value: '#A9A9A9'
        },
        {
          type: 'radio',
          label: 'DarkGreen',
          value: '#006400'
        },
        {
          type: 'radio',
          label: 'DarkKhaki',
          value: '#BDB76B'
        },
        {
          type: 'radio',
          label: 'DarkMagenta',
          value: '#8B008B'
        },
        {
          type: 'radio',
          label: 'DarkOliveGreen',
          value: '#556B2F'
        },
        {
          type: 'radio',
          label: 'DarkOrange',
          value: '#FF8C00'
        },
        {
          type: 'radio',
          label: 'DarkOrchid',
          value: '#DarkOrchid'
        },
        {
          type: 'radio',
          label: 'DarkRed',
          value: '#8B0000'
        },
        {
          type: 'radio',
          label: 'DarkSalmon',
          value: '#E9967A'
        },
        {
          type: 'radio',
          label: 'DarkSeaGreen',
          value: '#DarkSeaGreen'
        },
        {
          type: 'radio',
          label: 'DarkSlateBlue',
          value: '#483D8B'
        },
        {
          type: 'radio',
          label: 'DarkTurquoise',
          value: '#00CED1'
        },
        {
          type: 'radio',
          label: 'DeepPink',
          value: '#FF1493'
        },
        {
          type: 'radio',
          label: 'DeepSkyBlue',
          value: '#00BFFF'
        },
        {
          type: 'radio',
          label: 'FireBrick',
          value: '#B22222'
        },
        {
          type: 'radio',
          label: 'Gold',
          value: '#FFD700'
        }, {
          type: 'radio',
          label: 'Red',
          value: '#FF0000'
        }, {
          type: 'radio',
          label: 'Violet',
          value: '#EE82EE'
        }, {
          type: 'radio',
          label: 'Yellow',
          value: '#FFFF00'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Ok',
          handler: (data: any) => {
            console.log('Selected Information', data);
            this.ThemeSwitcherService.DayColorCode = data;
            localStorage.setItem("DayColorCode",data)
            location.reload();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  changepwd() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward("/changepwd");
  }
  opentask() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward("/mytask");
  }
  myProfile() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward("/myprofile");
  }
  opencalendar() {
    this.popoverController.dismiss();
    this.navCtrl.navigateRoot("/mycalendar");
  }
  openmom() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward("/my-mom");
  }
  openshelf() {
    this.popoverController.dismiss();
    this.navCtrl.navigateForward("/myshelf");
  }
}
