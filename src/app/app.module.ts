import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environement } from 'src/environement/environement.dev';
import { ProjectMemberComponent } from './views/coach/project-member/project-member.component';

@NgModule({
  declarations: [AppComponent, ProjectMemberComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environement.firebase),
    //AngularFireAuthModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}