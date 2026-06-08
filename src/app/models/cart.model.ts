import { CartItem } from "./cart-item.model";

export interface Cart {
    _id: string;
    items: CartItem[];
    createdAt: Date;
  }
  