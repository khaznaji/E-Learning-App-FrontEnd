import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-coach-sidebar',
  templateUrl: './coach-sidebar.component.html',
  styleUrls: ['./coach-sidebar.component.css']
})
export class CoachSidebarComponent implements OnInit {

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
