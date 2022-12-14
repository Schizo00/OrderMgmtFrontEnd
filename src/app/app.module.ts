import { ProductService } from './product/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';

import { HttpClientModule} from '@angular/common/http';
import { CustomerComponent } from './customer/customer.component';
import { ProductOrderComponent } from './productorder/productorder.component';
import { OrderComponent } from './order/order.component'

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CustomerComponent,
    ProductOrderComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
