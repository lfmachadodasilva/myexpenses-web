import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  async doFacebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.firebaseAuth.signInWithPopup(provider).then(() => {
      this.router.navigate(['/']);
    });
  }

  async doLogout() {
    return this.firebaseAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
