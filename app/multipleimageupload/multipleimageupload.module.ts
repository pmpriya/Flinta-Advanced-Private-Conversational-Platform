import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleimageuploadPageRoutingModule } from './multipleimageupload-routing.module';

import { MultipleimageuploadPage } from './multipleimageupload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleimageuploadPageRoutingModule
  ],
  declarations: [MultipleimageuploadPage]
})
export class MultipleimageuploadPageModule {}
