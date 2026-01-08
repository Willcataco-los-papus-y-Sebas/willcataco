import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '@models/members/member.types';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCardComponent {
  @Input({ required: true }) member!: Member;

  get fullName(): string {
    return `${this.member.name} ${this.member.last_name}`;
  }
}
