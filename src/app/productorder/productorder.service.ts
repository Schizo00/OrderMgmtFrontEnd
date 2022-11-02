import { IProductOrder } from './../productorder/productorder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  
  constructor(private http: HttpClient) {}

  private title = "Product Orders"
  private products = ["product1", "product2", "product3"]
  private httpURLGet = `http://localhost:4200/api/productorders/retrieve`
  private httpURLPost = `http://localhost:3000/api/productorders/create`
  private httpURLPut = `http://localhost:3000/api/productorders/update`
  private httpURLDelete = `http://localhost:3000/api/productorders/delete`
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  
  
  getTitle() {
    return this.title;
  }
  
  getProductOrders(): Observable<IProductOrder[]>{
    return this.http.get<IProductOrder[]>(this.httpURLGet, {'headers':this.headers});
  }

  getProductOrderByIndex(index:number): Observable<IProductOrder>{
    return this.http.get<IProductOrder>(this.httpURLGet+"/"+index, {'headers':this.headers});
  }

  createProductOrder(product: IProductOrder) { 
    console.log("Inside create func")
    return this.http.post<IProductOrder>(this.httpURLPost, product).subscribe()
  }

  updateProductOrder(product: IProductOrder, index:number) {
    return this.http.put<IProductOrder>(this.httpURLPut + "/" + index, product).subscribe()
  }

  deleteProductOrder(index:number) {
    return this.http.delete<IProductOrder>(this.httpURLDelete + "/" + index).subscribe()
  }
}
