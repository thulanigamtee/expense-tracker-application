import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  isSidebarActive = false;

  showSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
}
