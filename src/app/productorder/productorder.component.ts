import { IProductOrder } from './productorder';
import { ProductOrderService } from './productorder.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-productorder',
  templateUrl: './productorder.component.html',
  styleUrls: ['./productorder.component.css']
})
export class ProductOrderComponent implements OnInit, OnDestroy {
  public productOrders:IProductOrder[]= [];

  constructor(private service: ProductOrderService) { 
    //this.obj = (service.getProducts() as any);
    console.log(this.productOrders)
    this.title = service.getTitle();
    
  }

  public title: string
  
  ngOnInit(): void {
    console.log("Product Orders!")
    this.service.getProductOrders().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.productOrders.push(data[i])
        }
      })
      
    }

  ngOnDestroy() : void {
    console.log("Deleted from console")
  }

}
