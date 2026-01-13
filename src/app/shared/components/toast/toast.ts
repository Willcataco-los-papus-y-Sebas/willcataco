import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastType } from '@services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
})
export class ToastComponent {
  toastService = inject(ToastService);

  getToastClasses(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'bg-secondaryBackground dark:bg-secondaryBackground-dark border-2 border-success text-black dark:text-white';
      case 'error':
        return 'bg-secondaryBackground dark:bg-secondaryBackground-dark border-2 border-error text-black dark:text-white';
      case 'warning':
        return 'bg-secondaryBackground dark:bg-secondaryBackground-dark border-2 border-warning text-black dark:text-white';
      case 'info':
        return 'bg-secondaryBackground dark:bg-secondaryBackground-dark border-2 border-info text-black dark:text-white';
      default:
        return 'bg-secondaryBackground dark:bg-secondaryBackground-dark border-2 border-gray-200 dark:border-gray-700 text-black dark:text-white';
    }
  }

  getTitleClasses(type: ToastType): string {
    switch (type) {
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-info';
      default:
        return 'text-black dark:text-white';
    }
  }
}
