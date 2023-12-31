import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  tabCategorie:any=[]
  Categorie=""
  Formation: any = [];
  tabFormation : any= [] ;
  id :any ;
  tabHackerSpace:any=[]

  constructor(private cs: CategorieService , private fs: FormationsService, private HackerSpaceService:HackerspacesService) { }
  getAllCategorie() {
    this.cs.getCategories().subscribe(res=>{
      this.tabCategorie=res
      console.log(this.tabCategorie );

    })

  }

  getAllHackerSpace()
  {
    this.HackerSpaceService.getAllHackerspaces().subscribe(res=>{
      this.tabHackerSpace=res
      console.log(this.tabHackerSpace);

    })
  }

  getFormationByCategorie(categoryId: any) {
    this.fs.getFormationByCategorie(categoryId).subscribe(res => {
      this.tabFormation = res;
      console.log(this.tabFormation);
    });

  }
  ngOnInit(): void {
    this.getAllCategorie()
   this.getFormationByCategorie(this.id)
   this.getAllHackerSpace()



}}
