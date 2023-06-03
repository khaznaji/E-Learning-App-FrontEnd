import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  tabCategorie:any=[]
  Categorie =""

  constructor(private cs: CategorieService) { }

  deleteCategrie(id:any){
    this.cs.deleteCategorie(id).subscribe((res)=>{
      console.log(res);
      this.getAllCategorie(); // Update the Page after successful deletion
    })
  }

  getAllCategorie() {
    this.cs.getCategories().subscribe(res=>{
      this.tabCategorie=res
      console.log(this.tabCategorie );

    })
  }
  ngOnInit(): void {
    this.getAllCategorie()


}}
