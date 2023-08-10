import { Component } from '@angular/core';
import { SessionService } from 'src/app/MesServices/Session/session.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Session } from 'src/app/Models/Session';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-calendar',
  templateUrl: './student-calendar.component.html',
  styleUrls: ['./student-calendar.component.css'],
})
export class StudentCalendarComponent {
  sessions!: any[];
  selectedSession!: Session;
  isButtonDisabled!: boolean;
  currentDate!: Date;
  durationInMinutes!: any
  databaseDate!: Date;
  msj!: any
  constructor(
    private sessionService: SessionService,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {

    this.retrieveSessions();
  }

  retrieveSessions(): void {
    this.currentDate = new Date();

    const userId = this.userAuthService.getId();
    this.sessionService.getSessionsByUserId(userId).subscribe(
      (sessions: Session[]) => {
        this.sessions = sessions;

        // Find the first session that hasn't started yet
        const notStartedSession = sessions.find(session => new Date(session.startDate).getTime() > this.currentDate.getTime());

        // If a notStartedSession is found, use it as the selectedSession
        if (notStartedSession) {
          this.selectSession(notStartedSession);
        } else {
          // If no session is found with a start time in the future, use the first session in the array as selectedSession
          this.selectedSession = sessions[0];
          this.updateButtonStatus();
        }

        console.log('Sessions:', sessions);
      },
      (error) => {
        console.log('Error retrieving sessions:', error);
      }
    );
  }

  private updateButtonStatus(): void {
    const currentTime = new Date().getTime();
    const databaseTime = this.databaseDate.getTime();
    const durationInMillis = this.durationInMinutes * 60 * 1000;
    this.msj = "You can't join this session now"
    console.log(this.msj)
    this.isButtonDisabled = currentTime <= databaseTime || currentTime >= databaseTime + durationInMillis;

console.log(this.isButtonDisabled)
  }



  selectSession(session: Session) {
    this.databaseDate = new Date(session.startDate);
    this.durationInMinutes = this.calculateDuration(session);
    this.selectedSession = session;
    this.updateButtonStatus();

  }
  calculateDuration(session: Session): number {
    const start = new Date(session.startDate);
    const finish = new Date(session.finishDate);
    const duration = (finish.getTime() - start.getTime()) / (1000 * 60);
    return duration;
  }
}
