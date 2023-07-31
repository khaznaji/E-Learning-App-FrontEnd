import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachEditprofileRoutingModule } from './coach-editprofile-routing.module';
import { CoachEditprofileComponent } from './coach-editprofile/coach-editprofile.component';


@NgModule({
  declarations: [
    CoachEditprofileComponent
  ],
  imports: [
    CommonModule,
    CoachEditprofileRoutingModule
  ]
})
export class CoachEditprofileModule { }
