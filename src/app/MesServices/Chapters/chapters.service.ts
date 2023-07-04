import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {

  constructor(private http:HttpClient) { }

  //add chapters by id formation
  ajoutChapters(Chapters: any,id:Number): Observable<any> {
    return this.http.post(`${environement.BASE_URL}/chapters/addChapters/`+id, Chapters);
  }
  //get chapters by nomformation
  getChaptersByNomFormation(nom:any){
    return this.http.get(`${environement.BASE_URL}/chapters/getChaptersByNomFormation/${nom}`);
  }
}
