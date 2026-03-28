import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. IMPORT THE ROUTER

import { AddressFormComponent } from '../address-form/address-form.component';
// import { OrderSummaryComponent } from '../../cart/order-summary/order-summary.component';
import { ContactInfo, ShippingAddress } from '../../../shared/models/checkout.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  contactInfo: ContactInfo = { email: '', phone: '' };
  shippingAddress: ShippingAddress = {
    firstName: '', lastName: '', addressLine1: '',
    city: '', state: '', zipCode: '', country: '',
  };
  
  subtotal: number = 158;
  shipping: number = 0;
  total: number = 158;

  // 2. INJECT THE ROUTER INTO THE CONSTRUCTOR
  constructor(private router: Router) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  onContactInfoSubmit(contactInfo: ContactInfo): void {
    this.contactInfo = contactInfo;
  }

  onShippingAddressSubmit(address: ShippingAddress): void {
    this.shippingAddress = address;
  }

  // 3. UPDATE THE BUTTON CLICK METHOD
  onCompleteCheckout(): void {
    // This tells Angular to instantly swap to the Payment page!
    this.router.navigate(['/payment']);
  }
}