import { Component } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { CartService } from '../CartService';
@Component({
  selector: 'inner-header-component',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.css']
})
export class InnerHeaderComponent {
  cart: CartItem[] = [];
  constructor(private cartService: CartService){
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }


  myFunction(event: MouseEvent) {
    const productId = Number((event.target as Element).getAttribute('data-productId'));
    const productPrice = Number((event.target as Element).getAttribute('data-productPrice'));
    const productName = String((event.target as Element).getAttribute('data-productName'));

    
    
    const cartItem: CartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1
    };
    this.cartService.addToCart(cartItem);
    console.log('a');
  
   
    
  }

  onCartDec(event: MouseEvent) {
    const productId = Number((event.target as Element).getAttribute('data-productId'));
    const productPrice = Number((event.target as Element).getAttribute('data-productPrice'));
    const productName = String((event.target as Element).getAttribute('data-productName'));

    
    
    const cartItem: CartItem = {
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1
    };
    this.cartService.quantMinus(cartItem);
    console.log('a');
  
   
    
  }



  onRemoveCart(event:any): void {
    event.preventDefault();
   
    const indexId = Number((event.target as Element).getAttribute('data-indexId'));

    // To remove the item at index 2
this.cart.splice(indexId, 1);
this.cartService.clearCartSpecificId(indexId);

this.cart=this.cartService.getCart();

  }
}
