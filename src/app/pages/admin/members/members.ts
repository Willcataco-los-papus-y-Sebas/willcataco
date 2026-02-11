import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataCardComponent } from '@components/data-card/data-card';
import { KebabComponent } from '@components/kebab/kebab';
import { ButtonComponent } from '@components/button/button';
import { ModalComponent } from '@components/modal/modal';
import { InputComponent } from '@components/input/input';
import { DropdownComponent, DropdownItem } from '@components/dropdown/dropdown';
import { MembersService } from '@services/members/members.service';
import { Member } from '@models/members/member.types';
import { KebabOption } from '@components/kebab/kebab.types';
import { HeaderService } from '@services/header';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    DataCardComponent,
    DropdownComponent,
    KebabComponent,
    ModalComponent,
    InputComponent,
  ],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members implements OnInit {
  private membersService = inject(MembersService);
  private router = inject(Router);
  private headerService = inject(HeaderService);

  members = signal<Member[]>([]);
  selectedMember = signal<Member | null>(null);
  isModalOpen = signal(false);
  searchQuery = signal('');
  year = signal('');
  month = signal<string | undefined>(undefined);

  limit = 10;
  offset = 0;
  isLoading = signal(false);
  hasMore = signal(true);

  onYearChange(value: string) {
    const numericValue = value.replace(/[^0-9]/g, '');
    this.year.set(numericValue);
    if (numericValue.length === 4 || numericValue.length === 0) {
      this.loadMembers(true);
    }
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

  monthMap: Record<string, string> = {
    Enero: '1',
    Febrero: '2',
    Marzo: '3',
    Abril: '4',
    Mayo: '5',
    Junio: '6',
    Julio: '7',
    Agosto: '8',
    Septiembre: '9',
    Octubre: '10',
    Noviembre: '11',
    Diciembre: '12',
  };

  onDropdownSelect(label: string) {
    const monthNum = this.monthMap[label];
    this.month.set(monthNum);
    this.loadMembers(true);
  }

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.year.set('');
    this.month.set(undefined);
    this.loadMembers(true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMemberOptions(_member: Member): KebabOption[] {
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
    this.headerService.reset();
    this.headerService.buttons_on.set(true);
    this.headerService.is_logo.set(false);
    this.headerService.logo.set('droplet-fill');
    this.headerService.header_text.set('Socios de Willcataco');

    this.loadMembers(true);
  }

  loadMembers(reset = false) {
    if (this.isLoading()) return;

    if (reset) {
      this.offset = 0;
      this.hasMore.set(true);
      this.members.set([]);
    }

    if (!this.hasMore()) return;

    this.isLoading.set(true);
    const search = this.searchQuery();
    const y = this.year();
    const m = this.month();

    const request =
      y || m
        ? this.membersService.getByDate(y, m, this.limit, this.offset)
        : this.membersService.getAll(this.limit, this.offset, search);

    request.subscribe({
      next: data => {
        if (data.length < this.limit) {
          this.hasMore.set(false);
        }

        if (reset) {
          this.members.set(data);
        } else {
          this.members.update(current => [...current, ...data]);
        }

        this.offset += this.limit;
        this.isLoading.set(false);
      },
      error: err => {
        console.error(err);
        this.isLoading.set(false);
        if (reset) this.members.set([]);
      },
    });
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 50) {
      this.loadMembers();
    }
  }

  onKebabAction(action: string, member: Member) {
    if (action === 'detail') {
      this.openDetail(member);
    }
  }

  onCardClick(member: Member) {
    this.router.navigate(['/admin/socios', member.id, 'pagos']);
  }

  openDetail(member: Member) {
    this.selectedMember.set(member);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedMember.set(null);
  }

  goToPayments() {
    const member = this.selectedMember();
    if (member) {
      this.router.navigate(['/admin/socios', member.id, 'pagos']);
    }
  }
}
