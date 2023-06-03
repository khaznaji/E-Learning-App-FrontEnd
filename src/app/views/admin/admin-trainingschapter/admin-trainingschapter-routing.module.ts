import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTrainingschapterComponent } from './admin-trainingschapter/admin-trainingschapter.component';

const routes: Routes = [
  {path:'',component:AdminTrainingschapterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTrainingschapterRoutingModule { }
