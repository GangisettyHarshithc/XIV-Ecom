import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';

  constructor(private router: Router) {}

  ngOnInit() {
    // This listens to every single page change in your app
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        
        // 1. Try scrolling the standard browser window
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        
        // 2. Try scrolling the raw HTML/Body elements
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // 3. THE MAGIC BULLET: Try scrolling the custom layout wrappers
        // Because we locked the screen height to 100vh in the global styles,
        // the scrollbar is actually attached to an internal div, not the window!
        const wrappers = document.querySelectorAll('.cart-items-column, .checkout__main-flow, div, main, section');
        
        wrappers.forEach(wrapper => {
          // If the element has a scrollbar and is scrolled down, reset it to the top
          if (wrapper.scrollTop > 0) {
            wrapper.scrollTop = 0;
          }
        });
        
      }
    });
  }
}