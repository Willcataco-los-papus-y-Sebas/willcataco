import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'warning' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() disabled = false;

  get buttonClasses(): string {
    const base =
      'rounded-full font-semibold transition-colors duration-200 flex items-center justify-center focus:outline-none';

    const sizes = {
      sm: 'px-4 h-10 text-sm min-w-24',
      md: 'px-6 h-12 text-base min-w-40',
      lg: 'px-8 h-14 text-lg min-w-60',
    };

    const variants = {
      primary:
        'bg-primary text-white hover:bg-hover dark:bg-primary-dark dark:hover:bg-hover-dark',
      secondary:
        'bg-secondaryBackground text-secondary border border-secondary/20 hover:bg-secondary/10 dark:bg-secondaryBackground-dark dark:text-secondary-dark dark:border-secondary-dark/20 dark:hover:bg-secondary-dark/10',
      warning:
        'bg-warning text-secondary hover:bg-warning/80',
      disabled:
        'bg-disabled text-secondary/60 cursor-not-allowed dark:bg-disabled-dark dark:text-secondary-dark/60',
    };

    const variantKey = this.disabled || this.loading ? 'disabled' : this.variant;

    return `${base} ${sizes[this.size]} ${variants[variantKey]}`;
  }
}
