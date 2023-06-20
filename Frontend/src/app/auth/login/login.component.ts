import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData: any;
  showPassword: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  ngOnInit(): void {}
  // Login Form
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // Login functionality
  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .getById(this.loginForm.value.username as string)
        .subscribe((res) => {
          this.userData = res;
          if (
            this.userData.password === this.loginForm.value.password &&
            this.userData.id === this.loginForm.value.username
          ) {
            // Success Message
            this.toastr.success('Login Successfully.', 'Success', {
              timeOut: 1000,
            });
            if (this.userData.isActive) {
              sessionStorage.setItem('username', this.userData.id);
              sessionStorage.setItem('userrole', this.userData.role);
              this.router.navigate(['/notice']);
            } else {
              // Error Message
              this.toastr.error('Please contact admin', 'In Active User', {
                timeOut: 1000,
              });
            }
          } else {
            // Error Message
            this.toastr.error('Invalid Credentials', 'Error', {
              timeOut: 1500,
            });
          }
        });
    } else {
      // Warning for validation.
      this.toastr.warning('Please enter valid data.');
    }
  }

  // Show password functionality
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
