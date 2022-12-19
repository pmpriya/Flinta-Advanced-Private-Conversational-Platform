import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMomPageRoutingModule } from './my-mom-routing.module';

import { MyMomPage } from './my-mom.page';
// import { ContactlistPageModule } from '../contactlist/contactlist.module';
// import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // ContactlistPageModule,
    MyMomPageRoutingModule,
    // IonicSelectableModule
  ],
  declarations: [MyMomPage],
})
export class MyMomPageModule {}
