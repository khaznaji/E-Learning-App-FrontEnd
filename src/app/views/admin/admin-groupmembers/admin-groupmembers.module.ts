import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupmembersRoutingModule } from './admin-groupmembers-routing.module';
import { AdminGroupmembersComponent } from './admin-groupmembers/admin-groupmembers.component';


@NgModule({
  declarations: [
    AdminGroupmembersComponent
  ],
  imports: [
    CommonModule,
    AdminGroupmembersRoutingModule
  ]
})
export class AdminGroupmembersModule { }
