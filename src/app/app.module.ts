import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminprojectsComponent } from './views/admin/admin-projects/adminprojects/adminprojects.component';
import { AdminProjectClientComponent } from './views/admin/admin-project-client/admin-project-client.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminprojectsComponent,
    AdminProjectClientComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
