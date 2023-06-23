import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';

@Component({
  selector: 'app-admin-trainings',
  templateUrl: './admin-trainings.component.html',
  styleUrls: ['./admin-trainings.component.css']
})
export class AdminTrainingsComponent  implements OnInit{
  tabCategorie:any=[]
  Categorie="" ;
  Formation: any = [];
  tabFormation : any= [] ;
  id :any ;

    constructor(private cs:CategorieService,private fs: FormationsService) { }
    getAllCategorie() {
      this.cs.getCategories().subscribe(res => {
        this.tabCategorie = res;
        console.log(this.tabCategorie);

        this.tabCategorie.forEach((category: any) => {
          this.getFormationByCategorie(category.id, category);
        });
      });
    }

    getFormationByCategorie(categoryId: any, category: any) {
      this.fs.getFormationByCategorie(categoryId).subscribe(res => {
        category.formations = res;
        console.log(category.formations);
      });
    }
    deleteFormation(id:any){
      if (confirm('Are you sur?'))
      this.fs.deleteFormation(id).subscribe((res)=>{
        console.log(res);
        this.getAllCategorie(); // Update the Page after successful deletion

      })
    }

    ngOnInit(): void {
      this.getAllCategorie()

    }

}
