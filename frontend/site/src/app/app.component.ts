import { Component } from '@angular/core';
import { SigninComponent } from './pages/signin/signin.component';
import { CommonModule } from '@angular/common';
import { AppService } from './services/app.service';
import { CarouselComponent } from "./pages/carousel/carousel.component";
import { ProductsPageComponent } from "./pages/productsPage/productsPage.component";
import { UserpanelComponent } from './pages/userpanel/userpanel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SigninComponent, CarouselComponent, ProductsPageComponent, UserpanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'site';
  showSignInBtn: boolean;
  showSignOutBtn: boolean;
  showSignInPage: boolean;
  showUserPanelPage: boolean;
  isUserAuth: boolean;
  showReturnBtn: boolean;
  showHomepageElements: boolean;
  connectedUserId: any = null;
  showUserPanelBtn: boolean;

  constructor(private appService: AppService) {
    this.showSignInBtn = true;
    this.showSignOutBtn = false;
    this.showSignInPage = false;
    this.isUserAuth = false;
    this.showReturnBtn = false;
    this.showHomepageElements = true;
    this.showUserPanelPage = false;
    this.showUserPanelBtn = false;
  }

  onSignIn() {
    this.showSignInBtn = false;
    this.showSignInPage = true;
    this.showReturnBtn = true;
    this.showHomepageElements = false;
  }

  onSignOut() {
    this.isUserAuth = false;
    this.showSignOutBtn = false;
    this.showSignInBtn = true;
    this.showHomepageElements = true;
    this.connectedUserId.isSucces = false;
    this.showReturnBtn = false;
    this.showUserPanelPage = false;
    this.showUserPanelBtn = false;
  }

  onReturn() {
    this.showSignInPage = false;
    this.showUserPanelPage = false;
    if (this.isUserAuth === false) {
      this.showSignInBtn = true;
    }

    if(this.isUserAuth === true) {
      this.showUserPanelBtn = true;
    }

    this.showReturnBtn = false;
    this.showHomepageElements = true;
  }

  onUserPanel() {
    this.showUserPanelPage = true;
    this.showSignInPage = false;
    this.showReturnBtn = true;
    this.showHomepageElements = false;
    this.showSignInBtn = false;
    this.showSignOutBtn = true;
    this.showUserPanelBtn = false;
  }

  captureAuthResponse($event: Object) {
    this.showSignInBtn = false;
    this.showSignOutBtn = true;
    this.isUserAuth = true;
    this.showReturnBtn = false;
    this.showSignInPage = false;
    this.showHomepageElements = true;
    this.showUserPanelBtn = true;
    this.connectedUserId = $event;
  }

  testGetRequest() {
    this.appService.getUsers().subscribe({
      next(data: any) {
        console.log(data);
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
    let body = {
      lastName: "Test",
      firstName: "Test",
      city: "Test",
      adress: "Test"
    }
    this.appService.postUser(body).subscribe({
      next(data) {
        console.log(data.message);
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