import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  _time;
  get time() {
    return this._time;
  }

  constructor(private zone: NgZone) {
    this._time = Date.now();

    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this._time = Date.now();
      }, 1);
    });
  }
}

// Whenever we click the button CD will run. Also the set interval is an asynchronous call for which Angular runs the CD for every 1ms. Let say we have 100 components and when CD runs then all those 100 components will be checked which is a performance degradation. Hence we move this task outside of angular zone where angular doesn't know that the value of _time is changed and it need to run the CD. Now when we click on the button Angular runs CD and the latest value of _time is reflected in the view.

// Try answering these
// What happens if we remove the runOutsideAngular() ?
// Is there a way to implement a real time clock ?
// Why do we need to to add Date.now() in setInterval ?
