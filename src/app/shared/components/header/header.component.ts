import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cartservice';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchModalComponent, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(SearchModalComponent) searchModal!: SearchModalComponent;

  cartItemCount = 0;
  private cartSub!: Subscription;

  navLinks = [
    { label: 'INDEX', route: '/' },
    { label: 'COLLECTION', route: '/catalog' }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Listen to the Cart Service stream
    this.cartSub = this.cartService.cart$.subscribe((items) => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  onSearch(): void {
    this.searchModal.toggle(); 
  }
}