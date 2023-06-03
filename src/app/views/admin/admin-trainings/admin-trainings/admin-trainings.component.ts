import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';

@Component({
  selector: 'app-admin-trainings',
  templateUrl: './admin-trainings.component.html',
  styleUrls: ['./admin-trainings.component.css']
})
export class AdminTrainingsComponent  implements OnInit{
  tabCategorie:any=[] 
  Categorie="" ;
  
    constructor(private cs:CategorieService) { }
    getAllCategorie() {
      console.log(this.tabCategorie);
      
      this.cs.getCategories().subscribe(res=>{
        this.tabCategorie=res ;
        console.log(this.tabCategorie);
        
      }
        )
    }

  
    ngOnInit(): void {
      this.getAllCategorie()
    }

}
