import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit, AfterViewInit {
  domain: string = "jitsi1.geeksec.de"; // For self-hosted use your domain
  room: any;
  options: any;
  api: any;
  users: any = [];
  user: any;
  username!: string;
  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
    private router: Router,
    private sr: UserService
  ) { }

  handleClose = () => {
    console.log("handleClose");
  }

  getUserById(id: any) {
    this.sr.getUserById(id).subscribe((res) => {
      this.users = res;
      this.username = this.users.firstName + ' ' + this.users.lastName;
      console.log(this.username);

      // Initialize JitsiMeetExternalAPI with the updated username
      this.initializeJitsi();
    });
  }

  handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['/thank-you']);
  }

  handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); // { muted: true }
  }

  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if (command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }

  ngOnInit(): void {
    this.room = 'bwb-bfqi-vmh'; // Set your room name
    this.user = {
      name: this.username // Set your username
    }

    this.getUserById(localStorage.getItem('id'));
  }

  ngAfterViewInit(): void {
    // Initialization moved to getUserById() method
  }

  initializeJitsi() {
    this.options = {
      roomName: this.room,
      width: 1000,
      height: 600,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {
        // overwrite interface properties
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.username
      }
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus
    });
  }
}
