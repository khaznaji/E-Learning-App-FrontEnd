import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  currentUser: any;
  data: any = [];
  username!:string;
  country!:string;
  numeroTel!:string
  email!:string;
  photo!:any
  image!:any





  constructor(private http: HttpClient ,private  sr : UserService ) { }

  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getUserByid(localStorage.getItem('id'))
  }
  getUserByid(id:any){
    this.sr.getUserById(id).subscribe(res=>{
      this.data=res
      console.log(this.data);
      this.username=this.data.firstName+" "+this.data.lastName
      this.country =this.data.Country
      this.numeroTel=this.data.numeroTel
      this.email=this.data.username
      this.photo = this.data.image;


    })
  }

  getCurrentUserDetails(): void {
    this.http.get<any>('http://localhost:8094/api/user/me').subscribe(
      response => {
        this.currentUser = response;
        console.log('Current user:', this.currentUser);
      },
      error => {
        console.error('Error fetching current user details:', error);
      }
    );
  }
  imageUrl!: string;

  selectedFile!: File;


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);

    // Append the folder name to the endpoint URL
    this.http.post<any>('http://localhost:8094/api/user/addImage/profile', formData).subscribe(
      (response) => {
        // The upload was successful, response contains the server's response data
        this.imageUrl = response.image;
        this.getCurrentUserDetails(); // Refresh user data
      },
      (error) => {
        // The upload failed, handle the error
        console.error(error);
      }
    );
  }


}
