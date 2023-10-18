import { Component } from '@angular/core';
import { fadeIn } from './animations/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeIn],
})
export class AppComponent {
  title = 'expense-tracker-app';
}
