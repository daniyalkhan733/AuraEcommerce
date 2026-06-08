import { CartItem } from "./cart-item.model";

export interface Order {
    _id: string;
    customerName: string;
    address: string;
    mobile: string;
    items: CartItem[];
    total: number;
    createdAt: Date;
}
