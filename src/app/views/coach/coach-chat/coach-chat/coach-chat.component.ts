import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-coach-chat',
  templateUrl: './coach-chat.component.html',
  styleUrls: ['./coach-chat.component.css'],
})
export class CoachChatComponent {
  /*  groups: Groups[] = [];

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
  }*/
  groups: Groups[] = [];
  selectedGroup: Groups | null = null;
  chatMessages: any[] = [];
  userFirstName$!: Observable<string>;
  userPhoto$!: Observable<string>;
  newMessage: string = '';
  private jwtToken: string;
  unreadCounts: { [groupId: number]: number } = {};
  message: any;
  isMessageLoaded = false;
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  constructor(
    private chatService: ChatService, // Use the ChatService
    private groupsService: GroupService,
    public userAuthService: UserAuthService,
    private userService: UserService
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
          this.groups.forEach((group) => {
            this.chatService
              .getGroupLastMessage(group.id, formateurid)
              .subscribe((lastMessage) => {
                group.lastMessage = lastMessage || {};

                this.chatService
                  .getUnreadMessageCount(group.id, formateurid)
                  .subscribe((unreadCount) => {
                    group.unreadCount = unreadCount;
                    this.unreadCounts[group.id] = unreadCount;
                  });
              });
          });
        });
    } else {
      console.log('No user connected');
    }
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    if (this.chatContainer && this.chatContainer.nativeElement) {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  onSelectGroup(group: Groups) {
    console.log('Selected Group:', group);
    if (group) {
      this.selectedGroup = group;
      this.chatMessages = [];
      this.chatService.getGroupChat(group.id).subscribe((messages) => {
        this.chatMessages = messages.map((message: any) => ({
          ...message,
          senderFirstName$: this.userService
            .getUserById(message.senderId)
            .pipe(map((user: any) => user.firstName)),
          userPhoto$: this.userService
            .getUserById(message.senderId)
            .pipe(map((user: any) => user.image)),
        }));
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      });

      if (this.unreadCounts[group.id] > 0) {
        this.unreadCounts[group.id] = 0;
        group.unreadCount = 0;
        this.chatService.resetUnreadMessageCount(
          group.id,
          this.userAuthService.getId()
        );
      }
    }
  }

  sendMessage() {
    if (this.selectedGroup && this.newMessage.trim() !== '') {
      const formateurid = this.userAuthService.getId();
      this.chatService.sendMessage(
        this.selectedGroup.id,
        this.newMessage,
        formateurid
      );
      this.newMessage = '';
    }
    if (this.selectedGroup && this.unreadCounts[this.selectedGroup.id] > 0) {
      this.unreadCounts[this.selectedGroup.id] = 0;
      this.selectedGroup.unreadCount = 0;
      this.chatService.resetUnreadMessageCount(
        this.selectedGroup.id,
        this.userAuthService.getId()
      );
    }
  }
}
