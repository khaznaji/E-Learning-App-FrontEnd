import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  emaili:String="" 


  constructor(private sr:UserService,private router:Router){}

  save()
  {
    let dateno= Date.now()
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let data:any={
      "code":result,
      "email":this.emaili,
      "dateCreation":dateno
    }
    this.sr.genCode(data).subscribe(res=>{

      localStorage.setItem('email',this.emaili.toString())
      this.sendEmail(this.emaili,result)
      this.router.navigate(['/SetCode']);


    })
  }
  sendEmail(emaili: String, result: string) {
    throw new Error('Method not implemented.');
  }


  

}
