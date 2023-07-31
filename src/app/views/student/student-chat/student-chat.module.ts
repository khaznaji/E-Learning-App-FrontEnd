import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentChatRoutingModule } from './student-chat-routing.module';
import { StudentChatComponent } from './student-chat/student-chat.component';


@NgModule({
  declarations: [
    StudentChatComponent
  ],
  imports: [
    CommonModule,
    StudentChatRoutingModule
  ]
})
export class StudentChatModule { }
