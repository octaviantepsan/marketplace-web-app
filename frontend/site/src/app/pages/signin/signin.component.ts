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
  @Output() authResponse = new EventEmitter<boolean>();

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

    if (registerForm.valid === false) {
      this.showRegisterNotification($event, false);
    }
    else {
      this.appService.registerUser(body).subscribe({
        next(data) {
          console.log(data.message);
        },
        error(err) {
          if (err && err['status'] === 400) {
            console.log(err);
          }
        }
      })

      this.showRegisterNotification($event, true);
    }
  }

  showRegisterNotification($event: any, type: boolean) {
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

        $event.preventDefault();
        this.authResponse.emit(true);
      }, 4000);
    }
  }
}
