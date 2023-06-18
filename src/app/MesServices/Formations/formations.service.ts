import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class FormationsService {
  constructor(private http:HttpClient) { }

  getFormations(){
    return this.http.get(`${environement.BASE_URL}/formation/all`);
  }
  //get formation by idcategorie
  getFormationByCategorie(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getFormationsByCategorieId/${id}`);
  }
// get formation by id
  getFormationById(id:any){
    return this.http.get(`${environement.BASE_URL}/formation/getFormationById/${id}`);
  }
  getFormationByNomFormation(nom:any){
    return this.http.get(`${environement.BASE_URL}/formation/getFormationByNomFormation/${nom}`);
  }
}
