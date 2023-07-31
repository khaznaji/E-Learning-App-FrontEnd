import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachSidebarRoutingModule } from './coach-sidebar-routing.module';
import { CoachSidebarComponent } from './coach-sidebar/coach-sidebar.component';


@NgModule({
  declarations: [
    CoachSidebarComponent
  ],
  imports: [
    CommonModule,
    CoachSidebarRoutingModule
  ]
})
export class CoachSidebarModule { }
