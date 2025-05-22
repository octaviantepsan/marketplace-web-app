import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() itemData: any;
  @Input() userId?: any = null;
  @Output() redirectToSign = new EventEmitter<any>();
  @Output() clickedItemResponse = new EventEmitter<any>();
  vendorName: string = '';

  constructor(private appService: AppService, private toastService: ToastService) { }

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
      this.redirectToSign.emit();
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
          outerContext.toastService.show('Internal server error', 'error');
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

    let outerContext = this;

    this.appService.updateItemStatus(bodyStatus).subscribe({
      next(data: any) { },
      error(err) {
        if (err && err['status'] === 500) {
          outerContext.toastService.show('Internal server error', 'error');
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

    let outerContext = this;

    this.appService.createTransaction(bodyTransaction).subscribe({
      next(data: any) { },
      error(err) {
        if (err && err['status'] === 500) {
          outerContext.toastService.show('Internal server error', 'error');
        }
      }
    })
  }
}