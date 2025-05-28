import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products.component';
import { HomeComponent } from './home.component';
import { CartComponent } from './components/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];
