import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  currentUser: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCurrentUserDetails();
  }

  getCurrentUserDetails(): void {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.http.get<any>('http://localhost:8094/api/user/me', { headers }).subscribe(
        response => {
          this.currentUser = response;
          console.log('Current user:', this.currentUser);
        },
        error => {
          console.error('Error fetching current user details:', error);
        }
      );
    } else {
      console.error('Access token not found in localStorage');
    }
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
