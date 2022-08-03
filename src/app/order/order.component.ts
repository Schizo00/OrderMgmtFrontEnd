import { CustomerService } from './../customer/customer.service';
import { OrderService } from './order.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IOrder } from './order';
import { ICustomer } from '../customer/customer';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders:IOrder[] = []
  public customers:ICustomer[] = []
  // name = "Angular " + VERSION.major;
  @ViewChild("order_id") order_id!: ElementRef;
  @ViewChild("cust_id") cust_id!: ElementRef;

  constructor(private service: OrderService, private custService: CustomerService) { 

    
    //this.obj = (service.getProducts() as any);
    console.log(this.orders)
    this.title = service.getTitle();
    this.modalTitle = "Create Customer"
    this.orderIndex = "Default"
  }

  
  public title: string
  public modalTitle: string
  public orderIndex: any;
  public isCreate = true;
  
  ngOnInit(): void {
    console.log("Logged to console!")
    this.service.getOrders().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.orders.push(data[i])
        }
      })
    this.custService.getCustomers().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.customers.push(data[i])
        }
      }
    )


    console.log("Customers: ", this.customers)
    }

  ngOnDestroy() : void {
    console.log("Deleted from console")
  }

  
  onEdit(originalIndex: number) {
    this.orderIndex  = originalIndex
    this.modalTitle = "Edit Customer"
    this.service.getOrderByIndex(originalIndex).subscribe(data => console.log(data))
    this.isCreate = false
    console.log(this.orderIndex)
  }

afterEdit(originalIndex: number) {
  var order: IOrder = {
    CustID: parseInt(this.cust_id.nativeElement.value),
    Total: 0,
    OrderID: 0
  }
  
  console.log("Edited Order by Order ID: ", originalIndex)
  this.service.updateOrder(order, originalIndex)
  
}

onDelete(originalIndex: number) {
  console.log("Deleted Order by Order ID: ", originalIndex)
  this.service.deleteOrder(originalIndex)
}

onCreate() {
  this.isCreate = true
  this.modalTitle = "Create Order"
  this.orderIndex = "Default"
}

afterCreate() {
  this.modalTitle = "Create Order"
  console.log("Order ID: ", this.order_id)
  var order: IOrder = {
    CustID: parseInt(this.cust_id.nativeElement.value),
    Total: 0,
    OrderID: 0
  }
  console.log("CUSTOMER ID: ", this.cust_id.nativeElement.value)
  this.service.createOrder(order)

}

submitButton() {
  if (this.isCreate == true) {
    this.afterCreate()
  } else {
    this.afterEdit(this.orderIndex)
  }
}

}