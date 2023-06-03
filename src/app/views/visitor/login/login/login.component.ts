import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  constructor(private UserService:UserService,private UserAuthService:UserAuthService,private router:Router) { }
  ngOnInit(): void {  }
  login ( loginForm:any )  {
   this.UserService.login(loginForm.value).subscribe
   (
    (response:any) => {
     console.log(response)
      this.UserAuthService.setRoles(response.roles[0]);
      this.UserAuthService.setToken(response.accessToken);
      this.UserAuthService.setRolesSession(response.roles[0]);
      this.UserAuthService.setTokenSession(response.accessToken);
      this.UserAuthService.setSessionId(response.id);
      this.UserAuthService.setId(response.id);

      const role = response.roles[0];

      if(role ==='ADMINISTRATEUR') {
      this.router.navigate(['/admin']);
      } else  if(role ==='FORMATEUR') {
        this.router.navigate(['/coach']);
      } else{
        this.router.navigate(['/student']);
      }
    },
    (error) => {
      console.log(error) ;

    }


   );



  }

}
