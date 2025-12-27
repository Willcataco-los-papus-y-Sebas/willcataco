import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './global/components/components-module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('willcataco');
}
