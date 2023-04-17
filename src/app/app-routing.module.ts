import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponentComponent } from './cart-component/cart-component.component';

const routes: Routes = [
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponentComponent },
  { path: '', component: HomepageComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
