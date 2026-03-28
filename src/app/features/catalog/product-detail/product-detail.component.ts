import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service'; 
import { CartService } from '../../../shared/services/cartservice'; 

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    GalleriaModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  
  // Tactical State Variables
  selectedSize: string = 'M';
  selectedColor: string = 'black';
  
  // THE FIX: This tracks the currently active image index
  activeIndex: number = 0; 
  
  images: any[] = [];
  responsiveOptions: any[] = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 1 },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => {
          if (data) {
            this.product = data; 
            this.setupImages();
            
            // Auto-select the first available size and color
            if (this.product.sizes && this.product.sizes.length > 0) {
              this.selectedSize = this.product.sizes[0];
            }
            if (this.product.colors && this.product.colors.length > 0) {
              this.selectedColor = this.product.colors[0];
            }
          }
        },
        error: (err) => console.error('Failed to load product details', err)
      });
    }
  }

  // --- Tactical UI Switchers ---
  selectDimension(size: string): void {
    this.selectedSize = size;
  }

  selectChroma(color: string): void {
    this.selectedColor = color;
  }

  // --- Image Feed Setup ---
  setupImages(): void {
    if (this.product?.image) {
      this.images = [
        {
          itemImageSrc: this.product.image,
          thumbnailImageSrc: this.product.image,
          alt: this.product.name,
          title: this.product.name,
        },
        {
          itemImageSrc: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500&auto=format&fit=crop',
          thumbnailImageSrc: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=150&auto=format&fit=crop',
          alt: 'View 2',
          title: 'View 2',
        },
        {
          itemImageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop',
          thumbnailImageSrc: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=150&auto=format&fit=crop',
          alt: 'View 3',
          title: 'View 3',
        },
      ];
    }
  }

  // --- Execution Logic ---
  onAddToCart(): void {
    if (this.product) {
      this.cartService.addToCart({
        product: this.product,
        quantity: this.quantity,
        selectedSize: this.selectedSize,
        selectedColor: this.selectedColor
      });
      console.log(`[ SYSTEM_LOG ] -> Deployed to Cart: ${this.quantity}x [${this.selectedSize}] [${this.selectedColor}]`);
    }
  }

  onQuantityChange(event: any): void {
    if (event && event.value) {
      this.quantity = event.value;
    }
  }
}