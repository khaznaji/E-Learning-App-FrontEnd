import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTrainingsformRoutingModule } from './admin-trainingsform-routing.module';
import { AdminTrainingsformComponent } from './admin-trainingsform/admin-trainingsform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminTrainingsformComponent
  ],
  imports: [
    CommonModule,
    AdminTrainingsformRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminTrainingsformModule { }
