import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';


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
  private formBuilder: FormBuilder,
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

}
