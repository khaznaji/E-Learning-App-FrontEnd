import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachGroupsRoutingModule } from './coach-groups-routing.module';
import { CoachGroupsComponent } from './coach-groups/coach-groups.component';



@NgModule({
  declarations: [
    CoachGroupsComponent,
  
  ],
  imports: [
    CommonModule,
    CoachGroupsRoutingModule
  ]
})
export class CoachGroupsModule { }
