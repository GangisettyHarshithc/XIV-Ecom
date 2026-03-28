import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../shared/services/orderservice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$!: Observable<Order[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // Bind directly to the service's observable
    this.orders$ = this.orderService.orders$;
  }
}