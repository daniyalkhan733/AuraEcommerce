import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('cardStagger', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              transform: 'translateY(50px)'
            }),
            stagger('100ms', [
              animate(
                '500ms ease-out',
                style({
                  opacity: 1,
                  transform: 'translateY(0)'
                })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  addingToCart: { [key: string]: boolean } = {};
  addedToCart: { [key: string]: boolean } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: (error) => {
        console.error('Failed to load products', error);
      }
    });
  }

  search(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }

  scrollToProducts(): void {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  addToCart(product: Product): void {
    if (this.addingToCart[product._id]) return;

    this.addingToCart[product._id] = true;
    
    this.cartService.addToCart(product._id).subscribe({
      next: () => {
        this.addingToCart[product._id] = false;
        this.addedToCart[product._id] = true;
        
        // Reset "Added" state after 2 seconds
        setTimeout(() => {
          this.addedToCart[product._id] = false;
        }, 2000);
      },
      error: (error) => {
        this.addingToCart[product._id] = false;
        console.error('Failed to add product to cart', error);
      }
    });
  }
}