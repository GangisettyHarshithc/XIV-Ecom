import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PopoverModule } from 'primeng/popover'; // THE FIX: Modern PrimeNG uses Popover
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, PopoverModule], // Updated array
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  user: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => { this.user = user; },
      error: () => { this.user = null; }
    });
  }

  logout(popover: any): void {
    popover.hide(); 
    
    this.authService.logout().subscribe({
      next: () => {
        this.user = null;
        this.router.navigate(['/']); 
      }
    });
  }
}