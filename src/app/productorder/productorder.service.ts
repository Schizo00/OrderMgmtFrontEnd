import { IProductOrder } from './../productorder/productorder';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  
  constructor(private http: HttpClient) {}

  private httpURL = `http://localhost:4200/api/productorders/retrieve`
  private title = "Product Orders"


  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  

  getTitle() {
    return this.title;
  }
  getProductOrders(): Observable<IProductOrder[]>{
    return this.http.get<IProductOrder[]>(this.httpURL, {'headers':this.headers});
  }

  
  createProductOrders(productOrder: IProductOrder) { 
    this.http.post(`http://localhost:4200/api/productorders/create`,productOrder).subscribe()
  }
}
