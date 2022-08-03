import { ICustomer } from './customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService  {


  constructor(private http: HttpClient) { }

  private title = "Customers"
  private httpURLGet = `http://localhost:4200/api/customers/retrieve`
  private httpURLPost = `http://localhost:3000/api/customers/create`
  private httpURLPut = `http://localhost:3000/api/customers/update`
  
  private headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  
  
  getTitle() {
    return this.title;
  }
  
  getCustomers(): Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this.httpURLGet, {'headers':this.headers});
  }


  createCustomer(customer: ICustomer) { 
    this.http.post(`http://localhost:4200/api/customers/create`,customer).subscribe()
  }

  getCustomerByIndex(index:number): Observable<ICustomer>{
    return this.http.get<ICustomer>(this.httpURLGet+"/"+index, {'headers':this.headers});
  }

  updateCustomer(product: ICustomer, index:number) {
    return this.http.put<ICustomer>(this.httpURLPut + "/" + index, product).subscribe()
  }

}