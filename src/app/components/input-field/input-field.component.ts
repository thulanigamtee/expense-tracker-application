import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div class="form__field">
      <input
        [type]="inputType"
        [formControl]="control"
        required="true"
        [placeholder]="placeholder"
        [class.invalid]="control.invalid && control.dirty && control.touched"
      />
      <ng-container
        *ngIf="placeholder === 'password' || placeholder === 'confirm password'"
      >
        <button (click)="togglePasswordType(true)" type="button">
          <i class="fa-regular fa-eye"></i>
          <span
            class="strikeThrough"
            [class.isActive]="isPasswordVisible"
          ></span>
        </button>
      </ng-container>
      <ng-container *ngIf="control.invalid && control.dirty && control.touched">
        <p
          class="form__field__error"
          *ngFor="let err of control.errors | keyvalue"
        >
          {{ errorMessages[err.key] }}
        </p>
      </ng-container>
    </div>
  `,
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() placeholder = '';
  @Input() value = '';
  @Input() inputType = '';
  @Input() control = new FormControl();

  errorMessages: Record<string, string> = {
    required: 'Field is required',
    email: 'Email is required',
  };

  passwordType = 'password';
  isPasswordVisible = false;

  confirmType = 'password';
  isConfirmVisible = false;

  togglePasswordType(isPassword: boolean) {
    if (isPassword) {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.passwordType = this.isPasswordVisible
        ? (this.inputType = 'text')
        : (this.inputType = 'password');
    } else {
      this.isConfirmVisible = !this.isConfirmVisible;
      this.confirmType = this.isConfirmVisible
        ? (this.inputType = 'text')
        : (this.inputType = 'password');
    }
  }
}
