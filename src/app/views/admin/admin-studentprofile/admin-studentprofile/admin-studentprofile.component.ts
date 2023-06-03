import { Component } from '@angular/core';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-admin-studentprofile',
  templateUrl: './admin-studentprofile.component.html',
  styleUrls: ['./admin-studentprofile.component.css']
})
export class AdminStudentprofileComponent {
  taballusers:any=[]
  tabStudent:any=[]

  constructor(private sr:UserService) { }


  getallStudent() {
    this.sr.getAllUsers().subscribe(res=>{       
      this.taballusers=res;
      console.log(this.taballusers);
      // Filter the array to get only user with role "ETUDIANT" by id
      this.tabStudent = this.taballusers.filter((user: { roles: any[]; }) => {
        return user.roles.some(role => role.name === 'ETUDIANT');
      }
      );

})

  }
}
