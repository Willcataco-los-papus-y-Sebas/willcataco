import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '@components/member-card/member-card';
import { KebabComponent } from '@components/kebab/kebab';
import { ModalComponent } from '@components/modal/modal';
import { HeaderComponent } from '@components/header/header';
import { ButtonComponent } from '@components/button/button';
import { InputComponent } from '@components/input/input';
import { MembersService } from '@services/members/members.service';
import { Member } from '@components/member-card/member.types';
import { KebabOption } from '@components/kebab/kebab.types';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MemberCardComponent,
    KebabComponent,
    ModalComponent,
    HeaderComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit {
  private membersService = inject(MembersService);

  members = signal<Member[]>([]);
  selectedMember = signal<Member | null>(null);
  isModalOpen = signal(false);
  searchQuery = signal('');

  currentYear = new Date().getFullYear();

  kebabOptions: KebabOption[] = [
    { label: 'Ver Detalle', action: 'detail' },
    { label: 'Editar', action: 'edit' },
    { label: 'Eliminar', action: 'delete', variant: 'danger' },
  ];

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.getMembers().subscribe({
      next: data => this.members.set(data),
      error: err => console.error(err),
    });
  }

  onKebabAction(action: string, member: Member) {
    if (action === 'detail') {
      this.openDetail(member);
    }
  }

  onCardClick(member: Member) {
    console.log(member.name);
  }

  openDetail(member: Member) {
    this.selectedMember.set(member);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedMember.set(null);
  }
}
