import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/MesServices/Projects/projects.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  studentProjectsCount!: number;
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.getStudentProjectsCount();
  }

  getStudentProjectsCount() {
    this.projectService.getStudentProjectsCount()
      .subscribe(
        count => {
          this.studentProjectsCount = count;
        },
        error => {
          console.error('Error retrieving student projects count:', error);
        }
      );
  }
}
