import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-tream-section',
  templateUrl: './tream-section.component.html',
  styleUrls: ['./tream-section.component.css']
})
export class TreamSectionComponent implements OnInit{

  constructor(private sr:UserService) { }
  tabCoach:any=[]
  taballusers:any=[]
image!:any;
  tabFormateur:any=[]
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

tabCoachChunks: any[] = [];
getAllFormateur() {
  this.sr.getFormateursOfuser().subscribe(res=>{
    this.tabFormateur=res
    console.log(this.tabFormateur);

  }
    )
}

getallCoach() {
  this.sr.getAllUsers().subscribe(res => {
    this.taballusers = res;
    console.log(this.taballusers);
    this.tabCoach = this.taballusers.filter((user: { roles: any[];  enabled: any }) => {
      return user.roles.some(role => role.name === 'FORMATEUR')&& user.enabled === 1;
    });
    console.log("",this.tabCoach);
    this.tabCoachChunks = this.chunkArray(this.tabCoach, 3); // Split the tabCoach array into chunks of 3
  });
}

  ngOnInit(): void {

    this.getallCoach()
   this.getAllFormateur()
  }

}
