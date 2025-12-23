import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,          
  imports: [CommonModule],    
  templateUrl: './button.html',
  styleUrls: ['./button.css'] 
})
export class ButtonComponent { 
  @Input() variant: 'primary' | 'secondary' | 'warning' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;

  get buttonClasses(): string {
     const base = 'rounded-full font-semibold transition-colors duration-200 flex items-center justify-center focus:outline-none';
     
     const sizes = {
      sm: 'px-4 h-10 text-sm min-w-[100px]',
      md: 'px-6 h-12 text-base min-w-[160px]',
      lg: 'px-8 h-14 text-lg min-w-[240px]' 
    };

    const variants = {
      primary: 'bg-[#581056] text-white hover:bg-[#450c44]', 
      secondary: 'bg-[#000000] text-white hover:bg-gray-800',
      warning: 'bg-[#F9A825] text-white hover:bg-[#d68f1f]',
      disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed'
    };

    const variantKey = (this.disabled || this.loading) ? 'disabled' : this.variant;

    return `${base} ${sizes[this.size]} ${variants[variantKey]}`;
  }
}