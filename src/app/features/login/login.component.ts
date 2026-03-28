import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Adjust this path to point to YOUR auth.service.ts
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Snap to top when the page loads
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    // Initialize the secure form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    
    // Extract values from the form
    const { email, password } = this.loginForm.value;

    // Call YOUR AuthService
    this.authService.login(email, password).subscribe({
      next: () => {
        this.isSubmitting = false;
        // Navigate back to the home page upon successful login
        this.router.navigate(['/']); 
      },
      error: (err) => {
        this.isSubmitting = false;
        // Display a clean error message if login fails
        this.errorMessage = 'Invalid email or password. Please try again.';
        console.error('Login error:', err);
      }
    });
  }
}