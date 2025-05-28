import { computed, inject, signal } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState, withProps } from '@ngrx/signals';
import { CartItem, CartState, CartSummary } from '../models/cart.interface';
import { Product } from '../models/product.interface';
import { LoggerService } from '../logger.service';



const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ items }) => ({
    // Total number of items in cart (including quantities)
    totalItems: computed(() =>
      items().reduce((total, item) => total + item.quantity, 0)
    ),

    // Total price of all items in cart
    totalPrice: computed(() =>
      items().reduce((total, item) => total + (item.product.price * item.quantity), 0)
    ),

    // Number of unique items in cart
    uniqueItems: computed(() => items().length),

    // Check if cart is empty
    isEmpty: computed(() => items().length === 0),

    // Check if cart has items
    hasItems: computed(() => items().length > 0),

    // Cart summary object
    cartSummary: computed((): CartSummary => ({
      totalItems: items().reduce((total, item) => total + item.quantity, 0),
      totalPrice: items().reduce((total, item) => total + (item.product.price * item.quantity), 0),
      uniqueItems: items().length
    })),

    // Get item by product id
    getItemByProductId: computed(() => (productId: number): CartItem | undefined =>
      items().find(item => item.product.id === productId)
    ),

    // Check if product is in cart
    isProductInCart: computed(() => (productId: number): boolean =>
      items().some(item => item.product.id === productId)
    ),

    // Get quantity of specific product
    getProductQuantity: computed(() => (productId: number): number => {
      const item = items().find(item => item.product.id === productId);
      return item ? item.quantity : 0;
    })
  })),
  withMethods((store) => {

    const logger = inject(LoggerService);
    return {
      // Add item to cart
      addItem: (product: Product, quantity: number = 1) => {
        patchState(store, { loading: true, error: null });
        logger.log('Adding item to cart', { product, quantity });
        try {
          const currentItems = store.items();
          const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = currentItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );

            patchState(store, {
              items: updatedItems,
              loading: false,
              lastUpdated: new Date()
            });
          } else {
            // Add new item
            const newItem: CartItem = {
              id: Date.now(), // Simple ID generation
              product,
              quantity,
              addedAt: new Date()
            };

            patchState(store, {
              items: [...currentItems, newItem],
              loading: false,
              lastUpdated: new Date()
            });
          }
        } catch (error) {
          patchState(store, {
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to add item to cart'
          });
        }
      },

      // Remove item from cart completely
      removeItem: (productId: number) => {
        patchState(store, { loading: true, error: null });

        try {
          const updatedItems = store.items().filter(item => item.product.id !== productId);

          patchState(store, {
            items: updatedItems,
            loading: false,
            lastUpdated: new Date()
          });
        } catch (error) {
          patchState(store, {
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to remove item from cart'
          });
        }
      },

      // Update item quantity
      updateQuantity: (productId: number, quantity: number) => {
        patchState(store, { loading: true, error: null });

        try {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            const updatedItems = store.items().filter(item => item.product.id !== productId);
            patchState(store, {
              items: updatedItems,
              loading: false,
              lastUpdated: new Date()
            });
          } else {
            // Update quantity
            const updatedItems = store.items().map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            );

            patchState(store, {
              items: updatedItems,
              loading: false,
              lastUpdated: new Date()
            });
          }
        } catch (error) {
          patchState(store, {
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to update item quantity'
          });
        }
      },

          // Increment item quantity by 1
      incrementQuantity: (productId: number) => {
        const currentItem = store.items().find(item => item.product.id === productId);
        if (currentItem) {
          patchState(store, { loading: true, error: null });

          try {
            const updatedItems = store.items().map(item =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );

            patchState(store, {
              items: updatedItems,
              loading: false,
              lastUpdated: new Date()
            });
          } catch (error) {
            patchState(store, {
              loading: false,
              error: error instanceof Error ? error.message : 'Failed to increment item quantity'
            });
          }
        }
      },

      // Decrement item quantity by 1
      decrementQuantity: (productId: number) => {
        const currentItem = store.items().find(item => item.product.id === productId);
        if (currentItem) {
          patchState(store, { loading: true, error: null });

          try {
            if (currentItem.quantity <= 1) {
              // Remove item if quantity would become 0
              const updatedItems = store.items().filter(item => item.product.id !== productId);
              patchState(store, {
                items: updatedItems,
                loading: false,
                lastUpdated: new Date()
              });
            } else {
              // Decrement quantity
              const updatedItems = store.items().map(item =>
                item.product.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              );

              patchState(store, {
                items: updatedItems,
                loading: false,
                lastUpdated: new Date()
              });
            }
          } catch (error) {
            patchState(store, {
              loading: false,
              error: error instanceof Error ? error.message : 'Failed to decrement item quantity'
            });
          }
        }
      },

      // Clear entire cart
      clearCart: () => {
        patchState(store, { loading: true, error: null });

        try {
          patchState(store, {
            items: [],
            loading: false,
            lastUpdated: new Date()
          });
        } catch (error) {
          patchState(store, {
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to clear cart'
          });
        }
      },

      // Clear any errors
      clearError: () => {
        patchState(store, { error: null });
      },

      // Load cart from localStorage (for persistence)
      loadCartFromStorage: () => {
        patchState(store, { loading: true, error: null });

        try {
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Convert date strings back to Date objects
            const items = parsedCart.items.map((item: any) => ({
              ...item,
              addedAt: new Date(item.addedAt)
            }));

            patchState(store, {
              items,
              loading: false,
              lastUpdated: parsedCart.lastUpdated ? new Date(parsedCart.lastUpdated) : null
            });
          } else {
            patchState(store, { loading: false });
          }
        } catch (error) {
          patchState(store, {
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load cart from storage'
          });
        }
      },

      // Save cart to localStorage (for persistence)
      saveCartToStorage: () => {
        try {
          const cartData = {
            items: store.items(),
            lastUpdated: store.lastUpdated()
          };
          localStorage.setItem('cart', JSON.stringify(cartData));
        } catch (error) {
          patchState(store, {
            error: error instanceof Error ? error.message : 'Failed to save cart to storage'
          });
        }
      }
    }
  })
);
