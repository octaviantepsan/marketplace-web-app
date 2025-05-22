import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';
import { ToastService } from '../../services/toast.service';

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

  constructor(private appService: AppService, private toastService: ToastService) {
    this.showRegisterSuccesNotif = false;
    this.showRegisterWarningNotif = false;
    this.showLoginWarningNotif = false;
  }

  registerUser($event: any, registerForm: NgForm) {
    let body = registerForm.form.value;  //body devine un Object avand ca atribute input-urile care apartin de registerForm -> fname | lname | adress | city

    $event.preventDefault();

    if (registerForm.valid === false) {
      this.toastService.show('Data is incorrect', 'error');
    }
    else {
      let outerContext = this;

      this.appService.registerUser(body).subscribe({
        next(data) {
          let authResponseData = {
            isSucces: true,
            userId: data.userId,
            isVendor: data.isVendor
          };

          outerContext.toastService.show('Signed up succesfully', 'success');
          outerContext.authResponse.emit(authResponseData);
        },
        error(err) {
          if (err?.status === 500) {
            outerContext.toastService.show('Email already in use', 'warning');
          } else if (err?.status === 400) {
            outerContext.toastService.show('Data is incorrect', 'error');
          }
        }
      })
    }
    registerForm.resetForm();
  }

  loginUser($event: any, loginForm: NgForm) {
    let body = loginForm.form.value;  //body devine un Object avand ca atribute input-urile care apartin de registerForm -> fname | lname | adress | city

    $event.preventDefault();

    if (loginForm.valid === false) {
      this.toastService.show('Data is incorrect', 'error');
    }
    else {
      let outerContext = this;

      this.appService.loginUser(body).subscribe({
        next(data) {
          let authResponseData = {
            isSucces: true,
            userId: data.userId,
            isVendor: data.isVendor
          };

          outerContext.toastService.show('Signed in succesfully', 'success');
          outerContext.authResponse.emit(authResponseData);
        },
        error(err) {
          if (err) {
            outerContext.toastService.show('User does not exist', 'warning');
          }
        }
      })
    }
  }
}
