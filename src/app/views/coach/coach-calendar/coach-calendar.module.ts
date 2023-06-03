import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachCalendarRoutingModule } from './coach-calendar-routing.module';
import { CoachCalendarComponent } from './coach-calendar/coach-calendar.component';


@NgModule({
  declarations: [
    CoachCalendarComponent
  ],
  imports: [
    CommonModule,
    CoachCalendarRoutingModule
  ]
})
export class CoachCalendarModule { }
