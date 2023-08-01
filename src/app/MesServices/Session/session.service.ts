import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from 'src/app/Models/Session';
import { environement } from 'src/environement/environement.dev';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  ajoutSession(session: Session, groupIds: number[]): Observable<any> {
    const url = `${environement.BASE_URL}/sessions/addSession?groupIds=${groupIds}`;
    return this.http.post(url, session);
  }

  deleteSession(sessionId: number): Observable<void> {
    const url = `${environement.BASE_URL}/sessions/deleteSession/${sessionId}`;
    return this.http.delete<void>(url);
  }
  getSessionsByDate(date: Date): Observable<any[]> {
    const formattedDate = this.formatDate(date);
    const url = `${environement.BASE_URL}/sessions/date/${formattedDate}`;
    return this.http.get<any[]>(url);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }
  getSessionsByUserId(userId: number): Observable<Session[]> {
    const url = `${environement.BASE_URL}/sessions/users/${userId}`;
    return this.http.get<Session[]>(url);
  }
  getSessionsByFormateurId(formateurId: number): Observable<Session[]> {
    const url = `${environement.BASE_URL}/sessions/formateur/${formateurId}`;
    return this.http.get<Session[]>(url);
  }
  getSessionsByGroupId(groupId: number): Observable<Session[]> {
    const url = `${environement.BASE_URL}/sessions/byGroupId/${groupId}`;
    return this.http.get<Session[]>(url);
  }
  /*getSessionsByUserId(): Observable<Session[]> {
    const userId = this.localStorage.get('userId');
    const url = `${this.baseUrl}/sessions/users/${userId}`;
    return this.http.get<Session[]>(url);
  }*/
}
