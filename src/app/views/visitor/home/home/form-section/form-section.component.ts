import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css'],
})
export class FormSectionComponent implements OnInit {
  AddStudent!: FormGroup;
  Role = 'ETUDIANT';
  Addetat!: boolean;
  msjEtat: string = '';
  Allformation: any = [];
  isLoading: boolean = false;
  showSuccessIcon: boolean = false;
  uploadInProgress: boolean = false;

  constructor(
    private FormationsService: FormationsService,
    private UserService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.Addetat = false;
    this.msjEtat = '';
  }

  AddStudentForm() {
    const formData = new FormData();
    formData.append('username', this.AddStudent.get('fusername')?.value);
    formData.append('firstName', this.AddStudent.get('fFirstName')?.value);
    formData.append('lastName', this.AddStudent.get('fLastName')?.value);
    formData.append('password', this.AddStudent.get('fPhoneNumber')?.value);
    formData.append('numeroTel', this.AddStudent.get('fPhoneNumber')?.value);
    formData.append('typeFormation', this.AddStudent.get('fFormation')?.value);
    formData.append('country', this.AddStudent.get('fCountry')?.value);
    formData.append('roles', this.Role);
    formData.append('about', this.AddStudent.get('fabout')?.value);


    this.isLoading = true;
    this.uploadInProgress = true;
    this.UserService.ajoutStudent(formData).subscribe(
      (data: any) => {
        console.log(data);
        this.Addetat = true;
        this.showSuccessIcon = true;
        this.uploadInProgress = false;

        this.isLoading = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title:
            'Thank you for your registration. We will contact you as soon as possible.',
          showConfirmButton: true,
        });
      },
      (error) => {
        console.log(error);

        this.showSuccessIcon = false;
        this.Addetat = true;
        this.uploadInProgress = false;
        this.isLoading = false;

        if (
          error.status === 400 &&
          error.error?.message === 'Error: email is already taken!'
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The email is already taken.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      }
    );
  }

  isValidEmail(email: any) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getALLFormations() {
    this.FormationsService.getFormations().subscribe((data) => {
      this.Allformation = data;
      console.log(this.Allformation);
    });
  }

  get f() {
    return this.AddStudent.controls;
  }

  ngOnInit(): void {
    this.getALLFormations();

    this.AddStudent = this.formBuilder.group({
      fusername: ['', [Validators.required, Validators.email]],
      fFirstName: ['', [Validators.required]],
      fLastName: ['', [Validators.required]],
      fPhoneNumber: ['', [Validators.required]],
      fFormation: ['Select Training', [Validators.required]],
      fCountry: ['Select Country', [Validators.required]],
      fabout: ['', [Validators.required]],

    });
  }
  isValidNumber(number: any) {
    // Regular expression to match numbers
    const numberRegex = /^\+?\d{8,}$/;
    return numberRegex.test(number);
  }
}