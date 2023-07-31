import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-admin-studentprofile',
  templateUrl: './admin-studentprofile.component.html',
  styleUrls: ['./admin-studentprofile.component.css']
})
export class AdminStudentprofileComponent {
  taballusers:any=[]
  tabStudent:any=[]
  id:any ;
  data:any=[]
  nameuser=""
  pathdf=""
  url=""
  firstname=""
  lastname=""
  about=""
  phone=""
  date=""
  linkedin=""
  photo=""
selectedValue:any;
  constructor(private sr:UserService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');

   }

   updateEnable() {
    console.log(this.selectedValue , this.id);

    this.sr.updateEnabeld(this.selectedValue,this.id).subscribe(res=>{
      console.log(res);
    });
   }

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
  getUserId(id:any)
{
  this.sr.getUserByid(id).subscribe(ex=>{
    this.data=ex
    console.log(ex)
    this.firstname=this.data.firstName
    this.lastname=this.data.lastName
    this.about=this.data.about
    this.phone=this.data.numeroTel
    this.date=this.data.createdAt
    this.linkedin=this.data.Linkedin
    this.photo = this.data.image

    this.pathdf=this.data.files
    this.url="../../../assets/Documents/"+this.data.files
  })
}
ngOnInit(): void {
  this.getUserId(this.id)

}
}
