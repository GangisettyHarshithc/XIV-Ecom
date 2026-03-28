import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
// Adjust this path to point exactly to your AuthService
import { AuthService } from '../services/auth.service'; 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // We look at the current user state
  return authService.getCurrentUser().pipe(
    take(1), // We only need to check the status once per route change
    map(user => {
      if (user) {
        return true; // The user is logged in. Open the gate.
      } else {
        // The user is a ghost. Redirect them to the login page.
        router.navigate(['/login']);
        return false; 
      }
    })
  );
};