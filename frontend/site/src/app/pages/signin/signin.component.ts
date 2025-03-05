import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  @Output() authResponse = new EventEmitter<Object>();

  showRegisterSuccesNotif: boolean;
  showRegisterWarningNotif: boolean;
  showLoginWarningNotif: boolean;

  constructor(private appService: AppService) {
    this.showRegisterSuccesNotif = false;
    this.showRegisterWarningNotif = false;
    this.showLoginWarningNotif = false;
  }

  authenticate($event: any, loginForm: NgForm) {
    console.log(loginForm.form.value);

    if (loginForm.valid === false) {
      this.showLoginWarningNotif = true;

      setTimeout(() => {
        this.showLoginWarningNotif = false;
      }, 3000);
      return
    }

    $event.preventDefault();
    this.authResponse.emit(true);
  }

  registerUser($event: any, registerForm: NgForm) {
    let body = registerForm.form.value;  //body devine un Object avand ca atribute input-urile care apartin de registerForm -> fname | lname | adress | city

    $event.preventDefault();

    if (registerForm.valid === false) {
      this.showRegisterNotification(false);
    }
    else {
      let outerContext = this;

      this.appService.registerUser(body).subscribe({
        next(data) {
          console.log(data.message);

          let authResponseData = {
            isSucces: true,
            userId: data.userId
          };

          alert("ok");
          outerContext.authResponse.emit(authResponseData);
        },
        error(err) {
          if (err) {
            outerContext.showRegisterNotification(false);
          }
        }
      })
    }
  }

  loginUser($event: any, loginForm: NgForm) {
    let body = loginForm.form.value;  //body devine un Object avand ca atribute input-urile care apartin de registerForm -> fname | lname | adress | city

    $event.preventDefault();

    if (loginForm.valid === false) {
      this.showRegisterNotification(false);
    }
    else {
      let outerContext = this;

      this.appService.loginUser(body).subscribe({
        next(data) {
          console.log(data.message);
          
          let authResponseData = {
            isSucces: true,
            userId: data.userId
          };
          
          alert("ok");
          outerContext.authResponse.emit(authResponseData);
        },
        error(err) {
          if (err) {
            outerContext.showRegisterNotification(false);
          }
        }
      })
    }
  }

  showRegisterNotification(type: boolean) {
    if (type === false) {
      this.showRegisterWarningNotif = true;

      setTimeout(() => {
        this.showRegisterWarningNotif = false;
      }, 3000);
      return
    }
    else {
      this.showRegisterSuccesNotif = true;
      setTimeout(() => {
        this.showRegisterSuccesNotif = false;
      }, 4000);
    }
  }
}
