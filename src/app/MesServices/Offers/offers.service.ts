import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offers } from 'src/app/Models/Offers';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private BASE_URL = ' http://localhost:8094/api/Offers/';

  constructor(private http: HttpClient) { }
  addOffer(projectData: FormData) {
    return this.http.post(`${this.BASE_URL}add`, projectData);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete/${id}`, { responseType: 'text' });
  }
  updateProject(projectId: number, projectData: FormData): Observable<Offers> {
    const url = `${this.BASE_URL}update/${projectId}`;
    return this.http.put<Offers>(url, projectData);
  }
  getClaimsSortedByDate(order: string): Observable<Offers[]> {
    return this.http.get<Offers[]>(`${this.BASE_URL}getSortedByDate/${order}`);
  }
  getOffersByType(type: string): Observable<Offers[]> {
    const url = `${this.BASE_URL}AllType?type=${type}`;
    return this.http.get<Offers[]>(url);
  }
}
