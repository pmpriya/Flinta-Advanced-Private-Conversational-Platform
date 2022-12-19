import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakephotoPageRoutingModule } from './takephoto-routing.module';

import { TakephotoPage } from './takephoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakephotoPageRoutingModule
  ],
  declarations: [TakephotoPage]
})
export class TakephotoPageModule {}
