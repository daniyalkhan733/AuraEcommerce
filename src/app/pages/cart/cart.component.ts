import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('itemRemove', [
      transition(':leave', [
        animate('0.5s ease-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0.5, transform: 'translateX(15px)', offset: 0.3 }),
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  get subtotal(): number {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce((acc, item) => {
      if (item.product && item.product.price) {
        return acc + (item.product.price * item.quantity);
      }
      return acc;
    }, 0);
  }

  get total(): number {
    // In a real app, you might add shipping, taxes, etc.
    return this.subtotal;
  }

  increaseQuantity(itemId: string, quantity: number): void {
    this.cartService.updateCartItem(itemId, quantity + 1).subscribe();
  }

  decreaseQuantity(itemId: string, quantity: number): void {
    if (quantity > 1) {
      this.cartService.updateCartItem(itemId, quantity - 1).subscribe();
    } else {
      this.removeFromCart(itemId);
    }
  }

  removeFromCart(itemId: string): void {
    this.cartService.removeFromCart(itemId).subscribe();
  }
}
