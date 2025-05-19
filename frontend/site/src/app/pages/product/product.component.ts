import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
        <div class="actions">
            <button class="beautiful-button small">Make Offer</button>
            <button class="beautiful-button small floating" (click)="sendItemData()">View Product</button>
        </div>
    </div>`
})
export class Product {
    @Input() item: any;
    @Output() viewResponse = new EventEmitter<Object>();

    sendItemData() {
        this.viewResponse.emit(this.item);
    }
}
