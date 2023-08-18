import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, combineLatest, map } from 'rxjs';
import { UserService } from '../UserService/user-service.service';
import { Chat } from 'src/app/Models/chat';

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
      isReadBy: { [senderId]: true },
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
    return combineLatest([
      this.db.list<Chat>(`chats/${groupId}`).snapshotChanges(),
      this.db.object<any>(`groups/${groupId}`).valueChanges(),
    ]).pipe(
      map(([messageSnapshots, group]) => {
        let unreadCount = 0;
        for (const messageSnapshot of messageSnapshots) {
          const message = messageSnapshot.payload.val() as Chat;
          if (message.senderId !== userId && !message.isReadBy?.[userId]) {
            unreadCount++;
          }
        }

        if (group && group.selectedGroupId === groupId) {
          const updates: { [key: string]: boolean } = {};
          for (const messageSnapshot of messageSnapshots) {
            const message = messageSnapshot.payload.val() as Chat;
            if (message.senderId !== userId && !message.isReadBy?.[userId]) {
              message.isReadBy = message.isReadBy || {};
              message.isReadBy[userId] = true;
              updates[
                `chats/${groupId}/${messageSnapshot.key}/isReadBy/${userId}`
              ] = true;
            }
          }
          this.db.object(`/groups/${groupId}`).update(updates);
        }

        return unreadCount;
      })
    );
  }
  resetUnreadMessageCount(groupId: number, userId: number): void {
    const updates: { [key: string]: any } = {};
    updates[`groups/${groupId}/unreadCount`] = 0;
    this.db.object(`/`).update(updates);
  }
  markMessageAsRead(groupId: number, messageId: string, userId: number): void {
    const updates: { [key: string]: any } = {};
    updates[`chats/${groupId}/${messageId}/isReadBy/${userId}`] = true;
    this.db.object('/').update(updates);
  }
}
