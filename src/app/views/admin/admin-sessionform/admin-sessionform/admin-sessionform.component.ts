import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/MesServices/Session/session.service';

@Component({
  selector: 'app-admin-sessionform',
  templateUrl: './admin-sessionform.component.html',
  styleUrls: ['./admin-sessionform.component.css']
})
export class AdminSessionformComponent implements OnInit {

  sessioname!:any;
  description!:any;
  group!:any;
  datedebut!:any;
  time!:any;
  endtime!:any;
  constructor(private ses:SessionService) { }

deleteSession(id:any){
  this.ses.deleteSession(id).subscribe((res)=>{
    console.log(res);
  })
}

  addSession(){
    let session:any={
      "sessionName":this.sessioname,
      "description":this.description,
      "groupSession":this.group,
      "date":this.datedebut,
      "startTime":this.time,
      "endTime":this.endtime
    }
    console.log(session);
    this.ses.ajoutSession(session).subscribe((res)=>{
      console.log(res);
    })
  }

  ngOnInit(): void {
  }

}
