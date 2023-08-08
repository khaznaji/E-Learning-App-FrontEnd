import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { Students } from 'src/app/Models/Students';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-admin-groupmembers',
  templateUrl: './admin-groupmembers.component.html',
  styleUrls: ['./admin-groupmembers.component.css'],
})
export class AdminGroupmembersComponent {
  group!: Groups;
  groups!: Groups[];
  students!: any[];
  studentsOfGroup!: any[];
  usernameFilter: string = '';
  studentDetails: any[] = [];
  userIdRemove!: number;
  taballusers: any = [];
  allGroups: any[] = [];
  tabStudent: any = [];
  tabFormation: any = [];
  Formation = '';
  status = '';
  @ViewChild('addUserDialog') addUserDialog!: TemplateRef<any>;
  addUserDialogRef!: MatDialogRef<any> | undefined;
  @ViewChild('confirmationDialog') confirmationDialog!: TemplateRef<any>;
  confirmationDialogRef: MatDialogRef<any> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { groupId: number },
    private groupService: GroupService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private dialog: MatDialog,
    private sr: UserService,
    private fr: FormationsService
  ) {}
  openAddUserDialog(groupId: number): void {
    this.group.id = groupId;
    console.log(this.group.id);
    this.addUserDialogRef = this.dialog.open(this.addUserDialog);
  }
  closeAddUserDialog(): void {
    this.addUserDialogRef?.close();
  }
  ngOnInit(): void {
    const groupId = this.data.groupId;
    this.fetchGroupMembers();
    this.getAllStudents();
    this.getAllFormation();
  }
  getAllFormation() {
    this.fr.getFormations().subscribe((res) => {
      this.tabFormation = res;
      console.log(this.tabFormation);
    });
  }
  getfilts() {
    this.sr
      .getFormationByTypeFormationAndStatus(this.Formation, this.status)
      .subscribe((res) => {
        this.tabStudent = res;
        console.log(this.tabStudent);
      });
  }
  getStudentFullname(userId: number): string {
    const student = this.studentDetails.find(
      (student) => student.id === userId
    );
    console.log(student.firstName);
    return student ? `${student.firstName} ${student.lastName}` : '';
  }
  fetchGroupMembers(): void {
    console.log(this.data.groupId);
    this.groupService.getGroupsById(this.data.groupId).subscribe(
      (group) => {
        this.group = group;
        if (group.etudiants) {
          this.studentsOfGroup = group.etudiants.map((etudiant) => etudiant.id);
          this.studentDetails = [];
          this.studentsOfGroup.forEach((studentId: number) => {
            this.userService.getUserById(studentId).subscribe(
              (student) => {
                console.log(student);
                this.studentDetails.push(student);
              },
              (error) => {
                console.error('Error retrieving student details:', error);
              }
            );
          });
        }
      },
      (error) => {
        console.error('Error retrieving group members:', error);
      }
    );
  }
  getAllGroups(): void {
    this.groupService.getAllGroups().subscribe((groups) => {
      this.allGroups = groups;
    });
  }
  getAllStudents() {
    this.userService.getAllUsers().subscribe((res) => {
      this.taballusers = res;
      console.log(this.taballusers);
      this.students = this.taballusers.filter(
        (user: { roles: any[]; enabled: number }) => {
          return (
            user.roles.some((role) => role.name === 'ETUDIANT') &&
            user.enabled === 1
          );
        }
      );

      console.log(this.students);
    });
  }

  get filteredStudents() {
    if (this.usernameFilter.trim() === '') {
      return this.students.filter(
        (student) =>
          !this.group.etudiants?.some((etudiant) => etudiant.id === student.id)
      );
    } else {
      const filterNames = this.usernameFilter.trim().toLowerCase().split(' ');

      return this.students.filter((student) => {
        const fullName = `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`;
        return (
          filterNames.every((name) => fullName.includes(name)) &&
          !this.group.etudiants?.some((etudiant) => etudiant.id === student.id)
        );
      });
    }
  }
  addUserToGroup(groupId: number, userId: number) {
    const group = this.group;
    if (!group) {
      console.error('Group not found');
      return;
    }

    if (group.etudiants?.some((etudiant) => etudiant.id === userId)) {
      this.snackBar.open('User already exists in the group', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    this.groupService.addEtudiantToGroup(groupId, userId).subscribe(
      (response) => {
        if (typeof response === 'string') {
          console.log(response);
          this.snackBar.open(response, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          group.etudiants?.push({ id: userId });
          this.fetchGroupMembers();
          this.groupService.getAllGroups().subscribe((groups) => {
            this.groupService.updateGroupData(groups);
          });
        } else {
        }
      },
      (error) => {
        console.error('Error adding user to group:', error);
      }
    );
  }
  removeUserFromGroup(groupId: number, userId: number) {
    this.userIdRemove = userId;
    this.groupService.removeEtudiantFromGroup(groupId, userId).subscribe(
      (response: any) => {
        console.log('User removed from group successfully');
        this.fetchGroupMembers();
        this.groupService.getAllGroups().subscribe((groups) => {
          this.groupService.updateGroupData(groups);
        });
      },
      (error) => {
        console.error('Error removing user from group:', error.error);
      }
    );
  }
  openConfirmationDialog(groupId: number, userId: number): void {
    this.userIdRemove = userId;
    this.confirmationDialogRef = this.dialog.open(this.confirmationDialog);

    this.confirmationDialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.removeUserFromGroup(groupId, userId);
      }
    });
  }
  cancelDelete(): void {
    this.confirmationDialogRef?.close();
  }

  confirmDelete(): void {
    this.confirmationDialogRef?.close('confirm');
  }
}
