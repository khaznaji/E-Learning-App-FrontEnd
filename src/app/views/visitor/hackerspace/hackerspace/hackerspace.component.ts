import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hackerspace',
  templateUrl: './hackerspace.component.html',
  styleUrls: ['./hackerspace.component.css']
})
export class HackerspaceComponent implements OnInit {
  hackTab: any = [];
  parameterValue: any;
  region: any;
  location: any;
  email: any;
  phone: any;
  description: any;
  photo!: any;

  path: string = "assets/Documents/";
adresse!:string;
  constructor(
    private hackerspaceService: HackerspacesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}


  getALlByregion(nom: any) {
    this.hackerspaceService.findHackerspaceByregion(nom).subscribe(res => {
      this.hackTab = res;
      this.region = this.hackTab.region;
      this.location = this.hackTab.location;
      this.email = this.hackTab.email;
      this.phone = this.hackTab.phone;
      this.description = this.hackTab.description;
      this.photo = this.path+this.hackTab.photo;
      this.adresse = this.hackTab.adresse;
      console.log("enaa ::", this.photo);
      this.displayImage();

    });
  }

  ngOnInit(): void {
    this.parameterValue = this.route.snapshot.paramMap.get('region');
    this.getALlByregion(this.parameterValue);
  }
  displayImage() {
    // Access this.photo here after it has been assigned
    console.log(this.photo);
  }


}
