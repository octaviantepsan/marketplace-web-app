import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  @Output() authResponse = new EventEmitter<boolean>();

  showRegisterSuccesNotif = false;
  showRegisterWarningNotif = false;
  showLoginWarningNotif = false;

  authenticate($event: any, loginForm: NgForm) {
    console.log(loginForm.form.value);
    // din cauza ca este singurul buton din cadrul unui <form> tag, va fi considerat ca [type="submit"] si va face submit la form
    // ceea ce va cauza un unexpected page refresh (innate browser behaviour), asa ca facem event.preventDefault() ca sa prevenim comportamentul default

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

  register($event: any, registerForm: NgForm) {
    //console.log(registerForm.form.value);
    //console.log(registerForm.valid);

    if (registerForm.valid === false) {
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
