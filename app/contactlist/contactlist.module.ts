import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactlistPageRoutingModule } from './contactlist-routing.module';

import { ContactlistPage } from './contactlist.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactlistPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ContactlistPage]
})
export class ContactlistPageModule {}
