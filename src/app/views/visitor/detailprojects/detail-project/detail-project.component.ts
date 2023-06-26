import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProjectsService } from 'src/app/MesServices/AdminProjects/admin-projects.service';
import { ProjectOwnerService } from 'src/app/MesServices/ProjectOwner/project-owner.service';
import { AdminProjects } from 'src/app/Models/AdminProjects';
import { ProjectOwner } from 'src/app/Models/ProjectOwner';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit{
  project: AdminProjects = new AdminProjects();
  selectedCategory!: string; // Assuming categoryId is of type string
  categories: ProjectOwner[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: AdminProjectsService,
    private router: Router,
    private categorieService: ProjectOwnerService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    // this.get(projectId);
    this.get(projectId);
  }
  adminProjects: AdminProjects[] = [];

  get(projectId: number): void {
   
    this.projectService.getById(projectId).subscribe(
      (project: AdminProjects) => {
        this.project = project;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  ownerImageUrl!: string;

  // get1(projectId: number): void {
  //   this.projectService.getById(projectId).subscribe(
  //     (project: AdminProjects) => {
  //       this.project = project;
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }
  }