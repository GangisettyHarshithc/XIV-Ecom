import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

// Ensure your CartItem interface looks something like this at the top of your file or imported
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // 1. The private state (the single source of truth)
  private cartItems: CartItem[] = [];
  
  // 2. The broadcaster (announces changes to the rest of the app)
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  // 3. Observables that components can subscribe to
  cart$ = this.cartSubject.asObservable();
  
  // Automatically calculates the total price whenever the cart changes
  cartTotal$: Observable<number> = this.cart$.pipe(
    map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
  );

  addToCart(newItem: CartItem): void {
    // Check if item with same size/color already exists
    const existingItemIndex = this.cartItems.findIndex(
      item => item.product.id === newItem.product.id && 
              item.selectedSize === newItem.selectedSize
    );

    if (existingItemIndex > -1) {
      // If it exists, just increase the quantity
      this.cartItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      // Otherwise, add it as a new row
      this.cartItems.push(newItem);
    }
    
    // Broadcast the updated list!
    this.cartSubject.next([...this.cartItems]);
  }

  // --- NEW: THE QUANTITY ENGINE ---
  updateQuantity(itemToUpdate: CartItem, change: number): void {
    const index = this.cartItems.findIndex(
      item => item.product.id === itemToUpdate.product.id && 
              item.selectedSize === itemToUpdate.selectedSize
    );

    if (index > -1) {
      const newQuantity = this.cartItems[index].quantity + change;

      if (newQuantity <= 0) {
        // If they click '-' when quantity is 1, remove it completely
        this.cartItems.splice(index, 1);
      } else {
        // Otherwise, just update the number
        this.cartItems[index].quantity = newQuantity;
      }

      // Broadcast the change so the price updates instantly
      this.cartSubject.next([...this.cartItems]);
    }
  }

  // --- ADD THIS TO YOUR CARTSERVICE ---
  removeFromCart(itemToRemove: CartItem): void {
    this.cartItems = this.cartItems.filter(
      item => !(item.product.id === itemToRemove.product.id && item.selectedSize === itemToRemove.selectedSize)
    );
    this.cartSubject.next([...this.cartItems]);
  }

  // Add this method to your CartService
  // --- UPDATED CLEARCART METHOD ---
  clearCart(): void {
    // 1. Empty the local single source of truth
    this.cartItems = []; 
    
    // 2. Broadcast the empty array via the Subject, not the array itself
    this.cartSubject.next([...this.cartItems]); 
  }

}

