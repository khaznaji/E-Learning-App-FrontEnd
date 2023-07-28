import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpClientModule } from '@angular/common/http';
import { AdminprojectsComponent } from './views/admin/admin-projects/adminprojects/adminprojects.component';
import { AdminProjectClientComponent } from './views/admin/admin-project-client/admin-project-client.component';
import { AdminAllprojectclientsComponent } from './views/admin/admin-allprojectclients/admin-allprojectclients.component';
import { SpecificprojectDetailsComponent } from './views/admin/specificproject-details/specificproject-details.component';
import { CompanyComponent } from './views/visitor/company/company.component';
import { DetailOffersComponent } from './views/visitor/detail-offers/detail-offers.component';
import { UpdateOffersComponent } from './views/admin/update-offers/update-offers.component';
import { OfferclientDetailComponent } from './views/admin/offerclient-detail/offerclient-detail.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AdminprojectsComponent,
    AdminProjectClientComponent,
    SpecificprojectDetailsComponent,
    CompanyComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
