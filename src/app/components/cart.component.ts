import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../stores/cart.store';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-cart-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Cart Store Example</h2>

      <!-- Cart Summary -->
      <div class="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 class="text-lg font-semibold mb-2">Cart Summary</h3>
        <div class="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span class="font-medium">Total Items:</span>
            <span class="ml-2">{{ cartStore.totalItems() }}</span>
          </div>
          <div>
            <span class="font-medium">Unique Items:</span>
            <span class="ml-2">{{ cartStore.uniqueItems() }}</span>
          </div>
          <div>
            <span class="font-medium">Total Price:</span>
            <span class="ml-2">\${{ cartStore.totalPrice().toFixed(2) }}</span>
          </div>
        </div>
        <div class="mt-2">
          <span class="font-medium">Cart Status:</span>
          <span class="ml-2" [class]="cartStore.isEmpty() ? 'text-red-600' : 'text-green-600'">
            {{ cartStore.isEmpty() ? 'Empty' : 'Has Items' }}
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="cartStore.loading()" class="bg-yellow-50 p-4 rounded-lg mb-4">
        <p class="text-yellow-800">Loading...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="cartStore.error()" class="bg-red-50 p-4 rounded-lg mb-4">
        <p class="text-red-800">{{ cartStore.error() }}</p>
        <button
          (click)="cartStore.clearError()"
          class="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
          Clear Error
        </button>
      </div>


      <!-- Cart Items -->
      <div *ngIf="cartStore.hasItems()">
        <h3 class="text-lg font-semibold mb-4">Cart Items</h3>
        <div class="space-y-3">
          <div *ngFor="let item of cartStore.items()" class="border rounded-lg p-4">
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h4 class="font-medium">{{ item.product.title }}</h4>
                <p class="text-gray-600 text-sm">{{ item.product.description }}</p>
                <p class="font-bold">\${{ item.product.price }} each</p>
                <p class="text-sm text-gray-500">Added: {{ item.addedAt | date:'short' }}</p>
              </div>
              <div class="flex items-center gap-2 ml-4">
                <button
                  (click)="cartStore.decrementQuantity(item.product.id)"
                  class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">
                  -
                </button>
                <span class="w-8 text-center">{{ item.quantity }}</span>
                <button
                  (click)="cartStore.incrementQuantity(item.product.id)"
                  class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">
                  +
                </button>
                <button
                  (click)="cartStore.removeItem(item.product.id)"
                  class="ml-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                  Remove
                </button>
              </div>
            </div>
            <div class="mt-2 text-right">
              <span class="font-bold">Subtotal: \${{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Cart Actions -->
        <div class="mt-6 flex gap-4">
          <button
            (click)="cartStore.clearCart()"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Clear Cart
          </button>
          <button
            (click)="cartStore.saveCartToStorage()"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Save Cart
          </button>
          <button
            (click)="cartStore.loadCartFromStorage()"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Load Cart
          </button>
        </div>
      </div>

      <!-- Empty Cart Message -->
      <div *ngIf="cartStore.isEmpty()" class="text-center py-8">
        <p class="text-gray-500 text-lg">Your cart is empty</p>
        <p class="text-gray-400 text-sm">Add some products to get started!</p>
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cartStore = inject(CartStore);


  ngOnInit() {
    // Load cart from storage on component initialization
    this.cartStore.loadCartFromStorage();
  }
}
