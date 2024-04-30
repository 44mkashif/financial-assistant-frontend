import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ISignUpApiResponse, ISignUpPayload } from '../shared/interfaces/auth.interface';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ERROR_MESSAGES } from '../shared/constants/messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

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

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator]]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.authService.signup({ name, email, password }).subscribe({
        next: (response: ISignUpApiResponse) => {
          localStorage.setItem('accessToken', response.data.access_token);
          this.toastr.success('Account created successfully', 'Success');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.toastr.error(error.error.error, 'Error during registration');
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
      this.toastr.error('Please correct the errors in the form', 'Error');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (control) {
      for (const errorKey in control.errors) {
        if (control.errors.hasOwnProperty(errorKey)) {
          return ERROR_MESSAGES[errorKey];
        }
      }
    }
    return '';
  }
  

  passwordStrengthValidator(control: FormControl): ValidationErrors | null {
    const errors: ValidationErrors = {};
    const value = control.value || '';
  
    if (!/[A-Z]/.test(value)) {
      errors['uppercaseRequired'] = true;
    }
    if (!/[a-z]/.test(value)) {
      errors['lowercaseRequired'] = true;
    }
    if (!/[!@#$%^&*]/.test(value)) {
      errors['specialCharRequired'] = true;
    }
    if (value.length < 6) {
      errors['minLengthRequired'] = true;
    }
  
    return Object.keys(errors).length ? errors : null;
  }
  
  confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
  

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
