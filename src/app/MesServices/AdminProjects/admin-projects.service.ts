import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AdminProjects } from 'src/app/Models/AdminProjects';

@Injectable({
  providedIn: 'root'
})
export class AdminProjectsService {
  private BASE_URL = ' http://localhost:8094/api/AdminProjects/';

  constructor(private http: HttpClient) { }

  addProject(projectData: FormData) {
    return this.http.post(`${this.BASE_URL}add`, projectData);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}All`);
  }
  updateProject(projectId: number, projectData: FormData): Observable<AdminProjects> {
    const url = `${this.BASE_URL}update/${projectId}`;
    return this.http.put<AdminProjects>(url, projectData);
  }
  getById(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}catId/${id}`);
  }
  deleteFood(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete/${id}`, { responseType: 'text' });
  }
}
