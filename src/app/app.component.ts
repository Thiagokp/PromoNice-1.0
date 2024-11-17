import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PromoNice-1.0';

  showHeader: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {

      this.showHeader = !this.router.url.includes('/cadastro-usuario');
    });
  }
}
