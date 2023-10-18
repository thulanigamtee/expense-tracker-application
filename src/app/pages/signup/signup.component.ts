import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  template: `
    <main class="signup">
      <p class="signup__heading">Create new account</p>
      <a routerLink="login">Already have an account? Login in</a>
      <form
        class="signup__form"
        [formGroup]="signupForm"
        (ngSubmit)="onSubmit()"
      >
        <app-input-field
          inputType="email"
          [control]="signupForm.controls.email"
          placeholder="Email"
        />
        <app-input-field
          inputType="password"
          [control]="signupForm.controls.password"
          placeholder="password"
        />
        <!-- <app-input-field
          inputType="password"
          [control]="signupForm.controls.confirmPassword"
          placeholder="confirm password"
        /> -->
        <app-submit-btn btnText="sign up"></app-submit-btn>
      </form>
      <!-- <span>or Continue with</span>
      <app-socials /> -->
    </main>
  `,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(6)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    // confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {}

  onSubmit() {
    const { email, password } = this.signupForm.value;
    console.log(`${email} ${password}`);
    this.auth.signup(email!, password!);
  }
}
