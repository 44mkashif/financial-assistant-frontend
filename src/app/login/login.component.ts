import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ERROR_MESSAGES } from '../shared/constants/messages';
import { ILoginApiResponse } from '../shared/interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response: ILoginApiResponse) => {
          localStorage.setItem('accessToken', response.data.access_token);
          this.toastr.success('Logged in successfully', 'Success');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error(err.error.error, 'Error');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.toastr.error('Please correct the errors in the form', 'Error');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control) {
      for (const errorKey in control.errors) {
        if (control.errors.hasOwnProperty(errorKey)) {
          return ERROR_MESSAGES[errorKey];
        }
      }
    }
    return '';
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
