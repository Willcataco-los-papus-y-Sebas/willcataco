import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from './member.types';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCardComponent {
  @Input({ required: true }) member!: Member;
  @Input() showActions = true;
  @Output() actionClick = new EventEmitter<void>();

  get fullName(): string {
    return `${this.member.name} ${this.member.last_name}`;
  }

  onActionClick(event: Event) {
    event.stopPropagation();
    this.actionClick.emit();
  }
}
