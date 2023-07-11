import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { Company } from 'src/app/Models/Company';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  AddCoach!: FormGroup;

  Role = "COACH"
Addetat!: boolean ;

imagepath = ""
msjEtat: string = "";
uploadInProgress: boolean = false;



Allformation: any = [];
isLoading: boolean = false;
constructor(
private  UserService: UserService,
private FormationsService: FormationsService,
  private formBuilder: FormBuilder,private projectOwnerService: ProjectOwnerService
  ,private router: Router , private sp:CompanyService
) {
}
AddCoachForm() {
  const formData = new FormData();
  formData.append('username', this.AddCoach.get('fusername')?.value);
  formData.append('firstName', this.AddCoach.get('fFirstName')?.value);
  formData.append('lastName', this.AddCoach.get('fLastName')?.value);
  formData.append('password', this.AddCoach.get('fPhoneNumber')?.value);
  formData.append('numeroTel', this.AddCoach.get('fPhoneNumber')?.value);
  formData.append('CV', this.AddCoach.get('CV')?.value);
  formData.append('typeFormation', this.AddCoach.get('fSkills')?.value);
  formData.append('country', this.AddCoach.get('fCountry')?.value);
  formData.append('Github', this.AddCoach.get('fGithub')?.value);
  formData.append('Linkedin', this.AddCoach.get('fLinkedin')?.value);
  formData.append('skills', this.AddCoach.get('fSkills')?.value);
  formData.append('photo', this.AddCoach.get('fileName')!.value);
  formData.append('roles', this.Role);


  this.isLoading = true;
  this.uploadInProgress = true;

  this.UserService.ajoutFormateur(formData).subscribe(
    (data: any) => {
      console.log(data);
      this.Addetat = true;
      this.msjEtat = "Ajout avec succès";
      this.uploadInProgress = false; // Set upload in progress to false when upload is complete
      this.isLoading = false;
    },
    (error) => {
      console.log(error);
      this.Addetat = true;
      this.uploadInProgress = false; // Set upload in progress to false on error as well
      this.isLoading = false;

    }
  );
}


// Function to check if an email address is valid
isValidEmail(email:any) {
// Regular expression to match email addresses
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}
getALLFormations() {
this.FormationsService.getFormations().subscribe(
  (data) => {
    this.Allformation = data;
    console.log(this.Allformation);
  }
)

}
onFileSelected(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.AddCoach.get('CV')!.setValue(file);
    this.uploadInProgress = true; // Set upload in progress to true when file selection starts
  } else {
    this.AddCoach.get('CV')!.setValue(this.imagepath);
    this.uploadInProgress = false; // Set upload in progress to false when no file is selected
  }
}



get f() { return this.AddCoach.controls; }

ngOnInit(): void {
this.getALLFormations();

this.AddCoach = this.formBuilder.group({
  fusername: ['',[Validators.required, Validators.email]],
  fFirstName: ['', [Validators.required]],
  fLastName: ['',[ Validators.required]],
  fPhoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
 // fFormation: ['',[Validators.required]],
  CV: ['',[Validators.required]],
  fGithub: ['',[Validators.required]],
  fLinkedin: ['',[Validators.required]],
  fCountry: ['Select Country',[Validators.required]],
  fSkills: ['',[Validators.required]],
  photo: [''],
  fileName: ''
});
}
//// contributor 
file: File | null = null;
project: ProjectOwner = new ProjectOwner();
imagePreview: string | undefined;
formSubmitted: boolean = false;
formSubmitteds: boolean = false;

save() {
  if (this.file) {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('nom', this.project.nom);
    formData.append('prenom', this.project.prenom);
    formData.append('numtel', this.project.numtel.toString());
    formData.append('email', this.project.email);
    formData.append('github', this.project.github);
    formData.append('linkedin', this.project.linkedin);

    this.projectOwnerService.createContributors(formData).subscribe(
      (data) => {
        console.log(data);
        this.imagePreview = undefined;

        this.project = new ProjectOwner();
        this.file = null;
        this.formSubmitted = true;


      },
      (error) => console.log(error)
    );
  }
}
onFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.file = inputElement.files[0];
    // Générer l'aperçu de l'image
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(this.file);
  } 
}
projects: Company = new Company();

saveCompany() {
  if (this.file) {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('nom', this.projects.nom);
    formData.append('adresse', this.projects.adresse);
    formData.append('numtel', this.projects.numtel.toString());
    formData.append('email', this.projects.email);
    formData.append('description', this.projects.description);

    this.sp.createC(formData).subscribe(
      (data) => {
        console.log(data);
        this.imagePreview = undefined;

        this.projects = new Company();
        this.file = null;
        this.formSubmitteds = true;

      },
      (error) => console.log(error)
    );
  }
}
}
