
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { ToastController } from '@ionic/angular';

// import {mergeScan} from "rxjs/operator/mergeScan";
// import { Observable } from 'rxjs/Observable';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http/';
import { Cordova } from "@ionic-native/core";
// import { Subscription} from 'rxjs/Subscription';

export enum ConnectionStatusEnum {
  Online,
  Offline
}
@Injectable()
export class NetworkService {
  public loggedUserLanguage: any;

  // private disconnectSubscription: Subscription;
  // private connectionSubscription: Subscription;

  public previousStatus;
  public status: ConnectionStatusEnum;
  public CurrentStatus: boolean;


  constructor(public http: HttpClient, private network: Network, private toastController: ToastController) {
    this.previousStatus = ConnectionStatusEnum.Online;
   this.status = ConnectionStatusEnum.Online;

  }

  getConnectionType() {
    return this.network;
  }
  public isOnline() {

    // this.http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180605T034427Z.91af97712fd4c7f6.993ff04220e6d494d3d4ea4f43259d296031b85d&text=welcome&lang=te').subscribe(resp => {
    //  // var obj = JSON.parse(resp['_body'])
    //     console.log("respose :" + JSON.stringify(resp))
    //     return 1;
    //   }, error => {
    //     return 0;
    //     console.log("error :" + JSON.stringify(error))
    //   });
  }

  // Method that returns true if the user is not connected to internet
  public isOffline(): boolean {
    return this.network.type === 'none';
  }
  subscribe() {
    console.log("call Connection")

    // this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   this.showToast('Disconnection Detected.');
    //   console.log("call Disconnection")
    // });

    // this.connectionSubscription = this.network.onConnect().subscribe(() => {
    //   this.showToast('Connection Detected.');
    //   console.log("call Connection")

    // })
  }

  public initializeNetworkEvents(): void {
    this.network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        this.showToast('Disconnection Detected.');
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
      this.CurrentStatus = false;
    });
    this.network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        this.showToast('Connection Detected.');
      }
      this.previousStatus = ConnectionStatusEnum.Online;
      this.CurrentStatus = true;
    });
  }

  unsubscribe() {
    // this.connectionSubscription.unsubscribe();
    // this.disconnectSubscription.unsubscribe();
  }

  async showToast(message) {
    const toast = this.toastController.create({
      message: message,
      duration: 3000,
      // position: 'center'
    });

  // await toast.present();
  }


}
