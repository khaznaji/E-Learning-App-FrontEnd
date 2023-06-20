import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css']
})
export class CoachProfileComponent implements   OnInit {
  currentUser: any;

  data: any = [];
  username!:string;
  image!:any;


  status:boolean=false;
  updateImage!:FormGroup;
    constructor(private sr:UserService,private formBuilder: FormBuilder,private http: HttpClient)
      { }


    getUserByid(id:any){
      this.sr.getUserById(id).subscribe(res=>{
        this.data=res
        console.log(this.data);
        this.username=this.data.firstName+" "+this.data.lastName
        this.image=this.data.image
      })
    }
    selectedFileName: string = '';
    get f() { return this.updateImage.controls; }

    cjangeleImage(){
      const formData = new FormData();
      formData.append('image', this.updateImage.get('image')!.value);
      this.sr.updateImage(localStorage.getItem('id'),formData).subscribe(res=>{
        this.getUserByid(localStorage.getItem('id'))

        console.log(res)})

    }
    // onFileSelected(event: any) {
    //   if (event.target.files && event.target.files.length > 0) {
    //     const file = event.target.files[0];
    //     this.updateImage.get('image')!.setValue(file);
    //     this.selectedFileName = file.name;
    //   }
    // }
    imageUrl!: string;

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);

      this.http.post<any>('http://localhost:8094/api/formateur/addImage', formData).subscribe(
        (response) => {
          // Le téléchargement a réussi, response contient les données de la réponse du serveur
          this.imageUrl = response.image;
          this.getCurrentCoachDetails(); // Recharge les données de l'utilisateur

        },
        (error) => {
          // Le téléchargement a échoué, affichez une erreur ou effectuez un traitement supplémentaire
          console.error(error);
        }
      );
    }
    ngOnInit(): void {
      this.getCurrentCoachDetails();

      // this.getUserByid(localStorage.getItem('id'))

      // this.updateImage=this.formBuilder.group({
      //   image: ['']

      // })
    }
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
}
