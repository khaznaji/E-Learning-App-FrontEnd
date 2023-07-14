import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { OffersService } from 'src/app/MesServices/Offers/offers.service';
import { Offers } from 'src/app/Models/Offers';

@Component({
  selector: 'app-detail-offers',
  templateUrl: './detail-offers.component.html',
  styleUrls: ['./detail-offers.component.css']
})
export class DetailOffersComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private projectService: OffersService,
    private router: Router,
    private categorieService: CompanyService
  ) {}
  project: Offers = new Offers();

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    // this.get(projectId);
    this.get(projectId);
  }
  get(projectId: number): void {
   
    this.projectService.getById(projectId).subscribe(
      (project: Offers) => {
        this.project = project;

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
