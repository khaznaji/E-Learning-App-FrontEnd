import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';

@Component({
  selector: 'app-admin-coachprofile',
  templateUrl: './admin-coachprofile.component.html',
  styleUrls: ['./admin-coachprofile.component.css'],
})
export class AdminCoachprofileComponent implements OnInit {
  data: any = [];
  nameuser = '';
  pathdf = '';
  url = '';
  firstname = '';
  lastname = '';
  about = '';
  phone = '';
  date = '';
  linkedin = '';
  photo = '';
  safeUrl: string | undefined;

  tabFormateur: any = [];
  id: any;
  selectedValue: any;
  constructor(private route: ActivatedRoute, private sr: UserService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  updateEnable() {
    console.log(this.selectedValue, this.id);

    this.sr.updateEnabeld(this.selectedValue, this.id).subscribe((res) => {
      console.log(res);
    });
  }

  tabCoach: any = [];
  taballusers: any = [];
  getUserId(id: any) {
    this.sr.getUserByid(id).subscribe((ex) => {
      this.data = ex;
      console.log(ex);
      this.firstname = this.data.firstName;
      this.lastname = this.data.lastName;
      this.about = this.data.about;
      this.phone = this.data.numeroTel;
      this.date = this.data.createdAt;
      this.linkedin = this.data.Linkedin;
      this.photo = this.data.image;

      this.pathdf = this.data.files;
      this.url = '../../../assets/Documents/' + this.data.files;
    });
  }

  ngOnInit(): void {
    this.getUserId(this.id);
  }
}
