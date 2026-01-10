import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { HeaderService } from '@services/header/header';
import { ActionService } from '@services/actions/actions';
import { Action } from '@models/actions';

@Component({
  selector: 'app-action-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  templateUrl: './detail.html',
})
export class ActionDetail implements OnInit {
  @Input() id?: string;

  private _headerService = inject(HeaderService);
  private _service = inject(ActionService);

  action = signal<Action | null>(null);
  loading = signal(true);

  ngOnInit() {
    this._headerService.reset();
    this._headerService.header_text.set('Detalle de Acción');
    this._headerService.is_logo.set(false);
    this._headerService.buttons_on.set(true);

    if (this.id) {
      this.loadData(Number(this.id));
    }
  }

  loadData(id: number) {
    this._service.getById(id).subscribe({
      next: (res) => {
        this.action.set(res.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}