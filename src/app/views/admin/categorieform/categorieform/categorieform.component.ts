import { Component } from '@angular/core';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';

@Component({
  selector: 'app-categorieform',
  templateUrl: './categorieform.component.html',
  styleUrls: ['./categorieform.component.css']
})
export class CategorieformComponent {
  nomCate: string = '';
  showWarning: boolean = false;

  constructor(private cat: CategorieService) { }

  addCategorie() {
    if (this.nomCate.trim() !== '') {
      let categorie: any = {
        "nomCate": this.nomCate
      };
      console.log(categorie);
      this.cat.addCategorie(categorie).subscribe((res) => {
        console.log(res);
      });
    } else {
      this.showWarning = true;
    }
  }
}
