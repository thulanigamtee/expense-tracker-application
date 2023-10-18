import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <main class="forgotPassword">
      <p class="forgotPassword__heading">Send reset link</p>
      <form
        class="forgotPassword__form"
        [formGroup]="forgotPasswordForm"
        (ngSubmit)="onSubmit()"
      >
        <app-input-field
          label="email"
          inputType="email"
          [control]="forgotPasswordForm.controls.email"
          placeholder="Email"
        />
        <app-submit-btn btnText="submit"></app-submit-btn>
      </form>
    </main>
  `,
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm = this.formBuilder.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.minLength(8)],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {}

  onSubmit() {
    this.auth.forgotPassword(this.forgotPasswordForm.value.email!);
    this.forgotPasswordForm.value.email = '';
  }
}
