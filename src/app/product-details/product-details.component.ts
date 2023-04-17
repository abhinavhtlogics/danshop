import { Component } from '@angular/core';
import {gql, Apollo} from 'apollo-angular';
import { Productdetail } from '../models/productdetail';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../CartService';
import { CartItem } from '../models/CartItem';
import { ToastrService } from 'ngx-toastr';

const Get_Products = gql`
query{
  product(id:1) {
   
      id
      name
      description,
      featuredAsset{
        source
      }
      variants{
        id
        price
        sku,
        stockLevel
      }
     
    }
  
}
`;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
 // productDetail:Productdetail[]=[];
// productDetail={};
 productDetail="";
 id:"";
 
  product: { id: number; name: string; price: number,collections:[{name:string}],featuredAsset:{source:string},description:string,variants:[{price:number,sku:string,stockLevel:string}]  } = {
    id: 1,
    name: '',
    price: 10,
    collections:[{name:""}],
    featuredAsset:{
  source:"https://demo.vendure.io/assets/source/28/daniel-korpai-1302051-unsplash.jpg"
},
description:"",
variants:[{
  price:1,
  sku:"",
  stockLevel:""
  
}]
  };
  cart: CartItem[] = [];
  constructor(private apollo: Apollo,private _Activatedroute:ActivatedRoute,private cartService: CartService,private toastrService: ToastrService){
    this.id=this._Activatedroute.snapshot.params["id"];
    
    console.log(this.id);
    this.getData();

    this.cart = this.cartService.getCart();
    console.log(this.cart);
  }

  
 getData(){
    this.apollo.watchQuery<any>({
      query: gql`
      query{
        product(id:${this.id}) {
         
            id
            name
            description,
            collections{
              name
            },
            featuredAsset{
              source
            }
            variants{
              id
              price,
              sku,
              stockLevel
              
            }
           
          }
        
      }
      `
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      console.log(loading);
      this.product = data.product;
      console.log("hello");
      console.log(data);
      
       console.log(this.product);
      // console.log(data.products.items);
      // console.log(this.allProducts);
     // console.log();
    })
  }
  myFunction(event: MouseEvent) {
    event.preventDefault(); // prevent default behavior of the click event
  
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
    this.cartService.getCart();
    console.log('a');
   this.toastrService.success('Product Added to Cart', 'Success!');
   
    
  }

  onRemoveCart(event:any): void {
   
    const indexId = Number((event.target as Element).getAttribute('data-indexId'));

    // To remove the item at index 2
this.cart.splice(indexId, 1);
this.cartService.clearCartSpecificId(indexId);

this.cart=this.cartService.getCart();
this.toastrService.error('Product Removed From Cart', 'Success!');
  }

}
