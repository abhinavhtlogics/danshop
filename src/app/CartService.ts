import { Injectable } from '@angular/core';
import { CartItem } from './models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private cart: CartItem[] = [];

  constructor() {
    // load the cart data from local storage
    const storedCart = localStorage.getItem(this.cartKey);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  addToCart(item: CartItem): void {
    const index = this.cart.findIndex((i) => i.id === item.id);
    if (index > -1) {
      this.cart[index].quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }


  quantMinus(item: CartItem): void {
    const index = this.cart.findIndex((i) => i.id === item.id);
    if (index > -1) {
      this.cart[index].quantity -= item.quantity;
    } 
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem(this.cartKey);
  }
  clearCartSpecificId(id:any) {

    this.cart = this.cart.filter(cart => cart.id !== id);
    console.log(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
