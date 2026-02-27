import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@services/header';
import { WaterMeter } from '@models/water-meter';


const MOCK_WATER_METERS: WaterMeter[] = [
  {
    id: 1,
    reading: 1268
  },
  {
    id: 2,
    reading: 1500
  }
]

@Component({
  selector: 'app-water-meters',
  imports: [],
  templateUrl: './water-meters.html',
  styleUrl: './water-meters.css',
})
export class MemberWaterMeters implements OnInit {
  private readonly headerService = inject(HeaderService)
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.headerService.header_text.set("Tus Medidores");
    this.headerService.is_normal.set(true);
    this.headerService.has_wave.set(false);
    this.headerService.is_logo.set(false);
    this.headerService.buttons_on.set(true);
  }


  readonly waterMeters = signal<WaterMeter[]>(MOCK_WATER_METERS);

  navigateToPayments(meterId: number): void {
    this.router.navigate(['/water-payment'], {
      queryParams: { meterId: meterId }
    });
  }
}
