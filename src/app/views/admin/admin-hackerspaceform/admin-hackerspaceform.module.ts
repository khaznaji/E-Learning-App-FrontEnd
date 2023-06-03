import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHackerspaceformRoutingModule } from './admin-hackerspaceform-routing.module';
import { AdminHackerspaceformComponent } from './admin-hackerspaceform/admin-hackerspaceform.component';


@NgModule({
  declarations: [
    AdminHackerspaceformComponent
  ],
  imports: [
    CommonModule,
    AdminHackerspaceformRoutingModule
  ]
})
export class AdminHackerspaceformModule { }
