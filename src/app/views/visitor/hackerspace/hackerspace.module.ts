import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackerspaceRoutingModule } from './hackerspace-routing.module';
import { HackerspaceComponent } from './hackerspace/hackerspace.component';
import { HomeModule } from '../home/home.module';
import { SafeUrlPipe } from './hackerspace/SafeUrlPipe';


@NgModule({
  declarations: [
    HackerspaceComponent,SafeUrlPipe
  ],
  imports: [
    CommonModule,
    HackerspaceRoutingModule,
    HomeModule

  ]
})
export class HackerspaceModule { }
