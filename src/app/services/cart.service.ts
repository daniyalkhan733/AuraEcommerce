import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../models/cart.model';
import { GlobalConfig } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${GlobalConfig.apiUrl}/cart`;
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  loadCart() {
    this.http.get<Cart>(this.apiUrl).subscribe(cart => {
      this.cartSubject.next(cart);
    });
  }

  addToCart(productId: string, quantity: number = 1): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, { productId, quantity }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  removeFromCart(itemId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${itemId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }


  updateCartItem(itemId: string, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${itemId}`, { quantity }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  getCart() {
    return this.cart$;
  }
}

