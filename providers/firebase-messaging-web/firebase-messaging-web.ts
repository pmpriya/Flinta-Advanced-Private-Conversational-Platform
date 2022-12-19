import { Injectable } from "@angular/core";
import { FirebaseApp } from 'angularfire2';
// I am importing simple ionic storage (local one), in prod this should be remote storage of some sort.
import { Storage } from '@ionic/storage';
/*
  Generated class for the FirebaseMessagingWebProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseMessagingWebProvider {
  private messaging;
  private unsubscribeOnTokenRefresh = () => { };
  DeviceTokenId:any;
  constructor(
    private storage: Storage,
    private app: FirebaseApp,
  ) {
    console.log("FirebaseMessagingWebProvider 1")

    // this.messaging = app.messaging();
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      this.messaging.useServiceWorker(registration);
      //this.disableNotifications()
      this.enableNotifications();
      console.log("FirebaseMessagingWebProvider")
    });
  }

  public enableNotifications() {
    console.log('Requesting permission...');
    return this.messaging.requestPermission().then(() => {
      console.log('Permission granted');
      // token might change - we need to listen for changes to it and update it
      this.setupOnTokenRefresh();
      return this.updateToken();
    });
  }

  public disableNotifications() {
    this.unsubscribeOnTokenRefresh();
    this.unsubscribeOnTokenRefresh = () => { };
    return this.storage.set('fcmToken', '').then();
  }

  private updateToken() {
    return this.messaging.getToken().then((currentToken) => {
      if (currentToken) {
        // we've got the token from Firebase, now let's store it in the database
        console.log("fcmToken :"+currentToken)
        this.DeviceTokenId=currentToken;
        return this.storage.set('fcmToken', currentToken);
      } else {
        this.DeviceTokenId=0;
        console.log('No Instance ID token available. Request permission to generate one.');
      }
    });
  }

  private setupOnTokenRefresh(): void {
    this.unsubscribeOnTokenRefresh = this.messaging.onTokenRefresh(() => {
      console.log("Token refreshed");
      this.storage.set('fcmToken', '').then(() => { this.updateToken(); });
    });
  }

}
