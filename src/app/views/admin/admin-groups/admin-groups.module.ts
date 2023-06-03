import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupsRoutingModule } from './admin-groups-routing.module';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';


@NgModule({
  declarations: [
    AdminGroupsComponent
  ],
  imports: [
    CommonModule,
    AdminGroupsRoutingModule
  ]
})
export class AdminGroupsModule { }
