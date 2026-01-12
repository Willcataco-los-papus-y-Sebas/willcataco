import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusType = 'paid' | 'debt' | 'process' | 'pending';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadgeComponent {
  @Input() label = '';
  @Input() status: StatusType = 'pending';

  get badgeClasses(): string {
    const base =
      'px-4 py-1.5 rounded-full font-sans text-body font-bold text-white min-w-[100px] text-center transition-colors';

    const variants: Record<StatusType, string> = {
      paid: 'bg-green-700',
      debt: 'bg-warning',
      process: 'bg-yellow-500',
      pending: 'bg-orange-600',
    };

    return `${base} ${variants[this.status]}`;
  }
}
