import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachStudentProjectsComponent } from './coach-student-projects/coach-student-projects.component';

const routes: Routes = [
  {path:'table/project',component:CoachStudentProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachStudentProjectsRoutingModule { }
