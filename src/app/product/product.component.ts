import { IProduct } from './../product/product';
import { ProductService } from './product.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, VERSION } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  public products:IProduct[]= [];
  // name = "Angular " + VERSION.major;
  @ViewChild("product_name") product_name!: ElementRef;
  @ViewChild("price") price!: ElementRef;
  constructor(private service: ProductService) { 
    //this.obj = (service.getProducts() as any);
    console.log(this.products)
    this.title = service.getTitle();
    this.modalTitle = "Create Product"
    this.prodIndex = "Default"
  }

  
  public title: string
  public modalTitle: string
  public prodIndex: any;
  public isCreate = true;
  
  ngOnInit(): void {
    console.log("Logged to console!")
    this.service.getProducts().subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          this.products.push(data[i])
        }
      })
    }

  ngOnDestroy() : void {
    console.log("Deleted from console")
  }

  onEdit(originalIndex: number) {
      this.prodIndex  = originalIndex
      this.modalTitle = "Edit Product"
      this.service.getProductByIndex(originalIndex).subscribe(data => console.log(data))
      this.isCreate = false
    }

  afterEdit(originalIndex: number) {
    var product: IProduct = {
      Name: this.product_name.nativeElement.value, 
      Price: parseInt(this.price.nativeElement.value),
      ProductID: 0
    }
    
    console.log("Edited Product by Product ID: ", originalIndex)
    this.service.updateProduct(product, originalIndex)
    this.isCreate = true
    
}
  

  onDelete(originalIndex: number) {
    this.service.deleteProduct(originalIndex)
    console.log("Deleted Product by Product ID: ", originalIndex)
  }

  onCreate() {
    this.isCreate = true
    this.modalTitle = "Create Product"
    this.prodIndex = "Default"
  }

  afterCreate() {
    this.modalTitle = "Create Product"
    console.log("prodcut name: ", this.product_name)
    var product: IProduct = {
      Name: this.product_name.nativeElement.value, 
      Price: parseInt(this.price.nativeElement.value),
      ProductID: 0
    }

    console.log(this.product_name.nativeElement.value)
    console.log(typeof this.price.nativeElement.value)
    this.service.createProduct(product)
    this.isCreate = false

  }

  submitButton() {
    if (this.isCreate == true) {
      this.afterCreate()
    } else {
      this.afterEdit(this.prodIndex)
    }
  }

}
