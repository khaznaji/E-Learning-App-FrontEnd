import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorLayoutComponent } from './visitor-layout/visitor-layout.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { CoachLayoutComponent } from './coach-layout/coach-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from '../views/visitor/nav-bar/nav-bar/nav-bar.component';
import { FooterComponent } from '../views/visitor/footer/footer/footer.component';
import { StudentSidebarComponent } from '../views/student/student-sidebar/student-sidebar/student-sidebar.component';
import { CoachSidebarComponent } from '../views/coach/coach-sidebar/coach-sidebar/coach-sidebar.component';
import { AdminSidebarComponent } from '../views/admin/admin-sidebar/admin-sidebar/admin-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    VisitorLayoutComponent,
    StudentLayoutComponent,
    CoachLayoutComponent,
    AdminLayoutComponent,
  NavBarComponent,
  FooterComponent,
  StudentSidebarComponent,
  CoachSidebarComponent,
  AdminSidebarComponent
  
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule

    
  ]
})
export class LayoutsModule { }
