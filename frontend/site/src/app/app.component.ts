import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SigninComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'site';
  showSignInBtn: boolean;
  showSignOutBtn: boolean;
  showSignInPage: boolean;
  isUserAuth: boolean;
  showReturnBtn: boolean;

  constructor() {
    this.showSignInBtn = true;
    this.showSignOutBtn = false;
    this.showSignInPage = false;
    this.isUserAuth = false;
    this.showReturnBtn = false;
  }

  onSignIn() {
    this.showSignInBtn = false;
    this.showSignInPage = true;
    this.showReturnBtn = true;
  }

  onSignOut() {
    this.isUserAuth = false;
    this.showSignOutBtn = false;
    this.showSignInBtn = true;
  }

  onReturn() {
    this.showSignInPage = false;
    this.showSignInBtn = true;
    this.showReturnBtn = false;
  }

  captureAuthResponse($event: boolean) {
    this.showSignInBtn = false;
    this.showSignOutBtn = true;
    this.isUserAuth = true;
    this.showReturnBtn = false;
    this.showSignInPage = false;
  }
  
}