import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
})
export class StudentProfileComponent implements OnInit {
  currentUser: any;
  data: any = [];
  username!: string;
  country!: string;
  numeroTel!: string;
  email!: string;
  photo!: any;
  image!: any;

  UpdaImage!: FormGroup;
  uploadInProgress!: boolean;
  showSuccessMessage!: boolean;
  isLoading!: boolean;
  UserService: any;
  Addetat!: boolean;
  showSuccessIcon!: boolean;
  msjEtat!: string;
  updateImage!: FormGroup;

  constructor(
    private http: HttpClient,
    private sr: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.UpdaImage = this.formBuilder.group({
      Photo: '',
    });
  }

  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getUserByid(localStorage.getItem('id'));
  }
  getUserByid(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.username = this.data.firstName + ' ' + this.data.lastName;
      this.country = this.data.Country;
      this.numeroTel = this.data.numeroTel;
      this.email = this.data.username;
      this.photo = this.data.image;
    });
  }
  selectedFileName: string = '';
  get f() {
    return this.updateImage.controls;
  }

  imageUrl!: string;
  getCurrentUserDetails(): void {
    this.http.get<any>('http://localhost:8094/api/user/me').subscribe(
      (response) => {
        this.currentUser = response;
        console.log('Current user:', this.currentUser);
      },
      (error) => {
        console.error('Error fetching current user details:', error);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.UpdaImage.get('Photo')!.setValue(file);
      console.log(this.UpdaImage.get('Photo')!.value);
    } else {
      this.UpdaImage.get('Photo')!.setValue(this.imagepath);
    }
  }

  imagepath(imagepath: any) {
    throw new Error('Method not implemented.');
  }
  AddCoachForm() {
    const formData = new FormData();
    const photoFile = this.UpdaImage.get('Photo')?.value;
    if (photoFile instanceof File) {
      formData.append('file', photoFile, photoFile.name);
    }

    this.isLoading = true;
    this.uploadInProgress = true;

    this.sr
      .updateUserImage(localStorage.getItem('id'), formData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
