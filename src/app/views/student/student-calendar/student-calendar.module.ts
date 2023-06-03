import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentCalendarRoutingModule } from './student-calendar-routing.module';
import { StudentCalendarComponent } from './student-calendar/student-calendar.component';


@NgModule({
  declarations: [
    StudentCalendarComponent
  ],
  imports: [
    CommonModule,
    StudentCalendarRoutingModule
  ]
})
export class StudentCalendarModule { }
