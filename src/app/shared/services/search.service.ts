import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private mockProducts = [
    { id: 1, name: 'Classic T-Shirt', price: 29.99, category: 'Basics', image: '/assets/products/tshirt.jpg' },
    { id: 2, name: 'Premium Jacket', price: 149.99, category: 'Outerwear', image: '/assets/products/jacket.jpg' },
    { id: 3, name: 'Designer Jeans', price: 89.99, category: 'Denim', image: '/assets/products/jeans.jpg' },
    { id: 4, name: 'Summer Dress', price: 59.99, category: 'Dresses', image: '/assets/products/dress.jpg' },
    { id: 5, name: 'Casual Hoodie', price: 49.99, category: 'Hoodies', image: '/assets/products/hoodie.jpg' },
  ];

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any[]> {
    // Mock search - replace with actual API call
    return of(
      this.mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
    ).pipe(
      delay(300), // Simulate network delay
      map(results => results.slice(0, 5)) // Limit to 5 results
    );
  }

  getProductById(id: string): Observable<any> {
    return of(
      this.mockProducts.find(p => p.id === parseInt(id))
    ).pipe(delay(300));
  }
}
