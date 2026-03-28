import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  orderNumber: string = '';

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Generate a premium-looking order ID (e.g., XIV-8A49F)
    this.orderNumber = 'XIV-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  }
}