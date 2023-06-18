import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {


etat!:boolean
  msj=""
  code=""
  email=localStorage.getItem('emaili')
  constructor(private sr:UserService, private router:Router){

  }

  checkPassword()
  {
    this.sr.checkCode(this.code).subscribe(res=>{
      localStorage.setItem("code",this.code)

      this.router.navigate(['../resetpassword']);

    },

  err=>{
    console.log("error")
  })

  }

  ngOnInit(): void {
    if(localStorage.getItem("email")==null)
    {
      this.router.navigate(['../forgotpassword']);
    }
  }
}
