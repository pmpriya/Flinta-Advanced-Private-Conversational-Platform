import {Injectable} from '@angular/core';
import {firebase} from '@firebase/app';
import '@firebase/messaging';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (!Notification) {
            resolve();
            return;
        }
        if (!firebase.messaging.isSupported()) {
            resolve();
            return;
        }
        try {
            const messaging = firebase.messaging();
            await messaging.requestPermission();

            const token: string = await messaging.getToken();

            console.log('User notifications token:', token);
        } catch (err) {
            // No notifications granted
        }

        resolve();
    });
}

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log("NotificationsService");
        navigator.serviceWorker.ready.then((registration) => {
          console.log("NotificationsService");

            // Don't crash an error if messaging not supported
            if (!firebase.messaging.isSupported()) {
                   resolve();
                   return;
            }

            const messaging = firebase.messaging();
            console.log("NotificationsService 1");

            // Register the Service Worker
            messaging.useServiceWorker(registration);

            // Initialize your VAPI key
            messaging.usePublicVapidKey(
                  "BNSdpYzNG5OUp0SOe9tJD5umWTkjwZS1_FBZ9tSCB2CmV8O1btreCAzv_PxpNj0Kwgsq60gPY7e22b_-r8CkqkA"
            );

            // Optional and not covered in the article
            // Listen to messages when your app is in the foreground
            messaging.onMessage((payload) => {
                console.log(payload);
            });
            // Optional and not covered in the article
            // Handle token refresh
            messaging.onTokenRefresh(() => {
                messaging.getToken().then(
                (refreshedToken: string) => {
                    console.log("refreshedToken :"+refreshedToken);
                }).catch((err) => {
                    console.error(err);
                });
            });

            resolve();
        }, (err) => {
            reject(err);
        });
    });
  }
}