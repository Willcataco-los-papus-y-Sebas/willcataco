import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from './toast.types';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    readonly toasts = signal<Toast[]>([]);

    show(type: ToastType, message: string, title?: string, duration: number = 3000): void {
        const id = crypto.randomUUID();
        const newToast: Toast = { id, type, message, title, duration };

        this.toasts.update(current => [...current, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                this.remove(id);
            }, duration);
        }
    }

    remove(id: string): void {
        this.toasts.update(current => current.filter(t => t.id !== id));
    }

    success(message: string, title?: string, duration?: number): void {
        this.show('success', message, title, duration);
    }

    error(message: string, title?: string, duration?: number): void {
        this.show('error', message, title, duration);
    }

    warning(message: string, title?: string, duration?: number): void {
        this.show('warning', message, title, duration);
    }

    info(message: string, title?: string, duration?: number): void {
        this.show('info', message, title, duration);
    }
}
