import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewerModalPageRoutingModule } from './viewer-modal-routing.module';

import { ViewerModalPage } from './viewer-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewerModalPageRoutingModule
  ],
  declarations: [ViewerModalPage]
})
export class ViewerModalPageModule {}
