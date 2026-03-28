import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from './cartservice'; // Adjust path if needed

export interface Order {
  id: string;
  date: Date;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: CartItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Store orders in memory (In a real app, this would be an HTTP call to your database)
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();

  constructor() {}

  addOrder(order: Order): void {
    const currentOrders = this.ordersSubject.getValue();
    // Add the new order to the top of the list
    this.ordersSubject.next([order, ...currentOrders]);
  }
}