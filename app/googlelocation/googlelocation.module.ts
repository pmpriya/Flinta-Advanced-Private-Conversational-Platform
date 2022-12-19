import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GooglelocationPageRoutingModule } from './googlelocation-routing.module';

import { GooglelocationPage } from './googlelocation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglelocationPageRoutingModule
  ],
  declarations: [GooglelocationPage]
})
export class GooglelocationPageModule {}
