import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ])
  ]
})
export class AuthComponent implements OnInit {
  isLoginView = true;
  loading = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // Initialize login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Initialize register form
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  toggleView(): void {
    this.isLoginView = !this.isLoginView;
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.signInWithCredentials(email, password)
      .subscribe({
        next: () => {
          // Handle successful login
          this.loading = false;
        },
        error: (error) => {
          // Handle login error
          console.error('Login error:', error);
          this.loading = false;
        }
      });
  }

  onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const userData = this.registerForm.value;

    this.authService.register(userData)
      .subscribe({
        next: () => {
          // Handle successful registration
          this.loading = false;
          this.isLoginView = true; // Switch to login view after registration
        },
        error: (error) => {
          // Handle registration error
          console.error('Registration error:', error);
          this.loading = false;
        }
      });
  }

  signInWithGoogle(): void {
    this.loading = true;

    this.authService.signInWithGoogle()
      .subscribe({
        next: () => {
          // Handle successful Google sign-in
          this.loading = false;
        },
        error: (error) => {
          // Handle Google sign-in error
          console.error('Google sign-in error:', error);
          this.loading = false;
        }
      });
  }

  // Form getters for easier access in the template
  get loginEmail() { return this.loginForm.get('email'); }
  get loginPassword() { return this.loginForm.get('password'); }

  get registerFullName() { return this.registerForm.get('fullName'); }
  get registerEmail() { return this.registerForm.get('email'); }
  get registerPassword() { return this.registerForm.get('password'); }
  get registerConfirmPassword() { return this.registerForm.get('confirmPassword'); }

}
