import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorLayoutComponent } from './layouts/visitor-layout/visitor-layout.component';
import { StudentLayoutComponent } from './layouts/student-layout/student-layout.component';
import { CoachLayoutComponent } from './layouts/coach-layout/coach-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NotFoundComponent } from './views/not-found/not-found/not-found/not-found.component';
import { MeetComponent } from './views/student/meet/meet.component';

const routes: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/visitor/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./views/visitor/contact/contact.module').then(
            (m) => m.ContactModule
          ),
      },
      {
        path: 'hackerspace/:region',
        loadChildren: () =>
          import('./views/visitor/hackerspace/hackerspace.module').then(
            (m) => m.HackerspaceModule
          ),
      },
      {
        path: 'training/:formation',
        loadChildren: () =>
          import('./views/visitor/training/training.module').then(
            (m) => m.TrainingModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/visitor/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'forgotpassword',
        loadChildren: () =>
          import('./views/visitor/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: 'resetpassword',
        loadChildren: () =>
          import('./views/visitor/reset-password/reset-password.module').then(
            (m) => m.ResetPasswordModule
          ),
      },
      {
        path: 'verifyemail',
        loadChildren: () =>
          import('./views/visitor/verify-email/verify-email.module').then(
            (m) => m.VerifyEmailModule
          ),
      },
      {
        path: 'online',
        loadChildren: () =>
          import('./views/visitor/online/online.module').then(
            (m) => m.OnlineModule
          ),
      },
    ],
  },

  {
    path: 'student',
    component: StudentLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/student/student-home/student-home.module').then(
            (m) => m.StudentHomeModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/student/student-profile/student-profile.module').then(
            (m) => m.StudentProfileModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import(
            './views/student/student-editprofile/student-editprofile.module'
          ).then((m) => m.StudentEditprofileModule),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import(
            './views/student/student-calendar/student-calendar.module'
          ).then((m) => m.StudentCalendarModule),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./views/student/student-chat/student-chat.module').then(
            (m) => m.StudentChatModule
          ),
      },
      {
        path: 'records',
        loadChildren: () =>
          import('./views/student/student-records/student-records.module').then(
            (m) => m.StudentRecordsModule
          ),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import(
            './views/student/student-projects/student-projects.module'
          ).then((m) => m.StudentProjectsModule),
      },
      {
        path: 'FeedBack',
        loadChildren: () =>
          import('./views/student/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },
      
    ],
  },
  {
    path: 'coach',
    component: CoachLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/coach/coach-home/coach-home.module').then(
            (m) => m.CoachHomeModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/coach/coach-profile/coach-profile.module').then(
            (m) => m.CoachProfileModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import(
            './views/coach/coach-editprofile/coach-editprofile.module'
          ).then((m) => m.CoachEditprofileModule),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./views/coach/coach-calendar/coach-calendar.module').then(
            (m) => m.CoachCalendarModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./views/coach/coach-comments/coach-comments.module').then(
            (m) => m.CoachCommentsModule
          ),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./views/coach/coach-chat/coach-chat.module').then(
            (m) => m.CoachChatModule
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./views/coach/coach-groups/coach-groups.module').then(
            (m) => m.CoachGroupsModule
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./views/coach/coach-records/coach-records.module').then(
            (m) => m.CoachRecordsModule
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import(
            './views/coach/coach-students-table/coach-students-table.module'
          ).then((m) => m.CoachStudentsTableModule),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import(
            './views/coach/coach-student-projects/coach-student-projects.module'
          ).then((m) => m.CoachStudentProjectsModule),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/admin/admin-home/admin-home.module').then(
            (m) => m.AdminHomeModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/admin/admin-profile/admin-profile.module').then(
            (m) => m.AdminProfileModule
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import('./views/admin/admin-groups/admin-groups.module').then(
            (m) => m.AdminGroupsModule
          ),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import(
            './views/admin/admin-grouprecords/admin-grouprecords.module'
          ).then((m) => m.AdminGrouprecordsModule),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import(
            './views/admin/admin-groupcalendar/admin-groupcalendar.module'
          ).then((m) => m.AdminGroupcalendarModule),
      },
      {
        path: 'groups',
        loadChildren: () =>
          import(
            './views/admin/admin-groupmembers/admin-groupmembers.module'
          ).then((m) => m.AdminGroupmembersModule),
      },
      {
        path: 'studentlist',
        loadChildren: () =>
          import(
            './views/admin/admin-studentlist/admin-studentlist.module'
          ).then((m) => m.AdminStudentlistModule),
      },
      {
        path: 'coachlist',
        loadChildren: () =>
          import('./views/admin/admin-coachlist/admin-coachlist.module').then(
            (m) => m.AdminCoachlistModule
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./views/admin/admin-feedback/admin-feedback.module').then(
            (m) => m.AdminFeedbackModule
          ),
      },
      {
        path: 'studentlist',
        loadChildren: () =>
          import(
            './views/admin/admin-studentprofile/admin-studentprofile.module'
          ).then((m) => m.AdminStudentprofileModule),
      },
      {
        path: 'coachlist',
        loadChildren: () =>
          import(
            './views/admin/admin-coachprofile/admin-coachprofile.module'
          ).then((m) => m.AdminCoachprofileModule),
      },
      {
        path: 'hackerspace',
        loadChildren: () =>
          import(
            './views/admin/admin-hacherspaces/admin-hacherspaces.module'
          ).then((m) => m.AdminHacherspacesModule),
      },
      {
        path: 'hackerspaceform',
        loadChildren: () =>
          import(
            './views/admin/admin-hackerspaceform/admin-hackerspaceform.module'
          ).then((m) => m.AdminHackerspaceformModule),
      },
      {
        path: 'trainings',
        loadChildren: () =>
          import('./views/admin/admin-trainings/admin-trainings.module').then(
            (m) => m.AdminTrainingsModule
          ),
      },
      {
        path: 'trainingsform',
        loadChildren: () =>
          import(
            './views/admin/admin-trainingsform/admin-trainingsform.module'
          ).then((m) => m.AdminTrainingsformModule),
      },
      {
        path: 'chapters',
        loadChildren: () =>
          import(
            './views/admin/admin-trainingschapter/admin-trainingschapter.module'
          ).then((m) => m.AdminTrainingschapterModule),
      },
      {
        path: 'sessionform',
        loadChildren: () =>
          import(
            './views/admin/admin-sessionform/admin-sessionform.module'
          ).then((m) => m.AdminSessionformModule),
      },
      {
        path: 'categorieForm',
        loadChildren: () =>
          import('./views/admin/categorieform/categorieform.module').then(
            (m) => m.CategorieformModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./views/admin/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
    ],
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
