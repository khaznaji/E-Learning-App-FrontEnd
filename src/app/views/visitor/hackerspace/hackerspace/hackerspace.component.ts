import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  photo!: SafeResourceUrl;
  path: string = "../../../../assets/Documents/";

  constructor(
    private hackerspaceService: HackerspacesService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.parameterValue = this.route.snapshot.paramMap.get('region');
    this.getALlByregion(this.parameterValue);
  }

  getALlByregion(nom: any) {
    this.hackerspaceService.findHackerspaceByregion(nom).subscribe(res => {
      this.hackTab = res;
      this.region = this.hackTab.region;
      this.location = this.hackTab.location;
      this.email = this.hackTab.email;
      this.phone = this.hackTab.phone;
      this.description = this.hackTab.description;
      this.photo = this.sanitizeUrl(this.path + this.hackTab.photo);
      console.log("enaa ::", this.hackTab);
    });
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
