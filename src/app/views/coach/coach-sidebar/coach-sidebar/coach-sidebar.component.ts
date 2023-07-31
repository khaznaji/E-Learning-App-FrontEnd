import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coach-sidebar',
  templateUrl: './coach-sidebar.component.html',
  styleUrls: ['./coach-sidebar.component.css']
})
export class CoachSidebarComponent implements OnInit {

  data: any = [];
username!:string;
photo !:any;
  constructor(private sr:UserService,private Auth:UserAuthService , private route:Router,private http: HttpClient) { }


  getUserByid(id:any){
    this.sr.getUserById(id).subscribe(res=>{
      this.data=res
      console.log(this.data);
      this.username=this.data.firstName+" "+this.data.lastName
      this.photo = this.data.image

    })
  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear authentication data (assuming this.Auth.clear() does the job)
        this.Auth.clear();

        // Navigate to the login page
        this.route.navigate(['/login']);
      }
    });
  }
  currentUser: any;

  getCurrentCoachDetails(): void {
    this.http.get<any>('http://localhost:8094/api/formateur/me').subscribe(
      response => {
        this.currentUser = response;
        console.log('Current user:', this.currentUser);
      },
      error => {
        console.error('Error fetching current user details:', error);
      }
    );
  }


  ngOnInit(): void {

    this.getUserByid(localStorage.getItem('id'))

    this.getCurrentCoachDetails();
  }

}
