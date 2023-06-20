import { Component, OnInit } from '@angular/core';
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
  constructor(private sr:UserService,private Auth:UserAuthService , private route:Router) { }


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


  ngOnInit(): void {

    this.getUserByid(localStorage.getItem('id'))
  }

}
