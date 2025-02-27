import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
            <span>New Product</span>
        </div>
        <div class="actions">
            <button class="beautiful-button small">Make Offer</button>
            <button class="beautiful-button small floating">View Product</button>
        </div>
    </div>`
})
export class Product {
    
}
