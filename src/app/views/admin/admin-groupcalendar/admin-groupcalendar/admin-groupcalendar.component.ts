import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { Session } from 'src/app/Models/Session';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-admin-groupcalendar',
  templateUrl: './admin-groupcalendar.component.html',
  styleUrls: ['./admin-groupcalendar.component.css'],
})
export class AdminGroupcalendarComponent implements OnInit {
  sessions: Session[] = [];
  selectedSession!: Session;
  groupId!: number;
  groups: Groups[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { groupId: number },
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.groupId = params['groupId'];
      console.log(this.groupId);
      this.retrieveSessions(this.groupId);
    });
  }

  retrieveSessions(groupId: number): void {
    this.sessionService.getSessionsByGroupId(groupId).subscribe(
      (sessions: Session[]) => {
        this.sessions = sessions;
        this.selectedSession = sessions[0];
        console.log('Sessions:', sessions);
      },
      (error) => {
        console.log('Error retrieving sessions:', error);
      }
    );
  }

  getGroupsBySessionId(sessionId: number): void {
    this.groupService.getGroupsBySessionId(sessionId).subscribe(
      (groups: Groups[]) => {
        this.groups = groups;
        console.log('Groups:', groups);
      },
      (error) => {
        console.log('Error retrieving groups:', error);
      }
    );
  }

  selectSession(session: Session) {
    this.selectedSession = session;
    const sessionId = session.id as number;
    this.getGroupsBySessionId(sessionId);
  }

  calculateDuration(session: Session): number {
    const start = new Date(session.startDate);
    const finish = new Date(session.finishDate);
    const duration = (finish.getTime() - start.getTime()) / (1000 * 60);
    return duration;
  }
}
