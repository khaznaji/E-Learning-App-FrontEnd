import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/Models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private BASE_URL = ' http://localhost:8094/api/Company/';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  create(formData: FormData): Observable<Company> {
    return this.http.post<Company>(`${this.BASE_URL}add`, formData);
  } 
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete/${id}`, { responseType: 'text' });
  }
  createC(formData: FormData): Observable<Company> {
    return this.http.post<Company>(`${this.BASE_URL}addC`, formData);
  } 
  updateComplaint(id: number, status: boolean) {
    return this.http.put(`${this.BASE_URL}updateStatus/${id}?status=${status}`, null);
  }
  getComplaintsByStatus(status: boolean): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.BASE_URL}getStatus/${status}`);
  }
}
