import { Component, computed, effect, inject, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Product } from '../models/product.interface';
import { CartStore } from '../stores/cart.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ProductsComponent {
  // Using httpResource to fetch products data
  productsResource = httpResource<Product[]>(() => 'https://fakestoreapi.com/products', {
    defaultValue: []
  });

  cartStore = inject(CartStore);

  /**
   *
   */
  constructor() {

    effect(()=> {
      const x = this.cartStore.items();

      untracked(() => {
        this.cartStore.addItem(x[0].product,x[0].quantity);
      })


    })
}

  // Computed signal for easy access to products data
  products = computed(() => this.productsResource.value() || []);

  // Helper method to generate star rating array
  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  // Add to cart method (placeholder with alert)
  addToCart(product: Product): void {
      this.cartStore.addItem(product);
      // alert(`Added "${product.title}" to cart!\nPrice: $${product.price}`);
  }
}
