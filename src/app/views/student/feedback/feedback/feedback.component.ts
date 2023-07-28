import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/MesServices/Feedback/feedback.service';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  Allformation: any = [];
  successMessage: string = '';
  errorMessage: string = '';
formation: any;
UserConnected: any=[];
comment: any;
idUser!:any;
  constructor(private FormationsService:FormationsService,private fb:FeedbackService, private User:UserService,private AuthSer:UserAuthService ) {
    this.idUser = this.AuthSer.getId()
  }


  AddFeedback() {
    if(this.formation && this.comment){
      let feedback = {
        formation: this.formation,
        comment: this.comment,
        user: this.UserConnected
      };
      this.fb.ajoutFeedback(feedback).subscribe(
        (data: any) => {
          this.successMessage = 'Training program added successfully.';
          this.errorMessage = '';
          console.log(data);

        },
        (error: any) => {
          this.successMessage = '';
          this.errorMessage = 'Error adding the training program. Please try again.';
          console.log(error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all the required fields.';
    }
  }



  getALLFormations() {
    this.FormationsService.getFormations().subscribe(
      (data) => {
        this.Allformation = data;
        console.log(this.Allformation);
      }
    )
  }

  ngOnInit(): void {
    this.getALLFormations();
    console.log(this.idUser);
    this.User.getUserById(this.idUser).subscribe((data)=>{
      this.UserConnected=data;
      console.log(this.UserConnected);
    })

}}
