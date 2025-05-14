import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
    <div class="product">
        <div class="image">
            <img src="assets/box.png">
        </div>
        <div class="title">
            <span>{{ item?.ItemName || 'New Product' }}</span>
        </div>
        <div class="actions" *ngIf="view === 'productsPage'">
            <button class="beautiful-button small">Make Offer</button>
            <button class="beautiful-button small floating">View Product</button>
        </div>

        <div class="actions" *ngIf="view === 'userPanel'">
            <button class="beautiful-button small">Delist</button>
            <button class="beautiful-button small floating">View Product</button>
        </div>
    </div>`
})
export class Product {
    @Input() item: any;
    @Input() view: any;
}
