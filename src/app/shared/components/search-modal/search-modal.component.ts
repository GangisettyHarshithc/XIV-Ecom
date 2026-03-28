import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ProgressSpinnerModule
  ],
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  
  visible = false;
  searchQuery = '';
  searchResults: any[] = [];
  recentSearches: string[] = [];
  isLoading = false;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadRecentSearches();
  }

  

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    this.isLoading = true;
    this.searchService.search(this.searchQuery).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.addToRecentSearches(this.searchQuery);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  addToRecentSearches(query: string): void {
    const filtered = this.recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase());
    this.recentSearches = [query, ...filtered].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
  }

  loadRecentSearches(): void {
    const stored = localStorage.getItem('recentSearches');
    this.recentSearches = stored ? JSON.parse(stored) : [];
  }

  selectRecentSearch(query: string): void {
    this.searchQuery = query;
    this.onSearch();
  }

  clearRecentSearches(): void {
    this.recentSearches = [];
    localStorage.removeItem('recentSearches');
  }

  // Replace your existing open() and close() methods with these:

  toggle(): void {
    this.visible = !this.visible;
    if (this.visible) {
      setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
      }, 100);
    } else {
      this.close();
    }
  }

  close(): void {
    this.visible = false;
    this.searchQuery = '';
    this.searchResults = [];
  }
  selectResult(result: any): void {
    console.log('Selected product:', result);
    this.close();
  }
}