import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGroupcalendarComponent } from './admin-groupcalendar/admin-groupcalendar.component';

const routes: Routes = [
  {path:'calendar',component:AdminGroupcalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminGroupcalendarRoutingModule { }
