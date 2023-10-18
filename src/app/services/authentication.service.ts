import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: any;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.fireAuth.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  signup(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(
      (user) => {
        alert('Registration Successful');
        console.log(user);
        this.router.navigate(['login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['']);
      }
    );
  }

  login(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/transactions']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  signout() {
    this.fireAuth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  forgotPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['']);
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}
