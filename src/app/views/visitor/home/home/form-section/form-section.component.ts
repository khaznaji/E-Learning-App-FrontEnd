import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';



@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css']
})
export class FormSectionComponent implements OnInit {

AddStudent!: FormGroup;
  
  Role = "ETUDIANT"

  Addetat!: boolean ;
  msjEtat: string = "";
  Allformation: any = [];
  constructor(
    private FormationsService:FormationsService ,
    private UserService: UserService,
    private formBuilder: FormBuilder,
  ) {

  }

  
//hedhy tebaa required ?

  AddStudentForm() {
    if(this.AddStudent.invalid){
      return;
    } 
    //ken maamlnesh fazet lappend kifeh bsh naatiw paasword l ponenumber
    const formData = new FormData();
    formData.append('username', this.AddStudent.get('fusername')?.value);
    formData.append('firstName', this.AddStudent.get('fFirstName')?.value);
    formData.append('lastName', this.AddStudent.get('fLastName')?.value);
    formData.append('password', this.AddStudent.get('fPhoneNumber')?.value);
    formData.append('numeroTel', this.AddStudent.get('fPhoneNumber')?.value);
    formData.append('typeFormation', this.AddStudent.get('fFormation')?.value);
    formData.append('country', this.AddStudent.get('fCountry')?.value);
    formData.append('roles', this.Role);
    this.UserService.ajoutStudent(formData).subscribe(
      (data) => {
        console.log(data);
        this.Addetat = true;
        this.msjEtat = "Ajout avec succés";
       
      }
    )
    
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
  
  get f() { return this.AddStudent.controls; }

  ngOnInit(): void {
    this.getALLFormations();

    this.AddStudent = this.formBuilder.group({
      fusername: ['',[Validators.required, Validators.email]],
      fFirstName: ['', [Validators.required]],
      fLastName: ['',[ Validators.required]],
      fPhoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      fFormation: ['Select Training',[Validators.required]],
      fCountry: ['Select Country', [Validators.required]],
    });

  }
 

}
