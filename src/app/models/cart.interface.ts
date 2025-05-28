import { Product } from './product.interface';

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  uniqueItems: number;
}
