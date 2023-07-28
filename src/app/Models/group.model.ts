import { Session } from './Session';
import { User } from './user.model';
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
    username :string;
    id: number;
  }[];

}
