import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileFilterPageRoutingModule } from './file-filter-routing.module';

import { FileFilterPage } from './file-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileFilterPageRoutingModule
  ],
  declarations: [FileFilterPage]
})
export class FileFilterPageModule {}
