import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyshelfPageRoutingModule } from './myshelf-routing.module';

import { MyshelfPage } from './myshelf.page';
import { ContactlistPageModule } from '../contactlist/contactlist.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyshelfPageRoutingModule,
    ContactlistPageModule
  ],
  declarations: [MyshelfPage]
})
export class MyshelfPageModule {}
