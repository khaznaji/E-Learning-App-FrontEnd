import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/MesServices/Company/company.service';
import { Company } from 'src/app/Models/Company';
import { SpecificProject } from 'src/app/Models/SpecificProject';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  constructor(private sp:CompanyService , private router: Router){}
  ngOnInit(): void {
    this.get();
   
     }
     adminProjects: Company[] = [];

     get(){  
    this.sp.getAll().subscribe(
      (adminProjects: Company[]) => {
        this.adminProjects = adminProjects;
      },
      (error: any) => {
        console.error(error);
      }
    );}
    deleteEvents = (id: number) => {
      if (confirm('Are you sur?')) {
        this.sp.deleteFood(id).subscribe(() => {
          // Recharge la page après la suppression
          window.location.reload();
          
        });
      }
    }
    updateComplaintAndSendEmail(complaint: Company) {
      this.isUpdating = true;
      this.sp.updateComplaint(complaint.id, true).subscribe(
        () => {
          console.log('Complaint updated successfully');
          complaint.status = true;
          this.isUpdating = false;
          this.get();
  
        },
        (error) => {
          console.error('Error updating complaint', error);
          this.isUpdating = false;
        }
      );
    }
    isUpdating = false;
    
    onCheckboxClick(event: Event) {
      const target = event.target as HTMLInputElement;
      const label = target.nextElementSibling as HTMLLabelElement;
  
      label.textContent = target.checked ? '' : '';
    }
    selectedStatus: string = '';

    onStatusChange() {
      if (this.selectedStatus === '') {
  this.get();    } else {
        const status = this.selectedStatus === 'true';
        this.sp.getComplaintsByStatus(status).subscribe(
          (complaints) => {
            this.adminProjects = complaints;
          },
          (error) => {
            console.error('Error filtering complaints by status', error);
          }
        );
      }
    }
}
