import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from 'src/app/MesServices/Feedback/feedback.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  id!:any
  tabFormation : any= [] ;
  tabFeedback : any= [] ;
  parameterValue!: any;
  chapitres: any;
  exercices: any;
  projects: any;
  nomFormation: any;
  descriptionFormation: any;

ListChapters : any = [];
  constructor( private fs: FormationsService,
    private route: ActivatedRoute,
    private fedb:FeedbackService
    ) {
      this.parameterValue = this.route.snapshot.paramMap.get('formation');

   }
   scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }


getFormationBynomFormation(){
  this.fs.getFormationByNomFormation(this.parameterValue).subscribe((data)=>{
    console.log("adadada",data);
    this.tabFormation = data;
    this.chapitres = this.tabFormation.nbChapters;
    this.exercices = this.tabFormation.nbExercices;
    this.projects = this.tabFormation.nbProjects;
    this.nomFormation = this.tabFormation.nomFormation;
    this.descriptionFormation=this.tabFormation.description;
    //loop for tabFormation and push chapters in ListChapters
    for (let i = 0; i < this.tabFormation.chapters.length; i++) {
      this.ListChapters.push(this.tabFormation.chapters[i]);
      console.log("ListChapters",this.ListChapters);
    }

  })
}

   getAllFeedbacks(){
    this.fedb.getAllFeedbacks().subscribe((data)=>{
      console.log("Dee",data);
    })
   }

   getFeedbackByFormation(){
    this.fedb.getFeedbackByFormation(this.parameterValue).subscribe((data)=>{
      console.log("Wiouu",data);
      this.tabFeedback = data;
    })
   }
 ngOnInit(): void {
  this.parameterValue = this.route.snapshot.paramMap.get('formation');
this.getFormationBynomFormation();
this.getFeedbackByFormation();
this.getAllFeedbacks();

 }
}
