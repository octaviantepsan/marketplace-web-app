import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from "../product/product.component";

@Component({
    selector: 'app-products-page',
    standalone: true,
    imports: [FormsModule, CommonModule, Product],
    template: `
    <div class="products-page">
        <div class="banner">
            <span>Not just everything, but... every thing.</span>
        </div>
        <div class="flex">
            <div class="filters">
                <div style="text-align:center">
                    Filters placeholder
                </div>
            </div>
            <div class="products">
                <div class="justified">
                    <app-product *ngFor="let product of products"></app-product>
                </div>
            </div>    
        </div>
    </div>`
})
export class ProductsPageComponent {
    products = [1, 2, 3, 4, 5, 6, 7];
}
