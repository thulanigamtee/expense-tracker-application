import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  { path: '', component: SignupComponent, data: { animation: 'home' } },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'login' },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { animation: 'forgot-password' },
  },
  {
    path: 'overview',
    component: OverviewComponent,
    data: { animation: 'overview' },
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    data: { animation: 'transactions' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
