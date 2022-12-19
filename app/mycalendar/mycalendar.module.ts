import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycalendarPageRoutingModule } from './mycalendar-routing.module';

import { MycalendarPage } from './mycalendar.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { ContactlistPageModule } from '../contactlist/contactlist.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycalendarPageRoutingModule,
    NgCalendarModule,
    ContactlistPageModule
  ],
  declarations: [MycalendarPage]
})
export class MycalendarPageModule {}
