import { Component, OnInit } from '@angular/core';
import { ChaptersService } from 'src/app/MesServices/Chapters/chapters.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-chapters',
  templateUrl: './admin-chapters.component.html',
  styleUrls: ['./admin-chapters.component.css']
})
export class AdminChaptersComponent implements OnInit {
  tabFormation: any[] = [];
  chaptersByFormation: any = {};

  constructor(private cs: ChaptersService, private fs: FormationsService) { }

  ngOnInit(): void {
    this.getAllFormation();
  }

  getChaptersByNomFormation(nomFormation: string) {
    this.cs.getChaptersByNomFormation(nomFormation).subscribe(res => {
      this.chaptersByFormation[nomFormation] = res;
      console.log(this.chaptersByFormation);
    });
  }

  getAllFormation() {
    this.fs.getFormations().subscribe((res: any) => {
      this.tabFormation = res;
      console.log(this.tabFormation);

      this.tabFormation.forEach((formation: any) => {
        this.getChaptersByNomFormation(formation.nomFormation);
      });
    });
  }
  deleteChapters(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cs.deleteChapters(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.getAllFormation(); // Update the Page after successful deletion
        });
      }
    });
  }

  getAllChapters(): any[] {
    let chapters: any[] = [];
    for (const formationKey in this.chaptersByFormation) {
      if (this.chaptersByFormation.hasOwnProperty(formationKey)) {
        chapters = chapters.concat(this.chaptersByFormation[formationKey]);
      }
    }
    return chapters;
  }
}
