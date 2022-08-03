import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICustomer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customers:ICustomer[]= [];

  // name = "Angular " + VERSION.major;
  @ViewChild("customer_name") customer_name!: ElementRef;
  @ViewChild("email") email!: ElementRef;

  constructor(private service: CustomerService) { 
    //this.obj = (service.getProducts() as any);
    console.log(this.customers)
    this.title = service.getTitle();
    this.modalTitle = "Create Customer"
    this.custIndex = "Default"
  }

  
  public title: string
  public modalTitle: string
  public custIndex: any;
  public isCreate = true;
  
  ngOnInit(): void {
    console.log("Logged to console!")
    this.service.getCustomers().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.customers.push(data[i])
        }
      })
    }

  ngOnDestroy() : void {
    console.log("Deleted from console")
  }

  
  onEdit(originalIndex: number) {
    this.custIndex  = originalIndex
    this.modalTitle = "Edit Customer"
    this.service.getCustomerByIndex(originalIndex).subscribe(data => console.log(data))
    this.isCreate = false
    console.log(this.custIndex)
  }

afterEdit(originalIndex: number) {
  var customer: ICustomer = {
    Name: this.customer_name.nativeElement.value,
    Email: this.email.nativeElement.value,
    CustID: 0
  }
  
  console.log("Edited Product by Customer ID: ", originalIndex)
  this.service.updateCustomer(customer, originalIndex)
  
}

onDelete(originalIndex: number) {
  console.log("Deleted Product by Product ID: ", originalIndex)
}

onCreate() {
  this.isCreate = true
  this.modalTitle = "Create Customer"
  this.custIndex = "Default"
}

afterCreate() {
  this.modalTitle = "Create Customer"
  console.log("Customer Name: ", this.customer_name)
  var customer: ICustomer = {
    Name: this.customer_name.nativeElement.value,
    Email: this.email.nativeElement.value,
    CustID: 0
  }

  console.log(this.customer_name.nativeElement.value)
  console.log(typeof this.email.nativeElement.value)
  this.service.createCustomer(customer)

}

submitButton() {
  if (this.isCreate == true) {
    this.afterCreate()
  } else {
    this.afterEdit(this.custIndex)
  }
}

}
