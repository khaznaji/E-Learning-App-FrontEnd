import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Session } from 'src/app/Models/Session';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-coach-calendar',
  templateUrl: './coach-calendar.component.html',
  styleUrls: ['./coach-calendar.component.css'],
})
export class CoachCalendarComponent {
  sessions: Session[] = [];
  selectedSession!: Session;
  sessionGroups: Groups[] = [];

  constructor(
    private sessionService: SessionService,
    private userAuthService: UserAuthService,
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
   
    this.retrieveSessions();
    this.route.queryParams.subscribe((params) => {
      const sessionId = Number(params['sessionId']);
      if (!isNaN(sessionId) && sessionId > 0) {
        this.selectSessionById(sessionId);
      } else {
        // If no valid sessionId in queryParams, select the first session
        if (this.sessions.length > 0) {
          this.selectSession(this.sessions[0]);
        }
      }
    });
  }

  retrieveSessions(): void {
    const formateurId = this.userAuthService.getId(); // Assuming getId() returns the formateurId
    this.sessionService.getSessionsByFormateurId(formateurId).subscribe(
      (sessions: Session[]) => {
        this.sessions = sessions;
        if (this.selectedSession && this.selectedSession.id !== undefined) {
          this.getGroupsForSession(this.selectedSession.id);
        } else if (sessions.length > 0) {
          this.selectedSession = sessions[0];
          if (this.selectedSession.id !== undefined) {
            this.getGroupsForSession(this.selectedSession.id);
          }
        } else {
          this.sessionGroups = [];
        }
        console.log('Sessions:', sessions);
      },
      (error) => {
        console.log('Error retrieving sessions:', error);
      }
    );
  }
  

  selectSession(session: Session) {
    this.selectedSession = session;
    if (session?.id) {
      this.getGroupsForSession(session.id);
    } else {
      this.sessionGroups = []; 
    }
  }
  selectSessionById(sessionId: number | undefined) {
    if (sessionId === undefined) {
      return;
    }
    const session = this.sessions.find((s) => s.id === sessionId);
    if (session) {
      this.selectedSession = session;
      this.getGroupsForSession(session.id as number); 
    }
  }

  calculateDuration(session: Session): number {
    const start = new Date(session.startDate);
    const finish = new Date(session.finishDate);
    const duration = (finish.getTime() - start.getTime()) / (1000 * 60);
    return duration;
  }
  getGroupsForSession(sessionId: number): void {
    this.groupService.getGroupsBySessionId(sessionId).subscribe(
      (groups: Groups[]) => {
        this.sessionGroups = groups;
        console.log('Groups for session:', groups);
      },
      (error) => {
        console.log('Error retrieving groups:', error);
      }
    );
  }
}
