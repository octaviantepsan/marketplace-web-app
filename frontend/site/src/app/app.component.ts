import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { CommonModule } from '@angular/common';
import { AppService } from './services/app.service';

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

  // to delete later
  requestResults: any;

  constructor(private appService: AppService) {
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

  testGetRequest() {
    let context = this;
    this.appService.getUsers().subscribe({
      next(data: any) {
        console.log(data);
        context.requestResults = data;
      },
      error(err) {
        // status number-ul trebuie sa coincida cu cel pe care il returnezi in BE pe error ca sa tratezi eroarea
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    })
  }

  testPostRequest() {
    let context = this;
    let body = {
      lastName: "Test",
      firstName: "Test",
      city: "Test",
      adress: "Test"
    }
    this.appService.postUser(body).subscribe({
      next(data) {
        console.log(data.message);
        context.requestResults = data.message;
      },
      error(err) {
        // 400 adica 'Bad Request' punem de obicei cand datele de transmis sunt transmise incorect. Adica body-ul a avut structura proasta. De obicei validam asta in BE.
        if (err && err['status'] === 400) {
          console.log(err);
        }
      }
    })
  }
  
}