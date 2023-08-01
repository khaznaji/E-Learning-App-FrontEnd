import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { UserService } from '../UserService/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private db: AngularFireDatabase) {}
  sendMessage(groupId: number, message: string, senderId: number): void {
    const chatData = {
      message,
      senderId,
      timestamp: new Date().toISOString(),
    };

    this.db.list(`chats/${groupId}`).push(chatData);
  }

  getGroupChat(groupId: number): Observable<any[]> {
    return this.db.list<any>(`chats/${groupId}`).valueChanges();
  }
  getGroupLastMessage(groupId: number, userId: number): Observable<any> {
    return this.db
      .list<any>(`chats/${groupId}`, (ref) =>
        ref.orderByChild('timestamp').limitToLast(1)
      )
      .valueChanges()
      .pipe(map((messages) => messages[0]));
  }

  getUnreadMessageCount(groupId: number, userId: number): Observable<number> {
    return this.db
      .list<any>(`chats/${groupId}`, (ref) =>
        ref.orderByChild('isReadBy/' + userId).equalTo(false)
      )
      .valueChanges()
      .pipe(
        map((messages) => {
          let unreadCount = 0;
          for (const message of messages) {
            if (
              message.isReadBy &&
              message.isReadBy[userId] === false &&
              message.senderId !== userId
            ) {
              unreadCount++;
            }
          }
          return unreadCount;
        })
      );
  }
}
