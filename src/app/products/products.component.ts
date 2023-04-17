import { Component,OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from "@angular/common";
import {gql, Apollo} from 'apollo-angular';
import { Product } from '../models/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../CartService';
import { CartItem } from '../models/CartItem';
import { ToastrService } from 'ngx-toastr';

const Get_Products = gql`
query{
  products {
    items {
      id
      name
      featuredAsset{
        source
      }
      variants{
        id
        price
        
      }
     
    }
  }
}
`;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
changeDetection: ChangeDetectionStrategy.Default
})


 
export class ProductsComponent implements OnInit {

  allProducts:Product[]=[];
  abc=['test','test3'];

  //cart: CartItem[] = [];
 
  customOptions: OwlOptions = {
    
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      
      },
      400: {
        items: 2,
        
      },
      740: {
        items: 3,
        
      },
      940: {
        items: 5,
        
      }
    },
    nav: true
  }
  product: { id: number; name: string; price: number } = {
    id: 1,
    name: 'Product 1',
    price: 10
  };

  constructor(private apollo: Apollo,private cartService: CartService,private toastrService: ToastrService){
    // this.cart = this.cartService.getCart();
    // console.log(this.cart);
  }
  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: Get_Products
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      console.log(loading);
      this.allProducts = data.products.items;
      console.log("hello");
      console.log(data);
       console.log(data.products.items);
       console.log(this.allProducts);
      // console.log(data.products.items);
      // console.log(this.allProducts);
     // console.log();
    })
  }

  onAddToCart(event:any): void {
    console.log('working cart');
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
   this.toastrService.success('Product Added to Cart', 'Success!');
   
    
  }
}
