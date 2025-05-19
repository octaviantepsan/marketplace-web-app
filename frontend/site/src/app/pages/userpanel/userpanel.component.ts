import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';
import { Product } from '../product/product.component';

@Component({
  selector: 'app-userpanel',
  standalone: true,
  imports: [FormsModule, CommonModule, Product],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.css'
})
export class UserpanelComponent {
  @Input() userId: any;
  showMyData: boolean;
  showMyitems: boolean;
  showAddItem: boolean;
  connectedUserData: any = null;
  myItems: any[] = [];
  mode: string;
  newProductImg: string = "";

  constructor(private appService: AppService) {
    this.showMyData = true;
    this.showAddItem = false;
    this.showMyitems = false;
    this.mode = "userPanel";
  }

  ngOnInit(): void {
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

  uploadProductImage(imageRef: any): void {
    const file: File = imageRef?.files[0];
    if (file) {
      let reader = new FileReader();
      let imageInBase64;
      let outerContext = this;
      reader.readAsDataURL(file as Blob);
      reader.onloadend = function () {
        imageInBase64 = reader.result;
        outerContext.populateImageContainerVisually(imageInBase64);
        (outerContext.newProductImg as any) = imageInBase64;
      }
    }
  }

  populateImageContainerVisually(imageUrl: string | ArrayBuffer | null): void {
    try {
      (document.getElementById("productImgDisplay") as any).src = imageUrl;
    } catch (err) { }
  }

  addItem($event: any, itemForm: NgForm) {
    let body = itemForm.form.value;  //body devine un Object avand ca atribute input-urile care apartin de registerForm -> fname | lname | adress | city
    body["userId"] = this.userId;
    body["image"] = this.newProductImg;

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

  getMyItems() {
    //$event.preventDefault();  ASK ADI

    let outerContext = this;

    this.appService.getProducts(this.userId).subscribe({
      next(data: any) {
        outerContext.myItems = data;
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    })
  }
}
