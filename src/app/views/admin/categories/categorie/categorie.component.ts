import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/MesServices/Categorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  tabCategorie: any = [];
  Categorie = '';

  constructor(private cs: CategorieService) {}

  deleteCategrie(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cs.deleteCategorie(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.getAllCategorie(); // Update the Page after successful deletion
        });
      }
    });
  }
  getAllCategorie() {
    this.cs.getCategories().subscribe((res) => {
      this.tabCategorie = res;
      console.log(this.tabCategorie);
    });
  }
  async updateCategory(category: any) {
    const newName = await Swal.fire({
      title: 'Update Category',
      input: 'text',
      inputValue: category.name,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (name) => {
        if (!name || name.trim() === '') {
          Swal.showValidationMessage('Please enter a valid category name.');
        } else {
          return name.trim();
        }
      },
    });

    if (newName.isConfirmed) {
      try {
        const updatedCategory = await this.cs
          .updateCategorie(category.id, { name: newName.value })
          .toPromise();
        Swal.fire({
          icon: 'success',
          title: 'Category Updated!',
          text: 'The category has been successfully updated.',
        });
        this.getAllCategorie(); // Refresh the categories list after the update
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed!',
          text: `Failed to update the category: ${error}`,
        });
      }
    }
  }

  ngOnInit(): void {
    this.getAllCategorie();
  }
}
