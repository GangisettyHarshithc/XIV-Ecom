import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Router } from '@angular/router'; // Added Router

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input() subtotal: number = 0;
  @Input() shipping: number = 0;
  @Input() total: number = 0;

  // NEW: Flag to hide the button when we are actually on the checkout page
  @Input() showCheckoutButton: boolean = true; 

  @Output() checkout = new EventEmitter<void>();

  // Inject the router so we can force the page change
  constructor(private router: Router) {}

  onCheckout(): void {
    this.checkout.emit(); // Keeps your existing event emitter alive
    this.router.navigate(['/checkout']); // Executes the actual page change
  }
}