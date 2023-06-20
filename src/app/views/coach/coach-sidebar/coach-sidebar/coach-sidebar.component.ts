import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-coach-sidebar',
  templateUrl: './coach-sidebar.component.html',
  styleUrls: ['./coach-sidebar.component.css']
})
export class CoachSidebarComponent implements OnInit {

  data: any = [];
username!:string;
  constructor(private sr:UserService,private Auth:UserAuthService , private route:Router,private http: HttpClient) { }


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
