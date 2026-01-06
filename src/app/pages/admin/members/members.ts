import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '@components/member-card/member-card';
import { KebabComponent } from '@components/kebab/kebab';
import { ModalComponent } from '@components/modal/modal';
import { HeaderComponent } from '@components/header/header';
import { MembersService } from '@services/members/members.service';
import { Member } from '@components/member-card/member.types';
import { KebabOption } from '@components/kebab/kebab.types';

@Component({
    selector: 'app-members',
    standalone: true,
    imports: [CommonModule, MemberCardComponent, KebabComponent, ModalComponent, HeaderComponent],
    templateUrl: './members.html',
    styleUrl: './members.css'
})
export class MembersComponent {
    private membersService = inject(MembersService);

    members = signal<Member[]>([]);
    selectedMember = signal<Member | null>(null);
    isModalOpen = signal(false);

    currentMonth = 'Mes';
    currentYear = new Date().getFullYear();

    kebabOptions: KebabOption[] = [
        { label: 'Ver Detalle', action: 'detail' },
        { label: 'Editar', action: 'edit' },
        { label: 'Eliminar', action: 'delete', variant: 'danger' }
    ];

    constructor() {
        this.loadMembers();
    }

    loadMembers() {
        this.membersService.getMembers().subscribe({
            next: (data) => this.members.set(data),
            error: (err) => console.error(err)
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
