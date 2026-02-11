import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header';
import { FooterComponent } from '@components/footer';
import { SidebarComponent } from '@components/sidebar';
import { HeaderService } from '@services/header';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, FooterComponent, SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  headerService = inject(HeaderService);
}
