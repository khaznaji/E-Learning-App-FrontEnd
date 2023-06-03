import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHacherspacesRoutingModule } from './admin-hacherspaces-routing.module';
import { AdminHackerspacesComponent } from './admin-hackerspaces/admin-hackerspaces.component';


@NgModule({
  declarations: [
    AdminHackerspacesComponent
  ],
  imports: [
    CommonModule,
    AdminHacherspacesRoutingModule
  ]
})
export class AdminHacherspacesModule { }
