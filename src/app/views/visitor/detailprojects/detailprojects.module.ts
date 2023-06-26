import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailprojectsRoutingModule } from './detailprojects-routing.module';
import { DetailProjectComponent } from './detail-project/detail-project.component';


@NgModule({
  declarations: [
    DetailProjectComponent

  ],
  imports: [
    CommonModule,
    DetailprojectsRoutingModule
  ]
})
export class DetailprojectsModule { }
