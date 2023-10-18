import { Component } from '@angular/core';

@Component({
  selector: 'app-socials',
  template: `
    <div class="icons">
      <button class="icons__icon">
        <i class="fa-brands fa-google"></i>
      </button>
      <button class="icons__icon">
        <i class="fa-brands fa-apple"></i>
      </button>
    </div>
  `,
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent {}
