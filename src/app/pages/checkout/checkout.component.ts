import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  submitted = false;
  orderPlaced = false;
  cart: Cart | null = null;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      customerName: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
    });
  }

  get f() { return this.checkoutForm.controls; }

  get subtotal(): number {
    return this.cart?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;
  }

  get total(): number {
    return this.subtotal;
  }

  onSubmit() {
    this.submitted = true;
    if (this.checkoutForm.invalid) {
      return;
    }

    const orderDetails = {
      ...this.checkoutForm.value,
      items: this.cart?.items,
      total: this.total
    };

    this.orderService.createOrder(orderDetails).subscribe(() => {
      this.orderPlaced = true;
      this.cartService.loadCart(); // Refresh cart
      setTimeout(() => this.router.navigate(['/products']), 3000);
    });
  }
}
