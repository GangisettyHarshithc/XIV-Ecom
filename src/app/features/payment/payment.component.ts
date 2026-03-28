import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { CartService } from '../../shared/services/cartservice';
import { CartItem } from '../../shared/models/cart.model';
import { OrderService } from '../../shared/services/orderservice';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  selectedMethod: 'card' | 'apple' | 'paypal' = 'card';
  totalAmount: number = 0;
  isProcessing: boolean = false;
  
  private currentCartItems: CartItem[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    this.cartService.cart$.subscribe(items => {
      this.currentCartItems = items;
      // Calculate total + $10 shipping
      this.totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) + 10; 
    });

    // --- UPDATED FORM GROUP ---
    this.paymentForm = this.fb.group({
      // Credit Card Group
      cardNumber: ['', [Validators.pattern(/^[0-9]{16}$/)]],
      expiry: ['', [Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],
      cvc: ['', [Validators.pattern(/^[0-9]{3,4}$/)]],
      nameOnCard: [''],

      // Apple Pay Identifier
      applePayId: ['', [Validators.email]],

      // PayPal Access Code
      paypalCode: ['', [Validators.minLength(4)]]
    });

    // Set initial validators for the default 'card' method
    this.updateValidators('card');
  }

  selectMethod(method: 'card' | 'apple' | 'paypal'): void {
    this.selectedMethod = method;
    this.updateValidators(method);
  }

  // --- NEW: DYNAMIC VALIDATION SWITCHER ---
  private updateValidators(method: 'card' | 'apple' | 'paypal'): void {
    const controls = ['cardNumber', 'expiry', 'cvc', 'nameOnCard', 'applePayId', 'paypalCode'];
    
    // Clear all validators first
    controls.forEach(control => {
      this.paymentForm.get(control)?.clearValidators();
      this.paymentForm.get(control)?.updateValueAndValidity();
    });

    // Apply specific validators based on selection
    if (method === 'card') {
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{16}$/)]);
      this.paymentForm.get('expiry')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]);
      this.paymentForm.get('cvc')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]);
      this.paymentForm.get('nameOnCard')?.setValidators([Validators.required]);
    } else if (method === 'apple') {
      this.paymentForm.get('applePayId')?.setValidators([Validators.required, Validators.email]);
    } else if (method === 'paypal') {
      this.paymentForm.get('paypalCode')?.setValidators([Validators.required, Validators.minLength(4)]);
    }

    controls.forEach(control => this.paymentForm.get(control)?.updateValueAndValidity());
  }

  processPayment(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;

    // Simulate system handshake
    setTimeout(() => {
      const newOrderId = 'XIV-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      
      this.orderService.addOrder({
        id: newOrderId,
        date: new Date(),
        total: this.totalAmount,
        status: 'Processing',
        items: [...this.currentCartItems]
      });

      this.cartService.clearCart();
      this.isProcessing = false;
      this.router.navigate(['/success']); 
    }, 2000);
  }
}