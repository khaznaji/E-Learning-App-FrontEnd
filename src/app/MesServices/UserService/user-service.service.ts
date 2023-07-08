import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environement } from 'src/environement/environement.dev';
import { Coach } from '../../Models/Coach';
import { Students } from '../../Models/Students';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API = "http://localhost:8094"
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  constructor(private http:HttpClient , private userAuthService: UserAuthService) { }
  public login(loginData: any) {
    return this.http.post(this.PATH_OF_API + "/api/auth/signin", loginData, { headers: this.requestHeader })
  }
  public roleMatch(allowedRoles: any) {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;

          } else {
            return isMatch;
          }
        }
      }

    }
    return isMatch;
  }
  getRoles(): any {
    throw new Error('Method not implemented.');
  }
  ajoutStudent(Students:Students){
    return this.http.post(`${environement.BASE_URL}/auth/signupstudent`,Students);

  }
  ajoutFormateur(Formateur:Coach){
    return this.http.post(`${environement.BASE_URL}/auth/signup`,Formateur);


  }
  checkCode(code: any) {
    return this.http.get(this.PATH_OF_API + "/api/resetpassword/checkcode/" + code)
}
genCode(GenCode: any) {

  return this.http.post(this.PATH_OF_API + "/api/resetpassword/generatecode", GenCode);
}
changePassword(email: any, password: any) {
  return this.http.patch(this.PATH_OF_API + "/api/resetpassword/updatepassword/" + email, password)

}


getAllUsers(){
  return this.http.get(`${environement.BASE_URL}/user/all`);
}
public getUserByid(id:any)
{
  return this.http.get(this.PATH_OF_API + "/api/user/finduserbyid/" + id)

}


getFormateursOfuser()
{
  return this.http.get(`${environement.BASE_URL}/formateur/all`);
}
getFormationByTypeFormationAndStatus(typeFormation:string,status:string){
  return this.http.get(`${environement.BASE_URL}/user/findByTypeFormationAndStatus/${typeFormation}/${status}`);
}


getUserById(id:any){
  return this.http.get(`${environement.BASE_URL}/user/finduserbyid/${id}`);
}



//update image
updateImage(id:any,formData:any){
  return this.http.patch(`${environement.BASE_URL}/user/updateUserImageById/${id}`,formData);
}

updateUserImage(userId: any, file:any ) {

  return this.http.post(`${environement.BASE_URL}/user/imagechange/${userId}`, file);
}

}
