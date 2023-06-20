import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

// User interface
export interface User {
  email: string;
  id: string;
  isActive: boolean;
  name: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit {
  roleList: any;
  editData!: User;

  // Update user form
  updatedForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl('', Validators.required),
    isActive: new FormControl(false),
  });

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateStatusComponent>
  ) {}

  ngOnInit(): void {
    // Checking the user's Role.
    this.authService.getAllRole().subscribe((res) => {
      this.roleList = res;
    });
    // Updating the user.
    if (this.data.userData != null && this.data.userData != '') {
      this.authService.getById(this.data.userData).subscribe((res) => {
        this.editData = res as User;
        this.updatedForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          password: this.editData.password,
          email: this.editData.email,
          role: this.editData.role,
          isActive: this.editData.isActive,
        });
      });
    }
  }

  // Update user functionality dialog box
  updateUser() {
    if (this.updatedForm.valid) {
      this.authService
        .updateUser(this.updatedForm.value.id as string, this.updatedForm.value)
        .subscribe((res) => {
          this.toastr.success('Updated Successfully.', 'Success', {
            timeOut: 1000,
          });
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please Select Role');
    }
  }
}
