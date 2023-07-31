import { Component, OnInit } from '@angular/core';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';

@Component({
  selector: 'app-service-section',
  templateUrl: './service-section.component.html',
  styleUrls: ['./service-section.component.css']
})
export class ServiceSectionComponent implements OnInit {
  Allformation: any = [];
  tabFormation: any[] = [];
  tabFormationChunks: any[] = [];

  constructor(private formationsService: FormationsService) { }

  ngOnInit(): void {
    this.getALLFormations();
  }

  // Function to split an array into chunks
  chunkArray(array: any[], size: number): any[] {
    const chunkedArray = [];
    let index = 0;

    while (index < array.length) {
      chunkedArray.push(array.slice(index, index + size));
      index += size;
    }

    return chunkedArray;
  }

  getALLFormations() {
    this.formationsService.getFormations().subscribe(
      (data) => {
        this.Allformation = data;
        console.log(this.Allformation);
        this.tabFormation = this.chunkArray(this.Allformation, 3);
        console.log(this.tabFormation);
        this.tabFormationChunks = this.tabFormation;
      }
    );
  }
}
