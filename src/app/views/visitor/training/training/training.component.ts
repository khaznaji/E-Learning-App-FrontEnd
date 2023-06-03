import { Component, OnInit } from '@angular/core';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  id!:any
  tabFormation : any= [] ;

  constructor( private fs: FormationsService) {
//get formations byId
this.fs.getFormationById(this.id).subscribe(res => {
  this.tabFormation = res;
  console.log(this.tabFormation);
});



   }

 ngOnInit(): void {
 }
}
