import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Session } from 'src/app/Models/Session';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-student-calendar',
  templateUrl: './student-calendar.component.html',
  styleUrls: ['./student-calendar.component.css'],
})
export class StudentCalendarComponent {
 
  sessions!: Session[];
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
        if (this.sessions.length > 0) {
          this.selectSession(this.sessions[0]);
        }
      }
    });
  }

  retrieveSessions(): void {
    const userId = this.userAuthService.getId();
    this.sessionService.getSessionsByUserId(userId).subscribe(
      (sessions: Session[]) => {
        const currentDate = new Date();
        const nonExpiredSessions = sessions.filter(session => !this.isSessionExpired(session));
        const expiredSessions = sessions.filter(session => this.isSessionExpired(session));
        this.sessions = nonExpiredSessions.sort((a, b) => {
          const startDateA = new Date(a.startDate);
          const startDateB = new Date(b.startDate);
          return startDateA.getTime() - startDateB.getTime();
        });
        this.sessions.push(...expiredSessions);
  
        if (this.selectedSession && this.selectedSession.id !== undefined) {
          this.getGroupsForSession(this.selectedSession.id);
        } else if (this.sessions.length > 0) {
          this.selectedSession = this.sessions[0];
          if (this.selectedSession.id !== undefined) {
            this.getGroupsForSession(this.selectedSession.id);
          }
        } else {
          this.sessionGroups = [];
        }
        console.log('Sessions:', this.sessions);
      },
      (error) => {
        console.log('Error retrieving sessions:', error);
      }
    );
  }
  isSessionExpired(session: Session): boolean {
    const currentDate = new Date();
    const sessionEndDate = new Date(session.finishDate); 
  
    return sessionEndDate < currentDate;
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
