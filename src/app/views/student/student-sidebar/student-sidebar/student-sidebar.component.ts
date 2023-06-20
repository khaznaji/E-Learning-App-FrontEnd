import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent  implements OnInit{
  data: any = [];
  username!:string;
    constructor(private sr:UserService , private Auth:UserAuthService , private route:Router,private http: HttpClient) { }


    getUserByid(id:any){
      this.sr.getUserById(id).subscribe(res=>{
        this.data=res
        console.log(this.data);
        this.username=this.data.firstName+" "+this.data.lastName

      })
    }
    logout(){
      this.Auth.clear()
      this.route.navigate(['/login'])
    }
    currentUser: any;

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

    ngOnInit(): void {

      this.getUserByid(localStorage.getItem('id'))
      this.getCurrentUserDetails();
    }

  }



