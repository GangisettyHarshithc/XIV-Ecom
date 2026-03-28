import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { FilterCriteria } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-filter-sidebar',
  standalone: true,
  imports: [CommonModule, SliderModule, FormsModule],
  templateUrl: './product-filter-sidebar.component.html',
  styleUrls: ['./product-filter-sidebar.component.scss'],
})
export class ProductFilterSidebarComponent {
  @Output() filtersChange = new EventEmitter<FilterCriteria>();

  priceRange: [number, number] = [0, 200];

  filters: FilterCriteria = {
    sizes: [],
    availability: [],
    categories: [],
    colors: [],
    priceRange: [0, 200],
  };

  toggleSize(size: string): void {
    const index = this.filters.sizes.indexOf(size);
    if (index > -1) {
      this.filters.sizes.splice(index, 1);
    } else {
      this.filters.sizes.push(size);
    }
    this.onFilterChange();
  }

  toggleColor(colorValue: string): void {
    const index = this.filters.colors.indexOf(colorValue);
    if (index > -1) {
      this.filters.colors.splice(index, 1);
    } else {
      this.filters.colors.push(colorValue);
    }
    this.onFilterChange();
  }

  toggleAvailability(status: string): void {
    const index = this.filters.availability.indexOf(status);
    if (index > -1) {
      this.filters.availability.splice(index, 1);
    } else {
      this.filters.availability.push(status);
    }
    this.onFilterChange();
  }

  selectCategory(category: string): void {
    const index = this.filters.categories.indexOf(category);
    if (index > -1) {
      this.filters.categories = []; // Deselect if already active
    } else {
      this.filters.categories = [category];
    }
    this.onFilterChange();
  }

  onClearAll(): void {
    this.filters = {
      sizes: [],
      availability: [],
      categories: [],
      colors: [],
      priceRange: [0, 200],
    };
    this.priceRange = [0, 200];
    this.onFilterChange();
  }

 // Replace your existing onFilterChange with this exact version
onFilterChange(): void {
  // 1. Sync the priceRange tuple into the filters object
  // We use spread [...] to create a fresh copy of the array
  this.filters.priceRange = [...this.priceRange] as [number, number];

  // 2. Emit a fresh copy of the entire filters object
  // This "shouts" to the parent component that something changed
  this.filtersChange.emit({ ...this.filters });
  
  // Optional: Debugging - Remove this once it works
  console.log('Filters Emitted:', this.filters);
}

  isSelected(type: 'sizes' | 'colors' | 'categories', value: string): boolean {
    return this.filters[type].includes(value);
  }
}