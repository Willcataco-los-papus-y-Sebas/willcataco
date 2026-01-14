import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '@components/member-card/member-card';
import { KebabComponent } from '@components/kebab/kebab';
import { ModalComponent } from '@components/modal/modal';
import { HeaderComponent } from '@components/header/header';
import { ButtonComponent } from '@components/button/button';
import { InputComponent } from '@components/input/input';
import { DropdownComponent, DropdownItem } from '@components/dropdown/dropdown';
import { MembersService } from '@services/members/members.service';
import { Member } from '@models/members/member.types';
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
    DropdownComponent,
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
  year = signal('');

  onYearChange(value: string) {
    const numericValue = value.replace(/[^0-9]/g, '');
    this.year.set(numericValue);
  }

  onKeyDown(event: KeyboardEvent) {
    if (
      ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Escape'].includes(
        event.key
      )
    ) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  dropdownItems: DropdownItem[] = [
    { label: 'Enero' },
    { label: 'Febrero' },
    { label: 'Marzo' },
    { label: 'Abril' },
    { label: 'Mayo' },
    { label: 'Junio' },
    { label: 'Julio' },
    { label: 'Agosto' },
    { label: 'Septiembre' },
    { label: 'Octubre' },
    { label: 'Noviembre' },
    { label: 'Diciembre' },
  ];

  onDropdownSelect(label: string) {
    console.log('Selected:', label);
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.loadMembers();
  }

  getMemberOptions(member: Member): KebabOption[] {
    const options: KebabOption[] = [{ label: 'Ver Detalle', action: 'detail' }];

    /*
    const createdAt = new Date(member.created_at).getTime();
    const now = new Date().getTime();
    const diffInMinutes = (now - createdAt) / (1000 * 60);

    if (diffInMinutes <= 60) {
      options.push(
        { label: 'Editar', action: 'edit' },
        { label: 'Eliminar', action: 'delete', variant: 'danger' }
      );
    }
    */

    return options;
  }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    const search = this.searchQuery();
    this.membersService.getMembers(10, 0, search).subscribe({
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
