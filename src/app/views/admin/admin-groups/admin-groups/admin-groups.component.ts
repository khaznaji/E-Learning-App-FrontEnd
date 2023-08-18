import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormationsService } from 'src/app/MesServices/Formations/formations.service';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Groups } from 'src/app/Models/group.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminGroupmembersComponent } from '../../admin-groupmembers/admin-groupmembers/admin-groupmembers.component';
import { MatDialog } from '@angular/material/dialog';
import { CertificatService } from 'src/app/MesServices/Certificat/certificat.service';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css'],
})
export class AdminGroupsComponent implements OnInit {
  formations: any[] = [];
  tabCoach: any = [];
  taballusers: any = [];
  groups: Groups = new Groups();
  myForm: FormGroup;
  groupCreationSuccess = false;
  groupCreationError = false;
  allGroups: any[] = [];

  constructor(
    private formationsService: FormationsService,
    private sr: UserService,
    private groupService: GroupService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject the CertificateService

  ) {
    this.myForm = this.fb.group({
      formationId: ['', Validators.required],
      groupName: ['', Validators.required],
      formateurId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllGroups();
    this.getFormations();
    this.getallCoach();
  }
  openGroupMembersDialog(groupId: number) {
    const dialogRef = this.dialog.open(AdminGroupmembersComponent, {
      data: { groupId: groupId },
    });
  }

  getFormations(): void {
    this.formationsService.getFormations().subscribe((res: any) => {
      this.formations = res;
      console.log(this.formations);
    });
  }

  getallCoach() {
    this.sr.getAllUsers().subscribe((res) => {
      this.taballusers = res;
      this.tabCoach = this.taballusers.filter((user: { roles: any[] }) => {
        return user.roles.some((role) => role.name === 'FORMATEUR');
      });
      console.log(this.tabCoach);
    });
  }

  createGroup(): void {
    if (this.myForm.valid) {
      this.groups.creationDate = new Date();
      this.groups.groupName = this.myForm.get('groupName')?.value;
      this.groups.formation = {
        id: this.myForm.get('formationId')?.value,
      };
      this.groups.formateur = {
        id: this.myForm.get('formateurId')?.value,
      };

      this.groupService.addGroups(this.groups).subscribe(
        (response) => {
          console.log('Group created successfully:', response);
          this.myForm.reset();
          this.getAllGroups();
          this.snackBar.open('Groupe created successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
        (error) => {
          console.log('Error creating group:', error);
          this.snackBar.open('Error creating Groupe ', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }
  getAllGroups(): void {
    this.groupService.getAllGroups().subscribe((groups) => {
      this.allGroups = groups;
      console.log('groups', this.allGroups);
    });
  }

}