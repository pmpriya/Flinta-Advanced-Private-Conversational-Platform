import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytaskPageRoutingModule } from './mytask-routing.module';

import { MytaskPage } from './mytask.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    MytaskPageRoutingModule
  ],
  declarations: [MytaskPage]
})
export class MytaskPageModule {}
