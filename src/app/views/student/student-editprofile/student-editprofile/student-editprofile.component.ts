import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-student-editprofile',
  templateUrl: './student-editprofile.component.html',
  styleUrls: ['./student-editprofile.component.css']
})
export class StudentEditprofileComponent implements OnInit {
  taballusers:any=[]
  tabStudent:any=[]

  status=""


    constructor(private sr:UserService) { }
    getallStudent() {
      this.sr.getAllUsers().subscribe(res=>{
        this.taballusers=res;
        console.log(this.taballusers);

        // Filter the array to get only users with role "ETUDIANT"
        this.tabStudent = this.taballusers.filter((user: { roles: any[]; }) => {
          return user.roles.some(role => role.name === 'ETUDIANT');
        });

        console.log(this.tabStudent);
      })
    }
      ngOnInit(): void {
        this.getallStudent()
      }

}

