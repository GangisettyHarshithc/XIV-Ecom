import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../shared/services/cartservice';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() item!: CartItem; // Receives the item from the parent loop

  constructor(private cartService: CartService) {}

  onIncrease(): void {
    // Tell the service to add 1
    this.cartService.updateQuantity(this.item, 1);
  }

  onDecrease(): void {
    // Tell the service to subtract 1
    this.cartService.updateQuantity(this.item, -1);
  }
}