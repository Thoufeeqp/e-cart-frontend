import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import {HttpClientModule}from '@angular/common/http';
import { ViewComponent } from './view/view.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PaymentComponent } from './payment/payment.component'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    ProductsComponent,
    AllproductsComponent,
    
    WishlistComponent,
    CartComponent,
    ViewComponent,
    FilterPipe,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule

  ]
})
export class ProductsModule { }
