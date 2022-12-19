import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GooglemapopenPageRoutingModule } from './googlemapopen-routing.module';

import { GooglemapopenPage } from './googlemapopen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglemapopenPageRoutingModule
  ],
  declarations: [GooglemapopenPage]
})
export class GooglemapopenPageModule {}
