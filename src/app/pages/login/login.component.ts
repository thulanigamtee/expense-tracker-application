import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  template: `
    <main class="login">
      <p class="login__heading">Welcome back!</p>
      <a routerLink="/">Don't have an account? Sign up</a>
      <form class="login__form" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <app-input-field
          label="email"
          inputType="email"
          [control]="loginForm.controls.email"
          placeholder="Email"
        />
        <app-input-field
          label="password"
          inputType="password"
          [control]="loginForm.controls.password"
          placeholder="password"
        />
        <a routerLink="/forgot-password" class="login__form__forgotPassword"
          >Forgot password?</a
        >
        <app-submit-btn btnText="log in"></app-submit-btn>
      </form>
      <!-- <span>or Continue with</span>
      <app-socials /> -->
    </main>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(6)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.auth.login(email!, password!);
  }
}
