import { Component, inject, OnInit } from '@angular/core';
import { HeaderService } from '@services/header';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent implements OnInit {
  private readonly headerService = inject(HeaderService);

  ngOnInit(): void {
    this.headerService.reset();
    this.headerService.header_text.set('Ajustes');
  }
  goTo(destino: string): void {
    console.log(`Próximamente navegará a: /ajustes/${destino}`);
  }
}