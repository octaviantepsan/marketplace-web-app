import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  @Output() signStatus = new EventEmitter<boolean>();

  signedIn() {
    this.signStatus.emit(true);
  }
}
