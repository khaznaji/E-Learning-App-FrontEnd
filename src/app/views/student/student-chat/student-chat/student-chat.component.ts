import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription, catchError, map, tap } from 'rxjs';
import { ChatService } from 'src/app/MesServices/Chat/chat.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { UserAuthService } from 'src/app/MesServices/user-auth.service';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: ['./student-chat.component.css'],
})
export class StudentChatComponent {
  groups: Groups[] = [];
  selectedGroup: Groups | null = null;
  chatMessages: any[] = [];
  userFirstName$!: Observable<string>;
  newMessage: string = '';
  private jwtToken: string;
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
      const userId = this.userAuthService.getId();
      this.groupsService.getGroupsByUserId(userId).subscribe((groups) => {
        this.groups = groups;
        console.log('Fetched groups:', this.groups);
        this.groups.forEach((group) => {
          this.chatService
            .getGroupLastMessage(group.id, userId)
            .subscribe((lastMessage) => {
              group.lastMessage = lastMessage || {};

              this.chatService
                .getUnreadMessageCount(group.id, userId)
                .subscribe((unreadCount) => {
                  group.unreadCount = unreadCount;
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
        }));
        setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      });
    }
  }

  sendMessage() {
    if (this.selectedGroup && this.newMessage.trim() !== '') {
      const senderId = this.userAuthService.getId();
      this.chatService.sendMessage(
        this.selectedGroup.id,
        this.newMessage,
        senderId
      );
      this.newMessage = '';
    }
  }
}
