import { Component } from '@angular/core';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-coach-chat',
  templateUrl: './coach-chat.component.html',
  styleUrls: ['./coach-chat.component.css'],
})
export class CoachChatComponent {
  groups: Groups[] = [];

  constructor(
    private groupsService: GroupService,
    private userAuthService: UserAuthService
  ) {}
  ngOnInit() {
    const formateurid = this.userAuthService.getId();
    this.groupsService
      .getGroupsByFormateurId(formateurid)
      .subscribe((groups) => {
        this.groups = groups;
      });
  }
}
