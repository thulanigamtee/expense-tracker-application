import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  template: ` <button type="submit">{{ btnText }}</button> `,
  styleUrls: ['./submit-btn.component.scss'],
})
export class SubmitBtnComponent {
  @Input() btnText = '';
}
