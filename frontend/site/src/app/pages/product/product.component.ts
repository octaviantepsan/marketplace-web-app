import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeProduct } from '../../interfaces/product.interface';
import { AppService } from '../../services/app.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
    <div class="product">
        <div class="image">
            <img [src]="item?.Image" onerror="this.onerror=null;this.src='../../../assets/box.png';">
        </div>
        <div class="title">
            <span>{{ item?.ItemName || 'New Product' }}</span>
        </div>
        <div class="actions" [ngClass]="{'single-button': item?.Availability?.toLowerCase() !== 'available'}">
            <button *ngIf="item?.Availability?.toLowerCase() === 'available'" class="beautiful-button small" (click)="openModal()">Direct Buy</button>
            <button class="beautiful-button small floating" (click)="sendItemData()">View Product</button>
        </div>
    </div>
    <div id="app-modal-overlay" class="modal-overlay" (click)="closeModal($event)">
        <div class="modal-content">
            <span class="modal-close" (click)="closeModal($event)">&times;</span>

            <div class="modal-body">
                <h2>Confirm Action</h2>
                <div
                    style="display: flex; justify-content: center; text-align: center; margin-top: 30px; margin-bottom: 25px;">
                    <span class="confirmation-text">Are you sure you want to purchase this product ? This will send a notification to the seller and
                        he will be given 3 days to send the package to you. When receiving the package, you will be asked to
                        pay the product price + delivery costs.</span>
                </div>

                <div class="modal-actions">
                    <button class="confirm-button" (click)="confirmPurchase()">Yes, Confirm</button>
                </div>
            </div>
        </div>
    </div>
    `
})
export class Product {
    @Input() item: TypeProduct | undefined;
    @Input() user: any = null;
    @Output() viewResponse = new EventEmitter<Object>();
    @Output() directBuyResponse = new EventEmitter<Object>();
    @Output() sendUserToSign = new EventEmitter<any>();

    constructor(private appService: AppService, private toastService: ToastService) { }

    sendItemData() {
        this.viewResponse.emit(this.item);
    }

    openModal(): void {
        if (this.user != null) {
            const modal = document.getElementById('app-modal-overlay');
            if (modal) {
                modal.style.display = 'flex';
            }
        }
        else {
            this.sendUserToSign.emit();
        }
    }

    confirmPurchase(): void {
        this.updateItemStatus("Requested for delivery");
        this.createTransaction();
        this.directBuyResponse.emit();
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

    updateItemStatus(newStatus: string) {
        let bodyStatus = {
            status: newStatus,
            itemId: this.item?.ItemId,
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
            vendorId: this.item?.VendorId,
            buyerId: this.user,
            itemId: this.item?.ItemId
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
