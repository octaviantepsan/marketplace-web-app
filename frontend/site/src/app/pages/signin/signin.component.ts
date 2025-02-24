import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  @Output() authResponse = new EventEmitter<boolean>();

  authenticate($event: any) {
    // din cauza ca este singurul buton din cadrul unui <form> tag, va fi considerat ca [type="submit"] si va face submit la form
    // ceea ce va cauza un unexpected page refresh (innate browser behaviour), asa ca facem event.preventDefault() ca sa prevenim comportamentul default
    $event.preventDefault();
    this.authResponse.emit(true);
  }

  register() { }
}
