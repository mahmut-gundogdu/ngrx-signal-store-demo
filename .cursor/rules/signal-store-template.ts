import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';

// Define the state interface
interface FeatureState {
  items: any[];
  loading: boolean;
  error: string | null;
  selectedItem: any | null;
}

// Create the signal store
export const FeatureStore = signalStore(
  { providedIn: 'root' },
  withState<FeatureState>({
    items: [],
    loading: false,
    error: null,
    selectedItem: null
  }),
  withComputed(({ items, selectedItem }) => ({
    itemCount: computed(() => items().length),
    hasItems: computed(() => items().length > 0),
    selectedItemName: computed(() => selectedItem()?.name || '')
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    async loadItems(): Promise<void> {
      // Set loading state
      // Make HTTP call with httpResource()
      // Update state with results or error
    },
    selectItem(id: string): void {
      const item = store.items().find(item => item.id === id);
      // Update selected item
    },
    clearError(): void {
      // Clear error state
    }
  }))
);
