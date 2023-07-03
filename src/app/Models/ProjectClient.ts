import { AdminProjects } from "./AdminProjects";

export class ProjectClient {
    id!: number;
    nom!: string;
    prenom!: string;
    remark!: string;
    email!: string;
    adminProjects!: AdminProjects[];
  }