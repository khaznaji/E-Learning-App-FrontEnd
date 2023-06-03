import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from 'src/app/Models/Session';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http:HttpClient) { }

  ajoutSession(Session:Session){
    return this.http.post(`${environement.BASE_URL}/Session/addSession`,Session);

}

deleteSession(id:any){
  return this.http.delete(`${environement.BASE_URL}/Session/deleteSession/${id}`);
}

}
