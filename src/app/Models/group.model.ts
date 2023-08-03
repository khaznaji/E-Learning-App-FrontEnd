import { Session } from './Session';
export class Groups {
  id!: number;
  groupName?: string;
  creationDate?: Date;
  formateur?: {
    id: number;
  };
  formation?: {
    id: number;
  };

  sessions?: Session[];
  etudiants?: {
    id: number;
  }[];
  lastMessage?: any;
  unreadCount?: number;
}
