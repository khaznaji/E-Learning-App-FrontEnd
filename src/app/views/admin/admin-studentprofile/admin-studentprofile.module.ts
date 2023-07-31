import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminStudentprofileRoutingModule } from './admin-studentprofile-routing.module';
import { AdminStudentprofileComponent } from './admin-studentprofile/admin-studentprofile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminStudentprofileComponent
  ],
  imports: [
    CommonModule,
    AdminStudentprofileRoutingModule,
    FormsModule
  ]
})
export class AdminStudentprofileModule { }
