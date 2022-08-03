import { IOrder } from './order';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class OrderService  {
  
    constructor(private http: HttpClient) { }
  
    private title = "Orders"
    private products = ["product1", "product2", "product3"]
    private httpURLGet = `http://localhost:4200/api/orders/retrieve`
    private httpURLPost = `http://localhost:4200/api/orders/create`
    private httpURLPut = `http://localhost:4200/api/orders/update`
    private httpURLDelete = `http://localhost:4200/api/orders/delete`
    
    private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    
    
    getTitle() {
      return this.title;
    }
    
    getOrders(): Observable<IOrder[]>{
      return this.http.get<IOrder[]>(this.httpURLGet, {'headers':this.headers});
    }

    createOrder(order: IOrder) { 
      this.http.post<IOrder>(this.httpURLPost,order).subscribe()
    }

    getOrderByIndex(index:number): Observable<IOrder>{
      return this.http.get<IOrder>(this.httpURLGet+"/"+index, {'headers':this.headers});
    }
  
    updateOrder(product: IOrder, index:number) {
      return this.http.put<IOrder>(this.httpURLPut + "/" + index, product).subscribe()
    }

    deleteOrder(index:number) {
      return this.http.delete<IOrder>(this.httpURLDelete + "/" + index).subscribe()
    }
  
}
