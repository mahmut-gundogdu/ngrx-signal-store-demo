import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  template: `
       <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img src="/logo.svg" alt="ShopEase Logo" class="h-8 w-8" />
          <span class="text-xl font-bold text-gray-800">ShopEase</span>
        </div>
        <ul class="flex space-x-8">
          <li><a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Home</a></li>
          <li><a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Shop</a></li>
          <li><a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Cart</a></li>
          <li><a href="#" class="text-gray-700 hover:text-blue-600 font-medium">Profile</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {

}
