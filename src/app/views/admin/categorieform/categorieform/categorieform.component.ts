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
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private cat: CategorieService) { }

  addCategorie() {
    if (this.nomCate.trim() !== '') {
      let categorie: any = {
        "nomCate": this.nomCate
      };

      this.cat.addCategorie(categorie).subscribe(
        (res) => {
          this.successMessage = 'Category added successfully.';
          this.errorMessage = '';
          console.log(res);
        },
        (error) => {
          this.successMessage = '';
          this.errorMessage = 'Error adding the category. Please try again.';
          console.log(error);
        }
      );
    } else {
      this.showWarning = true;
    }
  }
}
