import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Status } from '../../models/status/status.enum';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadgeComponent {
  @Input() label = '';
  @Input() status: Status = Status.PENDING;

  get badgeClasses(): string {
    const base =
      'px-4 py-1.5 rounded-full font-sans text-body font-bold text-white min-w-[100px] text-center transition-colors';

    const variants: Record<Status, string> = {
      [Status.PAID]: 'bg-success',
      [Status.DEBT]: 'bg-error',
      [Status.PROCESS]: 'bg-warning',
      [Status.PENDING]: 'bg-pending',
    };

    return `${base} ${variants[this.status]}`;
  }
}
