# Cart Store Documentation

## Overview
The Cart Store is a signal-based state management solution built with `@ngrx/signals` for managing shopping cart functionality in Angular 19 applications.

## Features

### State Management
- **Reactive State**: Built with Angular signals for optimal performance
- **Immutable Updates**: All state changes are immutable and predictable
- **Error Handling**: Comprehensive error handling with loading states
- **Persistence**: LocalStorage integration for cart persistence

### Core Functionality
- Add items to cart
- Remove items from cart
- Update item quantities
- Increment/decrement quantities
- Clear entire cart
- Cart persistence (save/load from localStorage)

### Computed Signals
- `totalItems()` - Total number of items (including quantities)
- `totalPrice()` - Total price of all items
- `uniqueItems()` - Number of unique items
- `isEmpty()` - Whether cart is empty
- `hasItems()` - Whether cart has items
- `cartSummary()` - Complete cart summary object
- `getItemByProductId()` - Get cart item by product ID
- `isProductInCart()` - Check if product is in cart
- `getProductQuantity()` - Get quantity of specific product

## Usage

### Basic Setup

```typescript
import { Component, inject } from '@angular/core';
import { CartStore } from '../stores/cart.store';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <p>Total Items: {{ cartStore.totalItems() }}</p>
      <p>Total Price: ${{ cartStore.totalPrice().toFixed(2) }}</p>
    </div>
  `
})
export class MyComponent {
  cartStore = inject(CartStore);
}
```

### Adding Items

```typescript
// Add single item
cartStore.addItem(product);

// Add multiple quantities
cartStore.addItem(product, 3);
```

### Managing Quantities

```typescript
// Update specific quantity
cartStore.updateQuantity(productId, 5);

// Increment by 1
cartStore.incrementQuantity(productId);

// Decrement by 1 (removes if quantity becomes 0)
cartStore.decrementQuantity(productId);
```

### Removing Items

```typescript
// Remove specific item
cartStore.removeItem(productId);

// Clear entire cart
cartStore.clearCart();
```

### Persistence

```typescript
// Save cart to localStorage
cartStore.saveCartToStorage();

// Load cart from localStorage
cartStore.loadCartFromStorage();
```

### Checking Cart State

```typescript
// Check if product is in cart
if (cartStore.isProductInCart()(productId)) {
  console.log('Product is in cart');
}

// Get product quantity
const quantity = cartStore.getProductQuantity()(productId);

// Check if cart is empty
if (cartStore.isEmpty()) {
  console.log('Cart is empty');
}
```

### Error Handling

```typescript
// Check for errors
if (cartStore.error()) {
  console.error('Cart error:', cartStore.error());
}

// Clear errors
cartStore.clearError();

// Check loading state
if (cartStore.loading()) {
  console.log('Cart operation in progress');
}
```

## State Structure

```typescript
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}
```

## Best Practices

1. **Inject the Store**: Use Angular's `inject()` function to access the store
2. **Use Computed Signals**: Leverage computed signals for derived data
3. **Handle Loading States**: Always check loading states for better UX
4. **Error Handling**: Implement proper error handling in your components
5. **Persistence**: Use `loadCartFromStorage()` on app initialization
6. **Auto-save**: Consider auto-saving cart changes using effects

## Example Component

See `cart-example.component.ts` for a complete implementation example that demonstrates all cart store features.

## Integration with Effects

For automatic persistence, you can use Angular effects:

```typescript
import { effect } from '@angular/core';

export class AppComponent {
  cartStore = inject(CartStore);

  constructor() {
    // Auto-save cart when items change
    effect(() => {
      const items = this.cartStore.items();
      if (items.length > 0) {
        this.cartStore.saveCartToStorage();
      }
    });
  }
}
``` 
