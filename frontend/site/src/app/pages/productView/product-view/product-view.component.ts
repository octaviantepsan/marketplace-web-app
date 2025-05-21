import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() itemData: any;
  vendorName: string = '';
  @Input() userId?: any = null;
  
  @Output() clickedItemResponse = new EventEmitter<any>();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getVendorName();
  }

  ngAfterViewInit(): void {
    // Optional: ensure modal is hidden on init
    const overlay = document.getElementById('app-modal-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
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

  confirmPurchase(): void {
    this.updateItemStatus("Requested for delivery");
    this.createTransaction();
    this.clickedItemResponse.emit();
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

  firstLetterUpperCase(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  getVendorName() {
    let outerContext = this;

    this.appService.getVendorName(this.itemData.VendorId).subscribe({
      next(data: any) {
        outerContext.vendorName = data.LastName + " " + data.FirstName;
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    })
  }

  updateItemStatus(newStatus: string) {
    let bodyStatus = {
      status: newStatus,
      itemId: this.itemData.ItemId,
      availability: "sold_out"
    }

    this.appService.updateItemStatus(bodyStatus).subscribe({
      next(data: any) {
        console.log(data);
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    })
  }

  createTransaction() {
    let bodyTransaction = {
      vendorId: this.itemData.VendorId,
      buyerId: this.userId,
      itemId: this.itemData.ItemId
    }

    this.appService.createTransaction(bodyTransaction).subscribe({
      next(data: any) {
      },
      error(err) {
        if (err && err['status'] === 500) {
          console.log(err);
        }
      }
    })
  }
}