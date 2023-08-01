import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentEditprofileRoutingModule } from './student-editprofile-routing.module';
import { StudentEditprofileComponent } from './student-editprofile/student-editprofile.component';


@NgModule({
  declarations: [
    StudentEditprofileComponent
  ],
  imports: [
    CommonModule,
    StudentEditprofileRoutingModule
  ]
})
export class StudentEditprofileModule { }
