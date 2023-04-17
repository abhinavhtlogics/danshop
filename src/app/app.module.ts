import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsComponent } from './products/products.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponentComponent } from './cart-component/cart-component.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    ProductDetailsComponent,
    HomepageComponent,
    CartComponentComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    GraphQLModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    
    BrowserAnimationsModule,
         AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

