import { OrderService } from './../order/order.service';
import { IOrder } from './../order/order';
import { ProductService } from './../product/product.service';
import { IProduct } from './../product/product';
import { IProductOrder } from './productorder';
import { ProductOrderService } from './productorder.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-productorder',
  templateUrl: './productorder.component.html',
  styleUrls: ['./productorder.component.css']
})
export class ProductOrderComponent implements OnInit, OnDestroy {
  public productOrders:IProductOrder[]= [];
  public products:IProduct[]= [];
  public orders:IOrder[]= [];
  // name = "Angular " + VERSION.major;
  @ViewChild("product_id") product_id!: ElementRef;
  @ViewChild("order_id") order_id!: ElementRef;
  @ViewChild("quantity") quantity!: ElementRef;

  constructor(private service: ProductOrderService, private prodService: ProductService, private orderService: OrderService) { 
    //this.obj = (service.getProducts() as any);
    console.log(this.productOrders)
    this.title = service.getTitle();
    this.modalTitle = "Create Product Order"
    this.prodOrderIndex = "Default"
  }

  
  public title: string
  public modalTitle: string
  public prodOrderIndex: any;
  public isCreate = true;
  
  ngOnInit(): void {
    console.log("Logged to console!")
    this.service.getProductOrders().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.productOrders.push(data[i])
        }
      })

    this.prodService.getProducts().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.products.push(data[i])
        }
      })

    this.orderService.getOrders().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.orders.push(data[i])
        }
      })
  }

  ngOnDestroy() : void {
    console.log("Deleted from console")
  }

  onEdit(originalIndex: number) {
      this.prodOrderIndex  = originalIndex
      this.modalTitle = "Edit Product Order"
      this.service.getProductOrderByIndex(originalIndex).subscribe(data => console.log(data))
      this.isCreate = false
    }

  afterEdit(originalIndex: number) {
    var productOrder: IProductOrder = {
      OrderID: parseInt(this.order_id.nativeElement.value),
      ProductID: parseInt(this.product_id.nativeElement.value),
      ProductOrderID: 0,
      Quantity: parseInt(this.quantity.nativeElement.value),
      Price: 0,
      SubTotal: 0
    }
    
    console.log("Order ID: ", this.order_id.nativeElement.value)
    this.service.updateProductOrder(productOrder, originalIndex)
    this.isCreate = true
    
}
  

  onDelete(originalIndex: number) {
    this.service.deleteProductOrder(originalIndex)
    console.log("Deleted ProductOrder by ProductOrder ID: ", originalIndex)
  }

  onCreate() {
    this.isCreate = true
    this.modalTitle = "Create Product Order"
    this.prodOrderIndex = "Default"
  }

  afterCreate() {
    this.modalTitle = "Create Product Order"
    console.log("prodcut name: ", this.product_id)
    var productOrder: IProductOrder = {
      OrderID: parseInt(this.order_id.nativeElement.value),
      ProductID: parseInt(this.product_id.nativeElement.value),
      ProductOrderID: 0,
      Quantity: parseInt(this.quantity.nativeElement.value),
      Price: 0,
      SubTotal: 0
    }

    console.log(this.product_id.nativeElement.value)
    console.log(this.order_id.nativeElement.value)
    console.log(parseInt(this.product_id.nativeElement.value))
    this.service.createProductOrder(productOrder)
    this.isCreate = false

  }

  submitButton() {
    if (this.isCreate == true) {
      this.afterCreate()
    } else {
      this.afterEdit(this.prodOrderIndex)
    }
  }
}