import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ChaptersService } from 'src/app/MesServices/Chapters/chapters.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';

interface Formation {
  id: number;
  name: string;
  // Add more properties as per your response structure
}

@Component({
  selector: 'app-admin-trainingschapter',
  templateUrl: './admin-trainingschapter.component.html',
  styleUrls: ['./admin-trainingschapter.component.css']
})
export class AdminTrainingschapterComponent implements OnInit {
  Formation: any = [];
  tabFormation : any= [] ;
  Namechapter!: any;
  description!: any;


  constructor(private fr: FormationsService, private cs: ChaptersService) {}

  getAllFormation() {
    this.fr.getFormations().subscribe((res) => {
      this.tabFormation = res as Formation[]; // Type assertion to indicate that res is an array of Formation
      console.log(this.tabFormation);
    });
  }

  addChapters() {
    let chapters: any = {
      Namechapter: this.Namechapter,
      description: this.description,

    };

    let formationId = this.Formation; // Get the selected formation ID from the dropdown

    console.log(chapters);
    this.cs.ajoutChapters(chapters, formationId).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.getAllFormation();
  }
}
