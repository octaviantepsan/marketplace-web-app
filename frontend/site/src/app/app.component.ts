import { Component } from '@angular/core';
import { SigninComponent } from './pages/signin/signin.component';
import { CommonModule } from '@angular/common';
import { AppService } from './services/app.service';
import { CarouselComponent } from "./pages/carousel/carousel.component";
import { ProductsPageComponent } from "./pages/productsPage/productsPage.component";
import { UserpanelComponent } from './pages/userpanel/userpanel.component';
import { Product } from "./pages/product/product.component";
import { ProductViewComponent } from "./pages/productView/product-view/product-view.component";
import { ToastComponent } from "./services/toast/toast.component";

interface Item {
  VendorId: number;
  Status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SigninComponent, CarouselComponent, ProductsPageComponent, UserpanelComponent, ProductViewComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'site';
  showSignInBtn: boolean;
  showSignOutBtn: boolean;
  showSignInPage: boolean;
  showUserPanelPage: boolean;
  isUserAuth: boolean;
  showReturnBtn: boolean;
  showHomepageElements: boolean;
  connectedUserId: any = null;
  showUserPanelBtn: boolean;
  showProductView: boolean;
  receivedClickedItemData: any = null;
  showNotifModal: boolean;

  constructor(private appService: AppService) {
    this.showSignInBtn = true;
    this.showSignOutBtn = false;
    this.showSignInPage = false;
    this.isUserAuth = false;
    this.showReturnBtn = false;
    this.showHomepageElements = true;
    this.showUserPanelPage = false;
    this.showUserPanelBtn = false;
    this.showProductView = false;
    this.showNotifModal = false;
  }

  onSignIn() {
    this.showSignInBtn = false;
    this.showSignInPage = true;
    this.showReturnBtn = true;
    this.showHomepageElements = false;
    this.showProductView = false;
  }

  onSignOut() {
    this.isUserAuth = false;
    this.showSignOutBtn = false;
    this.showSignInBtn = true;
    this.showHomepageElements = true;
    this.connectedUserId.isSucces = false;
    this.showReturnBtn = false;
    this.showUserPanelPage = false;
    this.showUserPanelBtn = false;
    this.showProductView = false;
  }

  onReturn() {
    this.showSignInPage = false;
    this.showUserPanelPage = false;
    if (this.isUserAuth === false) {
      this.showSignInBtn = true;
    }

    if (this.isUserAuth === true) {
      this.showUserPanelBtn = true;
    }

    this.showReturnBtn = false;
    this.showHomepageElements = true;
    this.showProductView = false;
  }

  onUserPanel() {
    this.showUserPanelPage = true;
    this.showSignInPage = false;
    this.showReturnBtn = true;
    this.showHomepageElements = false;
    this.showSignInBtn = false;
    this.showSignOutBtn = true;
    this.showUserPanelBtn = false;
    this.showProductView = false;
  }

  captureAuthResponse($event: Object) {
    this.showSignInBtn = false;
    this.showSignOutBtn = true;
    this.isUserAuth = true;
    this.showReturnBtn = false;
    this.showSignInPage = false;
    this.showHomepageElements = true;
    this.showUserPanelBtn = true;
    this.connectedUserId = $event;

    let outerContext = this;
    if (this.connectedUserId.IsVendor === 1) {
      this.appService.getProductsForNotif(this.connectedUserId.userId).subscribe({
        next(data: Item[]) {
          const isVendorForSome = data.some(item => item.VendorId === outerContext.connectedUserId.userId && item.Status === "Requested for delivery");
          if (isVendorForSome === true) {
            outerContext.showNotifModal = true;
          }
        },
        error(err) {
          if (err && err['status'] === 500) {
            console.log(err);
          }
        }
      })
    }
  }

  closeModal(event: Event): void {
    const target = event.target as HTMLElement;
    if (
      target.id === 'app-modal-overlay' ||
      target.classList.contains('modal-close') ||
      target.classList.contains('confirm-button') ||
      target.closest('.modal-close-button')
    ) {
      this.hideModal();
    }
  }

  hideModal(): void {
    const modal = document.getElementById('app-modal-overlay');
    if (modal) {
      modal.style.display = 'none';
      this.showNotifModal = false;
    }
  }

  captureProductResponse($event: Object) {
    this.showHomepageElements = false;
    this.showReturnBtn = true;
    this.showProductView = true;
    this.showUserPanelPage = false;
    this.receivedClickedItemData = $event;
    if (this.isUserAuth === true) {
      this.showUserPanelBtn = true;
    }
  }
}