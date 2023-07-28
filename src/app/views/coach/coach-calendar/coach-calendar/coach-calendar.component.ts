import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Session } from 'src/app/Models/Session';

@Component({
  selector: 'app-coach-calendar',
  templateUrl: './coach-calendar.component.html',
  styleUrls: ['./coach-calendar.component.css'],
})
export class CoachCalendarComponent {
  sessions: Session[] = [];
  selectedSession!: Session;

  constructor(
    private sessionService: SessionService,
    private userAuthService: UserAuthService,     private router: Router // Inject the Router service

  ) {}

  ngOnInit(): void {
    this.retrieveSessions();
  }
  selectSessiond(session: Session) {
    this.selectedSession = session;

    // Navigate to the session details page with the selected session's ID
    this.router.navigate(['/session', session.id]);
  }
  retrieveSessions(): void {
    const formateurId = this.userAuthService.getId(); // Assuming getId() returns the formateurId
    this.sessionService.getSessionsByFormateurId(formateurId).subscribe(
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

  selectSession(session: Session) {
    this.selectedSession = session;
  }
  calculateDuration(session: Session): number {
    const start = new Date(session.startDate);
    const finish = new Date(session.finishDate);
    const duration = (finish.getTime() - start.getTime()) / (1000 * 60);
    return duration;
  }
}
