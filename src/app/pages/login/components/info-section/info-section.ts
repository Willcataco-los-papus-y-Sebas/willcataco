import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-section',
  standalone: true,
  templateUrl: './info-section.html',
  styleUrls: ['./info-section.css'],
})
export class InfoSectionComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) content = '';
}
