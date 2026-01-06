import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-direct-access',
  imports: [RouterLink],
  templateUrl: './direct-access.html',
  styleUrl: './direct-access.css',
})
export class DirectAccessComponent {
  @Input() report_text = '';
  @Input() icon = '';
  @Input() access_text = '';
  @Input() route = '';
}
