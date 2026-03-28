import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router'; // 1. Added withInMemoryScrolling
import { routes } from './app.routes';

// Import the new PrimeNG configuration tools
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes, 
      // 2. This logic restores scroll to top on every navigation
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled' 
      })
    ),
    
    // Setup the new Theme system
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
            darkModeSelector: false, // Optional: Keeps it in Light Mode for Apple tier look
            ripple: true
        }
      }
    })
  ]
};