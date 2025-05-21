import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppService } from '../../services/app.service';
import { Product } from '../product/product.component';

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
  myItems: any[] = [];
  mode: string;
  newProductImg: string = "";
  selectedStatus: string = "";
  selectedItemId: any = null;
  selectedItemStatus: string = "";
  purchaseInfo: any = null;

  @Output() clickedItemResponse = new EventEmitter<Object>();

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

  sendProductData($event: Object) {
    this.clickedItemResponse.emit($event);
  }

  openModal(): void {
    if (this.userId != null) {
      const modal = document.getElementById('app-modal-overlay');
      if (modal) {
        modal.style.display = 'flex';
      }
    }
    else {
      alert("You must be signed in to procced");
    }
  }

  closeModal(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      target.id === 'app-modal-overlay' ||
      target.classList.contains('modal-close') ||
      target.closest('.modal-close-button')
    ) {
      this.hideModal();
    }
  }

  hideModal(): void {
    const modal = document.getElementById('app-modal-overlay');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  updateDeliveryStatus() {
    if (this.selectedStatus == "") {
      this.selectedStatus = this.selectedItemStatus;
    }

    let body = {
      status: this.selectedStatus,
      itemId: this.selectedItemId
    }

    this.appService.updateDeliveryStatus(body).subscribe({
      next(data: any) {
        console.log(data);
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    });
    this.getMyItems();
    this.hideModal();
  }

  getPurchaseInfo() {
    let body = {
      userId: this.userId,
      itemId: this.selectedItemId
    }

    let outerContext = this;

    this.appService.getPurchaseInfo(body).subscribe({
      next(data: any) {
        console.log(data);

        outerContext.purchaseInfo = data;
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    })
  }

  markAsSold(): void {
    let body = {
      status: "Sold",
      itemId: this.selectedItemId
    };

    this.appService.updateDeliveryStatus(body).subscribe({
      next(data: any) {
        console.log(data);
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    });
    this.getMyItems();
    this.hideModal();
  }
}
