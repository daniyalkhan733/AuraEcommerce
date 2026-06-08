import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AuraEcommerce_Angular';
  cartCount = 0;
  currentUser: User | null = null;

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
    // Subscribe to cart changes
    this.cartService.getCart().subscribe(cart => {
      this.cartCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;
    });

    // Subscribe to auth state changes for proper synchronization
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
