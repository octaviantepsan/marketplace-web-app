import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '../toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div *ngIf="message" class="toast" [ngClass]="type">
      {{ message }}
    </div>
  `,
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule]
})
export class ToastComponent implements OnInit {
  message = '';
  type: ToastType = 'success';

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toast$.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      setTimeout(() => this.message = '', 3000); // auto-hide after 3s
    });
  }
}
