import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    this.email = '';
  }

  login(loginForm: any) {
    this.isLoading = true;

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setRoles(response.roles[0]);
        this.userAuthService.setToken(response.accessToken);
        this.userAuthService.setRolesSession(response.roles[0]);
        this.userAuthService.setTokenSession(response.accessToken);
        this.userAuthService.setSessionId(response.id);
        this.userAuthService.setId(response.id);

        const role = response.roles[0];

        if (role === 'ADMINISTRATEUR') {
          this.router.navigate(['/admin']);
        } else if (role === 'FORMATEUR') {
          this.router.navigate(['/coach']);
        } else {
          this.router.navigate(['/student']);
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your email or password is incorrect',
        });
        this.isLoading = false;
      }
    );
  }

  isValidEmail(email: string): boolean {
    // Regular expression to match email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
