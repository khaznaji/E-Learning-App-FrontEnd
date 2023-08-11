import { Formation } from './formation.model';
import { Groups } from './group.model';

export class Session {
  id?: number;
  sessionName?: string;
  description?: string;
  startDate!: Date;
  finishDate!: Date;
  groupSession?: string;
  groups: Groups[] = [];
  formation!: Formation;
  GeneratedLink?: string;
}
