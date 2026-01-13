import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-member-payments',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './payments.html',
    styleUrl: './payments.css',
})
export class MemberPaymentsComponent implements OnInit {
    private route = inject(ActivatedRoute);

    memberId = signal<number | null>(null);

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.memberId.set(Number(id));
            }
        });
    }
}
