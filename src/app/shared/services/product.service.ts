import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private mockProducts: Product[] = [
    // --- BASICS & T-SHIRTS ---
    {
      id: '1',
      name: 'Basic Slim Fit T-Shirt',
      description: 'High-quality basic slim t-shirt perfect for everyday minimalist wear.',
      price: 99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop', 
      category: 'Basics',
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      colors: ['White', 'Black'],
      inStock: true
    },
    {
      id: '2',
      name: 'Basic Heavy Weight T-Shirt',
      description: 'Premium heavy weight cotton t-shirt with a structured, relaxed fit.',
      price: 100,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500&auto=format&fit=crop',
      category: 'Basics',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Gray'],
      inStock: true
    },
    {
      id: '3',
      name: 'Essential White Tee',
      description: 'The foundation of any wardrobe. 100% Organic cotton.',
      price: 45,
      image: 'https://images.unsplash.com/photo-1554568212-3c1696996a24?q=80&w=500&auto=format&fit=crop',
      category: 'Basics',
      sizes: ['XS', 'S', 'M'],
      colors: ['White'],
      inStock: true
    },
    {
      id: '4',
      name: 'Pivotal Boxy Tee',
      description: 'Heavy jersey cotton with a modern boxy silhouette.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500&auto=format&fit=crop',
      category: 'Basics',
      sizes: ['L', 'XL', '2XL'],
      colors: ['Black'],
      inStock: true
    },

    // --- TOPS & SHIRTS ---
    {
      id: '5',
      name: 'Abstract Print Shirt',
      description: 'Relaxed-fit shirt. Camp collar and short sleeves.',
      price: 85,
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=500&auto=format&fit=crop',
      category: 'Tops',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue', 'White'],
      inStock: true
    },
    {
      id: '6',
      name: 'Linen Blend Shirt',
      description: 'Breathable linen blend for warm climate comfort.',
      price: 130,
      image: 'https://images.unsplash.com/photo-1596755094514-f87034a26cc1?q=80&w=500&auto=format&fit=crop',
      category: 'Tops',
      sizes: ['M', 'L', 'XL'],
      colors: ['White', 'Blue'],
      inStock: true
    },
    {
      id: '7',
      name: 'Oversized Flannel',
      description: 'Soft-brushed flannel in a classic monochrome check.',
      price: 110,
      image: 'https://images.unsplash.com/photo-1588358411643-9f8bc8360f03?q=80&w=500&auto=format&fit=crop',
      category: 'Tops',
      sizes: ['L', 'XL'],
      colors: ['Gray', 'Black'],
      inStock: false
    },
    {
      id: '8',
      name: 'Denim Utility Shirt',
      description: 'Rugged denim shirt with reinforced stitching.',
      price: 155,
      image: 'https://images.unsplash.com/photo-1550995694-3f5f4a7b1bd2?q=80&w=500&auto=format&fit=crop',
      category: 'Tops',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue'],
      inStock: true
    },

    // --- PREMIUM COLLECTION ---
    {
      id: '9',
      name: 'Mercerized Cotton Polo',
      description: 'Signature sheen finish with a precise tailored collar.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=500&auto=format&fit=crop',
      category: 'Premium',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Blue'],
      inStock: true
    },
    {
      id: '10',
      name: 'Cashmere Blend Sweater',
      description: 'Ultra-soft blend for exceptional thermal regulation.',
      price: 295,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=500&auto=format&fit=crop',
      category: 'Premium',
      sizes: ['M', 'L', 'XL'],
      colors: ['Gray'],
      inStock: true
    },
    {
      id: '11',
      name: 'Silk Touch Dress Shirt',
      description: 'Formal elegance with a silk-infused cotton finish.',
      price: 220,
      image: 'https://images.unsplash.com/photo-1621072156002-e2fcced0b170?q=80&w=500&auto=format&fit=crop',
      category: 'Premium',
      sizes: ['S', 'M', 'L'],
      colors: ['White'],
      inStock: true
    },
    {
      id: '12',
      name: 'Architectural Blazer',
      description: 'Structured shoulders with a minimalist single-button closure.',
      price: 450,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=500&auto=format&fit=crop',
      category: 'Premium',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black'],
      inStock: true
    },

    // --- OUTERWEAR & JACKETS ---
    {
      id: '13',
      name: 'Full Sleeve Zipper Jacket',
      description: 'Lightweight tech-fabric jacket for transitional weather.',
      price: 199,
      image: 'https://images.unsplash.com/photo-1604108415419-6d4bd73a1c2c?q=80&w=500&auto=format&fit=crop',
      category: 'Outerwear',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black', 'Gray'],
      inStock: true
    },
    {
      id: '14',
      name: 'Minimalist Bomber',
      description: 'Sleek matte finish with hidden utility pockets.',
      price: 210,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=500&auto=format&fit=crop',
      category: 'Outerwear',
      sizes: ['S', 'M', 'L'],
      colors: ['Black', 'Blue'],
      inStock: true
    },
    {
      id: '15',
      name: 'Overcoat in Charcoal',
      description: 'Longline wool-blend coat for extreme cold protection.',
      price: 380,
      image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=500&auto=format&fit=crop',
      category: 'Outerwear',
      sizes: ['L', 'XL', '2XL'],
      colors: ['Gray'],
      inStock: true
    },
    {
      id: '16',
      name: 'Technical Windbreaker',
      description: 'Water-resistant outer shell with mesh lining.',
      price: 145,
      image: 'https://images.unsplash.com/photo-1544923246-77307dd654ca?q=80&w=500&auto=format&fit=crop',
      category: 'Outerwear',
      sizes: ['S', 'M', 'L'],
      colors: ['Blue', 'Black'],
      inStock: false
    },

    // --- ADDITIONAL FOR FILTER TESTING ---
    {
      id: '17',
      name: 'Nightshade Hoodie',
      description: 'Heavy fleece hoodie with brushed interior.',
      price: 115,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500&auto=format&fit=crop',
      category: 'Basics',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black'],
      inStock: true
    },
    {
      id: '18',
      name: 'Sandstone Chinos',
      description: 'Slim-tapered fit with comfort stretch fabric.',
      price: 140,
      image: 'https://images.unsplash.com/photo-1473966968600-fa804b86862b?q=80&w=500&auto=format&fit=crop',
      category: 'Basics',
      sizes: ['S', 'M', 'L'],
      colors: ['Gray'],
      inStock: true
    },
    {
      id: '19',
      name: 'Stealth Cargo Pants',
      description: 'Technical multi-pocket trousers for urban exploration.',
      price: 175,
      image: 'https://images.unsplash.com/photo-1624371414361-e6e8ea01c1e2?q=80&w=500&auto=format&fit=crop',
      category: 'Tops',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black'],
      inStock: true
    },
    {
      id: '20',
      name: 'Oxford Button Down',
      description: 'Classic crisp cotton Oxford for versatile styling.',
      price: 95,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=500&auto=format&fit=crop',
      category: 'Tops',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Blue'],
      inStock: true
    },
    {
      id: '21',
      name: 'Quilted Vest',
      description: 'Insulated mid-layer for lightweight warmth.',
      price: 135,
      image: 'https://images.unsplash.com/photo-1621072156002-e2fcced0b170?q=80&w=500&auto=format&fit=crop',
      category: 'Outerwear',
      sizes: ['M', 'L'],
      colors: ['Black'],
      inStock: true
    },
    {
      id: '22',
      name: 'Graphic Noir Tee',
      description: 'Limited edition high-density print graphic.',
      price: 75,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop',
      category: 'Basics',
      sizes: ['S', 'M', 'L'],
      colors: ['Black'],
      inStock: true
    },
    {
      id: '23',
      name: 'Shearling Trucker',
      description: 'Rugged aesthetic with faux shearling collar lining.',
      price: 245,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop',
      category: 'Outerwear',
      sizes: ['L', 'XL'],
      colors: ['Black', 'Gray'],
      inStock: true
    },
    {
      id: '24',
      name: 'Tailored Wool Trousers',
      description: 'Precision cut wool trousers with a permanent crease.',
      price: 210,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=500&auto=format&fit=crop',
      category: 'Premium',
      sizes: ['M', 'L'],
      colors: ['Gray', 'Black'],
      inStock: true
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product);
  }
}