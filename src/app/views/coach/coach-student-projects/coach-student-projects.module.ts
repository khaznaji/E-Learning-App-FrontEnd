import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachStudentProjectsRoutingModule } from './coach-student-projects-routing.module';
import { CoachStudentProjectsComponent } from './coach-student-projects/coach-student-projects.component';


@NgModule({
  declarations: [
    CoachStudentProjectsComponent
  ],
  imports: [
    CommonModule,
    CoachStudentProjectsRoutingModule
  ]
})
export class CoachStudentProjectsModule { }
