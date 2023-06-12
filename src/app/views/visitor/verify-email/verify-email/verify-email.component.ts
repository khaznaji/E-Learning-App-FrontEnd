import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {


etat!:boolean
  msj=""
  code=""
  email=localStorage.getItem('emaili')
  constructor(private sr:UserService, private router:Router){

  }

  checkPassword()
  {
    this.sr.checkCode(this.code).subscribe(res=>{

      this.router.navigate(['../resetpassword']);

    },

  err=>{
    console.log("error")
  })

  }
}
