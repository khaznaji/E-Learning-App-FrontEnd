import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { TrainingService } from 'src/app/MesServices/Training/training.service';

@Component({
  selector: 'app-admin-trainingsform',
  templateUrl: './admin-trainingsform.component.html',
  styleUrls: ['./admin-trainingsform.component.css']
})
export class AdminTrainingsformComponent implements OnInit {
  trainingForm: FormGroup;
  tabCategorie: any = [];
  selectedCategorie!: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private cs: CategorieService,
    private FormationService: FormationsService,
    private TrainingService: TrainingService
  ) {
    this.trainingForm = this.fb.group({
      categorie: ['', Validators.required],
      nomFormation: ['', Validators.required],
      description: ['', Validators.required],
      nbExercices: ['', Validators.required],
      nbProjects: ['', Validators.required],
      nbMeetings: ['', Validators.required],
      nbChapters: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllCategorie();
  }

  getAllCategorie() {
    console.log('getAllCategorie');
    this.cs.getCategories().subscribe((res) => {
      this.tabCategorie = res as any[];
      console.log(this.tabCategorie);
    });
  }

  addTraining() {
    if (this.trainingForm.valid) {
      let trainingData = this.trainingForm.value;
      console.log(trainingData);
      trainingData.categorie = Number(trainingData.categorie);

      this.TrainingService.ajoutTraining(trainingData).subscribe(
        (data: any) => {
          this.successMessage = 'Training program added successfully.';
          this.errorMessage = '';
          console.log(data);
          
        },
        (error: any) => {
          this.successMessage = '';
          this.errorMessage = 'Error adding the training program. Please try again.';
          console.log(error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
    }
  }

  isValidNumber(number: any) {
    // Regular expression to match numbers
    const numberRegex = /^\+?\d+$/;
    return numberRegex.test(number);
  }
}
