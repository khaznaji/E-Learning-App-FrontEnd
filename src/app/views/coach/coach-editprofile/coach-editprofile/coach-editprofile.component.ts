import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-coach-editprofile',
  templateUrl: './coach-editprofile.component.html',
  styleUrls: ['./coach-editprofile.component.css']
})
export class CoachEditprofileComponent implements OnInit{

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
    ngOnInit(): void {
      this.getUserByid(localStorage.getItem('id'))

    }

}
