import { ProductInterface } from './../product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  constructor(private http: HttpClient) { }

  private title = "Binding";
  private products = ["product1", "product2", "product3"]
  private httpURL = `http://localhost:4200/api/products/retrieve`
  
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  
  postId: any;
  data: any;
  
  getTitle() {
    return this.title;
  }
  
  getProducts(): Observable<ProductInterface[]>{
    return this.http.get<ProductInterface[]>(this.httpURL, {'headers':this.headers});
  }

  createProduct() { 
    this.http.post<ProductInterface>(`http://localhost:4200/api/products/create`, 
    { Name: "Prod10",
      Price: 1000}).subscribe(data => {
        this.postId = data;
    })
    console.log("Inside func")
    console.log(this.data)
    return this.data;
    
  }

  

}
