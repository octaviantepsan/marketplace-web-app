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
  isSignUpVisible: boolean;
  areSignButtonsVisible: boolean;
  isUserLogged: boolean;

  constructor() {
    this.isSignUpVisible = false;
    this.areSignButtonsVisible = true;
    this.isUserLogged = false;
  }

  isSignedIn($event: boolean) {
    this.areSignButtonsVisible = false;
    this.isUserLogged = true;
    this.isSignUpVisible = false;
  }

  signOut() {
    this.isUserLogged = false;
    this.areSignButtonsVisible = true;
  }
}