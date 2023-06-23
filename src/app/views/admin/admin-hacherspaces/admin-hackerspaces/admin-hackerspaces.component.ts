import { Component, OnInit } from '@angular/core';
import { HackerspacesService } from 'src/app/MesServices/Hackerspaces/hackerspaces.service';


@Component({
  selector: 'app-admin-hackerspaces',
  templateUrl: './admin-hackerspaces.component.html',
  styleUrls: ['./admin-hackerspaces.component.css']
})
export class AdminHackerspacesComponent implements OnInit {
  Hackerspace:any=[]


  constructor(private hs: HackerspacesService) { }


  deleteHackerspace(id:any){
    if (confirm('Are you sur?')) {
    this.hs.deleteHackerspace(id).subscribe((res)=>{
      console.log(res);
      this.getAllHackerspaces(); // Update the Page after successful deletion
    })
  }}

  getAllHackerspaces() {
    this.hs.getAllHackerspaces().subscribe(res => {
      this.Hackerspace=res
      console.log(res);
    });
  }
  ngOnInit(): void {
    this.getAllHackerspaces();
  }
}
