export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export interface FilterCriteria {
  sizes: string[];
  availability: string[];
  categories: string[];
  colors: string[];
  priceRange: [number, number];
}