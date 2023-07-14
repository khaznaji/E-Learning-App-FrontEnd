import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent  implements OnInit {
  data: any = [];
  username!:string;
    constructor(private sr:UserService,private Auth:UserAuthService, private route:Router) { }

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
