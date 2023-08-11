import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachCalendarComponent } from './coach-calendar/coach-calendar.component';
import { MeetComponent } from '../meet/meet.component';

const routes: Routes = [
  {path:'',component:CoachCalendarComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachCalendarRoutingModule { }
