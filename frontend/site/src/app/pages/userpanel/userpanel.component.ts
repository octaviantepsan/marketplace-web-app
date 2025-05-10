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
  showMyData: boolean;
  showMyitems: boolean;
  showAddItem: boolean;
  connectedUserData: any = null;

  constructor(private appService: AppService) {
    this.showMyData = true;
    this.showAddItem = false;
    this.showMyitems = false;
  }

  ngOnInit(): void {
    // Call the function on component load
    this.getUserData();
  }

  onShowMyData() {
    this.showMyData = true;
    this.showMyitems = false;
    this.showAddItem = false;
  }

  onShowMyItems() {
    this.showMyData = false;
    this.showMyitems = true;
    this.showAddItem = false;
  }

  onShowAddItem() {
    this.showMyData = false;
    this.showMyitems = false;
    this.showAddItem = true;
  }

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

  getUserData() {
    //$event.preventDefault();  ASK ADI

    let outerContext = this;

    this.appService.getUserData(this.userId).subscribe({
      next(data: any) {
        outerContext.connectedUserData = data;
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    })
  }
}
