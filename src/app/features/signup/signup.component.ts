import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// Make sure this path points to YOUR auth service
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'] // Reusing our premium styles
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Updated to match your user object structure
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // YOUR SERVICE: Passes the whole object { firstName, lastName, email, password }
    this.authService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/']); // Go home on success
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
}