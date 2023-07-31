import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/MesServices/Projects/projects.service';


@Component({
  selector: 'app-coach-students-table',
  templateUrl: './coach-students-table.component.html',
  styleUrls: ['./coach-students-table.component.css']
})
export class CoachStudentsTableComponent {
  constructor(private http: HttpClient,private projectService: ProjectService , private router: Router ) { }
  project:any ;

  ngOnInit() {
    this.reloadData();

  }
  reloadData() {
    this.project = this.projectService.getProject().subscribe((res)=>{
      this.project=res;
      console.log(res);

     });

  }
  showDetails(id: number) {
    this.router.navigate(['coach/groups/table/project', id]);
  }
}
