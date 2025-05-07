import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-userpanel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.css'
})
export class UserpanelComponent {
  @Input() userId: any;

  constructor(private appService: AppService) { }

  addItem($event: any, itemForm: NgForm) {
    let body = itemForm.form.value;  //body devine un Object avand ca atribute input-urile care apartin de registerForm -> fname | lname | adress | city
    body["userId"] = this.userId;

    $event.preventDefault();

    if (itemForm.valid === false) {
      console.log("item added unsuccesfully");
    }
    else {
      this.appService.addItem(body).subscribe({
        next(data) {
          console.log(data.message);

          alert("ok");
        },
        error(err) {
          if (err) {
            console.log("item added unsuccesfully");
          }
        }
      })
    }

    itemForm.resetForm();
  }
}
