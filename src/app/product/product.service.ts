import { IProduct } from './../product/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  constructor(private http: HttpClient) { }

  private title = "Products"
  private products = ["product1", "product2", "product3"]
  private httpURLGet = `http://localhost:4200/api/products/retrieve`
  private httpURLPost = `http://localhost:3000/api/products/create`
  private httpURLPut = `http://localhost:3000/api/products/update`
  private httpURLDelete = `http://localhost:3000/api/products/delete`
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  
  
  getTitle() {
    return this.title;
  }
  
  getProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.httpURLGet, {'headers':this.headers});
  }

  getProductByIndex(index:number): Observable<IProduct>{
    return this.http.get<IProduct>(this.httpURLGet+"/"+index, {'headers':this.headers});
  }

  createProduct(product: IProduct) { 
    console.log("Inside create func")
    return this.http.post<IProduct>(this.httpURLPost, product).subscribe()
  }

  updateProduct(product: IProduct, index:number) {
    return this.http.put<IProduct>(this.httpURLPut + "/" + index, product).subscribe()
  }

  deleteProduct(index:number) {
    return this.http.delete<IProduct>(this.httpURLDelete + "/" + index).subscribe()
  }

  

}
