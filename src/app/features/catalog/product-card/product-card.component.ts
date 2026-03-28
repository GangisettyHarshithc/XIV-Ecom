import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  
  @Output() viewDetails = new EventEmitter<string>(); 
  @Output() addToCart = new EventEmitter<Product>();
  
  // 1. NEW: The Event Emitter for the Notify button
  @Output() notifyMe = new EventEmitter<Product>();

  onCardClick(): void {
    this.viewDetails.emit(this.product.id); 
  }

  onBtnClick(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  // 2. NEW: The click handler for the Notify button
  onNotifyClick(event: Event): void {
    event.stopPropagation(); // Stops the card from navigating to details
    this.notifyMe.emit(this.product);
  }
}