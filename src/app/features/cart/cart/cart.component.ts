import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

import { CartItemComponent } from '../cart-item/cart-item.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { CartItem, CartService } from '../../../shared/services/cartservice';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, OrderSummaryComponent, RouterModule, ButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  shipping: number = 0;
  total: number = 0;
  
  private cartSub!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // CRITICAL FIX: The setTimeout forces Angular to wait until the HTML is fully rendered
    // before attempting to scroll. The 50ms delay guarantees we win the race condition.
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    // Cleaned up: Just one subscription block!
    this.cartSub = this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      
      this.subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      this.shipping = this.subtotal > 0 ? 10 : 0; 
      this.total = this.subtotal + this.shipping;
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  onQuantityChange(cartItem: CartItem, newQuantity: number): void {
    const difference = newQuantity - cartItem.quantity;
    if (difference !== 0) {
      this.cartService.updateQuantity(cartItem, difference);
    }
  }

  onRemoveItem(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }
}