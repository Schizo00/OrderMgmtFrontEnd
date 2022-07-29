import { ProductInterface } from './../product';
import { ProductService } from './product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  public products:ProductInterface[]= [];

  constructor(private service: ProductService) { 
    //this.obj = (service.getProducts() as any);
    console.log(this.products)
    this.title = service.getTitle();
    
  }

  
  title;
  
  ngOnInit(): void {
    console.log("Logged to console!")
    this.service.getProducts().subscribe(
      (data) => {
        console.log('Data', data)
      })
    }

    ProductInterface 

  ngOnDestroy() : void {
    console.log("Deleted from console")
  }

}
