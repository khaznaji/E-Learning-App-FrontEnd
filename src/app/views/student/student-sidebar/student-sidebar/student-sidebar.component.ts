import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css']
})
export class StudentSidebarComponent  implements OnInit{
  data: any = [];
  username!:string;
    constructor(private sr:UserService) { }


    getUserByid(id:any){
      this.sr.getUserById(id).subscribe(res=>{
        this.data=res
        console.log(this.data);
        this.username=this.data.firstName+" "+this.data.lastName

      })
    }

    ngOnInit(): void {

      this.getUserByid(localStorage.getItem('id'))
    }

  }



