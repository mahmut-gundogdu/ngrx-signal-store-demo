import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStore } from './stores/cart.store';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <a routerLink="/" class="flex items-center space-x-2">
            <div class="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">SE</span>
            </div>
            <span class="text-xl font-bold text-gray-800">ShopEase</span>
          </a>
        </div>
        <ul class="flex space-x-8">
          <li>
            <a
              routerLink="/"
              routerLinkActive="text-blue-600"
              [routerLinkActiveOptions]="{exact: true}"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              routerLink="/products"
              routerLinkActive="text-blue-600"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Products
            </a>
          </li>
          <li>
            <a
              routerLink="/cart"
              routerLinkActive="text-blue-600"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Cart ({{ cardItemsCount() }})
            </a>
          </li>
          <li>
            <a
              href="#"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Profile
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {
  cartStore = inject(CartStore);
  cardItemsCount = computed(() => this.cartStore.totalItems());
}
