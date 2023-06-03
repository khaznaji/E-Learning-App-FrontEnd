import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupcalendarRoutingModule } from './admin-groupcalendar-routing.module';
import { AdminGroupcalendarComponent } from './admin-groupcalendar/admin-groupcalendar.component';


@NgModule({
  declarations: [
    AdminGroupcalendarComponent
  ],
  imports: [
    CommonModule,
    AdminGroupcalendarRoutingModule
  ]
})
export class AdminGroupcalendarModule { }
