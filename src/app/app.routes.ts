import { Routes } from '@angular/router';
import { ProductListComponent } from './features/catalog/product-list/product-list.component';
import { ProductDetailComponent } from './features/catalog/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout/checkout.component';
import { PaymentComponent } from './features/payment/payment.component';
import { OrderSuccessComponent } from './features/order-success/order-success.component';
import { OrdersComponent } from './features/orders/orders.component';

// --- NEW IMPORTS ---
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { ProductFilterSidebarComponent } from './features/catalog/product-filter-sidebar/product-filter-sidebar.component';
import { authGuard } from './shared/guards/auth-guard';

import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
 { path: '', component: HomeComponent, pathMatch: 'full' },
  
  // --- PUBLIC ROUTES (Anyone can access) ---
  { path: 'catalog', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'catalog/product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  // --- SECURE ROUTES (Requires Login) ---
  { 
    path: 'checkout', 
    component: CheckoutComponent,
    canActivate: [authGuard] // Locked!
  },
  { 
    path: 'payment', 
    component: PaymentComponent,
    canActivate: [authGuard] // Locked!
  },
  { 
    path: 'success', 
    component: OrderSuccessComponent,
    canActivate: [authGuard] // Locked!
  },
  { 
    path: 'orders', 
    component: OrdersComponent,
    canActivate: [authGuard] // Locked!
  },
  { 
    path: 'profile', 
    component: ProductFilterSidebarComponent,
    canActivate: [authGuard] // Locked!
  },
  
  // Fallback route
  { path: '**', redirectTo: 'catalog' }
];