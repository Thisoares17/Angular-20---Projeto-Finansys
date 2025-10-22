import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesRoutingModule } from './pages/categories/categories-routing-module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-database';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CategoriesRoutingModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('finansys');
}
