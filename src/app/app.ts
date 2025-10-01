import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesRoutingModule } from "./pages/categories/categories-routing-module";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CategoriesRoutingModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('finansys');
}
