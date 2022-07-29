import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_test';

  showing : boolean = false;

  hideComponent() {
    if (this.showing == true) {
      this.showing = false;
    } else {
      this.showing = true;
    }
  }


}
