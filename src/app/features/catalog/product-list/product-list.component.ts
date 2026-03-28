import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Product, FilterCriteria } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { CartService } from '../../../shared/services/cartservice';
import { ProductFilterSidebarComponent } from '../product-filter-sidebar/product-filter-sidebar.component';
import { ProductGridComponent } from '../product-grid/product-grid.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFilterSidebarComponent, ProductGridComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  onViewProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product,
      quantity: 1,
      selectedSize: product.sizes?.length ? product.sizes[0] : '',
      selectedColor: product.colors?.length ? product.colors[0] : ''
    });

    // Added: Premium Success Toast
    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Added to Cart',
    //   detail: `${product.name} has been added.`,
    //   life: 2000
    // });
  }

  onFiltersChange(filters: FilterCriteria): void {
  // Use 'this.products' (the master list) to filter from
  this.filteredProducts = this.products.filter((product) => {
    
    // Ensure both priceRange values are treated as numbers
    const minPrice = filters.priceRange[0];
    const maxPrice = filters.priceRange[1];

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    const matchesCategory = filters.categories.length === 0 || 
                            filters.categories.includes(product.category);

    const matchesSize = filters.sizes.length === 0 || 
                        (product.sizes && product.sizes.some((s) => filters.sizes.includes(s)));

    const matchesAvailability = filters.availability.length === 0 || 
      (filters.availability.includes('in-stock') && product.inStock) ||
      (filters.availability.includes('out-of-stock') && !product.inStock);

    return matchesPrice && matchesCategory && matchesSize && matchesAvailability;
  });
}

  onNotifyMe(product: Product): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Notification Set',
      detail: `We'll alert you when ${product.name} returns to stock.`,
      life: 3000
    });
  }
}