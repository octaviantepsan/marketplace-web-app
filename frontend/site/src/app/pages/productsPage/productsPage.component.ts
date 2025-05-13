import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from "../product/product.component";
import { AppService } from '../../services/app.service';

interface FilterOptions {
    sortBy: string;
    minPrice: number;
    maxPrice: number;
    availability: string;
    category: string;
}

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
                    <div class="filters-container">
                        <div class="filter-item">
                            <label for="sort-by">Sort By:</label>
                            <select id="sort-by" [(ngModel)]="filters.sortBy" (ngModelChange)="filterProducts()">
                                <option value="">Default</option>
                                <option value="name_asc">Name (A-Z)</option>
                                <option value="name_desc">Name (Z-A)</option>
                                <option value="price_asc">Price (Low to High)</option>
                                <option value="price_desc">Price (High to Low)</option>
                            </select>
                        </div>
                        <div class="filter-item">
                            <label>Price Range:</label>
                            <div class="price-slider">
                                <input type="range" min="0" max="1000" step="10" [value]="filters.minPrice" (input)="updateMinPrice($event)">
                                <input type="range" min="0" max="1000" step="10" [value]="filters.maxPrice" (input)="updateMaxPrice($event)">
                            </div>
                            <div class="price-inputs">
                                <label for="min-price">Min:</label>
                                <input type="number" id="min-price" [(ngModel)]="filters.minPrice" (ngModelChange)="filterProducts()">
                                <label for="max-price">Max:</label>
                                <input type="number" id="max-price" [(ngModel)]="filters.maxPrice" (ngModelChange)="filterProducts()">
                            </div>
                        </div>
                        <div class="filter-item">
                            <label for="availability">Availability:</label>
                            <select id="availability" [(ngModel)]="filters.availability" (ngModelChange)="filterProducts()">
                                <option value="available">Available</option>
                                <option value="sold_out">Sold Out</option>
                            </select>
                        </div>
                        <div class="filter-item">
                            <label for="category">Category:</label>
                            <select id="category" [(ngModel)]="filters.category" (ngModelChange)="filterProducts()">
                                <option value="all">All</option>
                                <option value="electronics">Electronics</option>
                                <option value="for_house">For House</option>
                                <option value="books">Books</option>
                                <option value="sports">Sports</option>
                                <option value="clothing">Clothing</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="products">
                    <div class="justified">
                        <app-product *ngFor="let product of products"></app-product>
                    </div>
                </div>    
            </div>
        </div>
    `,
    styles: [`
        .filters-container {
            padding: 10px;
            border-radius: 4px;
            margin-left: 20px;
        }

        .filter-item {
            margin-bottom: 16px;
        }

        .filter-item label {
            display: block;
            margin-bottom: 4px;
            font-weight: bold;
        }

        .filter-item select,
        .filter-item input[type="number"] {
            width: calc(100% - 12px);
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 2px;
            box-sizing: border-box;
        }

        .price-slider {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;
        }

        .price-slider input[type="range"] {
            flex-grow: 1;
        }

        .price-inputs {
            display: flex;
            gap: 16px;
            align-items: center;
        }

        .price-inputs label {
            font-weight: normal;
        }

        .price-inputs input[type="number"] {
            width: 80px;
        }
  `]
})
export class ProductsPageComponent {
    filters: FilterOptions = {
        sortBy: '',
        minPrice: 0,
        maxPrice: 1000,
        availability: 'available',
        category: 'all',
    };
    products = [1, 2, 3, 4, 5, 6, 7];

    constructor(private appService: AppService) { }

    ngOnInit(): void {
        this.filterProducts();
    }

    updateMinPrice($event: any) {
        const value = +$event.target.value;
        this.filters.minPrice = value;
        this.filterProducts();
    }

    updateMaxPrice($event: any) {
        const value = +$event.target.value;
        this.filters.maxPrice = value;
        this.filterProducts();
    }

    filterProducts() {
        let outerContext = this;
        // fetch products
        this.appService.getProducts().subscribe({
            next(data: any[]) {
                // uncomment once api request is ready
                // outerContext.products = data.filter(e => {
                //     if (e.price >= outerContext.filters['minPrice'] &&
                //         e.price <= outerContext.filters['maxPrice'] &&
                //         e.availability === outerContext.filters['availability'] && // change if availability is actually a bool
                //         e.category === outerContext.filters['category']) {
                //         return e;
                //     }
                // }).sort(outerContext.compareFn);
            },
            error(err) {
                // error handling
            }
        })
    }

    compareFn(a: any, b: any) {
        switch (this.filters.sortBy) {
            case "name_asc":
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            case "name_desc":
                if (a.name > b.name) {
                    return -1;
                } else if (a.name < b.name) {
                    return 1;
                }
                return 0;
            case "price_asc":
                if (a.price < b.price) {
                    return -1;
                } else if (a.price > b.price) {
                    return 1;
                }
                return 0;
            case "price_desc":
                if (a.price > b.price) {
                    return -1;
                } else if (a.price < b.price) {
                    return 1;
                }
                return 0;
            default:
                break;
        }
        return 0
    }

}
