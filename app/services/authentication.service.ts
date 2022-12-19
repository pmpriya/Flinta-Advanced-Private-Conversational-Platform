/**
 * Authentication Module
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authState = new BehaviorSubject(false);

  loginFLow: boolean = false;
  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.ifLoggedIn();

    this.platform.ready().then(() => {
      // this.ifLoggedIn();
    });
  }
  /**
   * Check whether the user logged in
   */

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }
  // //Group chat all data 
  setLoggedUserInfo(value) {
    this.storage.remove("userLoginInfo");
    return this.storage.set("userLoginInfo", value);
  }
  async getLoggedUserInfo() {
     await this.storage.get("userLoginInfo");
  }

  login(res) {

    this.storage.set('USER_INFO', res).then((response) => {
      this.router.navigate(['home']);
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
