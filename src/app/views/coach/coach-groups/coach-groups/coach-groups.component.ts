import { Component } from '@angular/core';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-coach-groups',
  templateUrl: './coach-groups.component.html',
  styleUrls: ['./coach-groups.component.css'],
})
export class CoachGroupsComponent {
  groups: any[] = [];
  private jwtToken: string;
  constructor(
    private groupsService: GroupService,
    public userAuthService: UserAuthService
  ) {
    this.jwtToken = localStorage.getItem('jwtToken') || '';
  }
  ngOnInit() {
    if (this.jwtToken) {
      const formateurid = this.userAuthService.getId();
      this.groupsService
        .getGroupsByFormateurId(formateurid)
        .subscribe((groups) => {
          this.groups = groups;
          console.log('Fetched groups:', this.groups);
        });
    } else {
      console.log('No user connected');
    }
  }
  getStudentImages(groupId: number): string[] {
    const group = this.groups.find((g) => g.id === groupId);
    if (!group || !group.etudiants) {
      return [];
    }

    const studentImages: string[] = [];

    for (const student of group.etudiants.slice(0, 3)) {
      studentImages.push(student.image);
    }

    return studentImages;
  }
}
