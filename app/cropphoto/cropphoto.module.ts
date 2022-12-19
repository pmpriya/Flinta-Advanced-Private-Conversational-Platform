import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropphotoPageRoutingModule } from './cropphoto-routing.module';

import { CropphotoPage } from './cropphoto.page';
import {ImageCropperComponent} from 'ng2-img-cropper';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CropphotoPageRoutingModule
  ],
  declarations: [CropphotoPage,ImageCropperComponent]
})
export class CropphotoPageModule {}
