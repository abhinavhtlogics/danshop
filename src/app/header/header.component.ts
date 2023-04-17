import { Component } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { CartService } from '../CartService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cart: CartItem[] = [];
  constructor(private cartService: CartService,private toastrService: ToastrService){
    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }
  abc=['test','test3'];

 
   
    
    
   


  onRemoveCart(event:any): void {
   
    const indexId = Number((event.target as Element).getAttribute('data-indexId'));

    // To remove the item at index 2
this.cart.splice(indexId, 1);
this.cartService.clearCartSpecificId(indexId);

this.cart=this.cartService.getCart();
this.toastrService.error('Product Removed From Cart', 'Success!');
  }
}
