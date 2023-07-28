import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupmembersRoutingModule } from './admin-groupmembers-routing.module';
import { AdminGroupmembersComponent } from './admin-groupmembers/admin-groupmembers.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AdminGroupmembersComponent],
  imports: [
    CommonModule,
    AdminGroupmembersRoutingModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class AdminGroupmembersModule {}
