import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { getFirstDisplayName } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: firebase.User;
  userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((obs) => {
      this.user = obs;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  //#region events
  async onClickFacebook() {
    await this.authService.doFacebookLogin();
  }

  async onLogout() {
    await this.authService.doLogout();
  }
  //#endregion

  getUserDisplayName() {
    return getFirstDisplayName({
      id: this.user.uid,
      displayName: this.user.displayName,
      email: this.user.email,
      photoUrl: null,
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToGroup() {
    this.router.navigate(['/group']);
  }

  navigateToLabel() {
    this.router.navigate(['/label']);
  }

  navigateToExpense() {
    this.router.navigate(['/expense']);
  }
}
