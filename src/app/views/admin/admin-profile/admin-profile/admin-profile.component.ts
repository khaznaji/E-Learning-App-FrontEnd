import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent  implements OnInit {
  currentUser: any;
  data: any = [];
  username!:string;
  country!:string;
  numeroTel!:string
  email!:string;
  photo!:any
  image!:any

  constructor(private http: HttpClient,private  sr : UserService ) { }




  ngOnInit(): void {
    this.getCurrentUserDetails();
    this.getUserByid(localStorage.getItem('id'))
  }
  getUserByid(id:any){
    this.sr.getUserById(id).subscribe(res=>{
      this.data=res
      console.log(this.data);
      this.username=this.data.firstName+" "+this.data.lastName
      this.country =this.data.Country
      this.numeroTel=this.data.numeroTel
      this.email=this.data.username
      this.photo = this.data.image;


    })
  }
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
  imageUrl!: string;

  selectedFile!: File;


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:8094/api/user/addImage', formData).subscribe(
      (response) => {
        // Le téléchargement a réussi, response contient les données de la réponse du serveur
        this.imageUrl = response.image;
        this.getCurrentUserDetails(); // Recharge les données de l'utilisateur

      },
      (error) => {
        // Le téléchargement a échoué, affichez une erreur ou effectuez un traitement supplémentaire
        console.error(error);
      }
    );
  }


}



