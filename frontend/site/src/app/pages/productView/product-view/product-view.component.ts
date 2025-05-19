import { Component, Input } from '@angular/core';
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

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    console.log(this.itemData);
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
    const modal = document.getElementById('app-modal-overlay');
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  closeModal(event: Event): void {
    const target = event.target as HTMLElement;
    const modal = document.getElementById('app-modal-overlay');

    if (
      target.id === 'app-modal-overlay' ||
      target.classList.contains('modal-close') ||
      target.closest('.modal-close-button')
    ) {
      if (modal) {
        modal.style.display = 'none';
      }
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

}