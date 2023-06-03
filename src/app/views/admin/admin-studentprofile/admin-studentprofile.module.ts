import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentprofileRoutingModule } from './admin-studentprofile-routing.module';
import { AdminStudentprofileComponent } from './admin-studentprofile/admin-studentprofile.component';


@NgModule({
  declarations: [
    AdminStudentprofileComponent
  ],
  imports: [
    CommonModule,
    AdminStudentprofileRoutingModule
  ]
})
export class AdminStudentprofileModule { }
