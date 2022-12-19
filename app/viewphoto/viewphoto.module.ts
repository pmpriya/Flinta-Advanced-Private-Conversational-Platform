import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewphotoPageRoutingModule } from './viewphoto-routing.module';

import { ViewphotoPage } from './viewphoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewphotoPageRoutingModule
  ],
  declarations: [ViewphotoPage]
})
export class ViewphotoPageModule {}
