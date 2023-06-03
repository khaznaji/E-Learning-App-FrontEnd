import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentCalendarComponent } from './student-calendar/student-calendar.component';

const routes: Routes = [
  {path:'',component:StudentCalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentCalendarRoutingModule { }
