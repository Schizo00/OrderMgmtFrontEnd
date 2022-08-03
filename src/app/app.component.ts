import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_test';

  showingProducts : boolean = false;
  showingCustomers : boolean = false;
  showingProductOrders : boolean = false;
  showingOrders : boolean = false;

  hideComponent(showing:boolean) {

    this.showingProducts = false;
    this.showingCustomers = false;
    this.showingProductOrders = false;
    this.showingOrders = false;

    if (showing == true) {
      showing = false;
    } else {
      showing = true;
    }

    console.log(showing)
    return showing
  }


}
