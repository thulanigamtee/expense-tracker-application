import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <nav class="sidebar">
      <div class="sidebar__contents" [class.isActive]="isActive">
        <section
          class="sidebar__contents__content sidebar__contents__content__middle"
        >
          <button
            class="sidebar__contents__content__toggle"
            (click)="hideSidebar()"
          >
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <ul>
            <li>
              <a routerLink="/overview" routerLinkActive="active">
                <span class="material-symbols-rounded"> grid_view </span>
                <p>overview</p>
              </a>
            </li>
            <li>
              <a routerLink="/transactions" routerLinkActive="active">
                <span class="material-symbols-outlined"> sync_alt </span>
                <p>transactions</p>
              </a>
            </li>
          </ul>
        </section>
        <section
          class="sidebar__contents__content sidebar__contents__content__bottom"
        >
          <ul>
            <li *ngIf="user">
              <a>
                <span class="material-symbols-outlined"> account_circle </span>
                <p>{{ user.email }}</p>
              </a>
            </li>
            <li>
              <a (click)="signout()">
                <span class="material-symbols-rounded"> logout </span>
                <p>sign out</p>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </nav>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isActive!: boolean;

  hideSidebar() {
    this.isActive = !this.isActive;
  }

  constructor(
    private auth: AuthenticationService,
    private fireAuth: AngularFireAuth
  ) {}

  signout() {
    this.auth.signout();
  }

  user: any;

  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user;
    });
  }
}
