import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // mobile: any;

  constructor() { }

  ngOnInit(): void {
    // if (window.screen.width <= 769) { // 768px portrait
    //   // this.mobile = true;
    // }

  // Checks if screen size is less than 1024 pixels
  // const checkScreenSize = () => document.body.offsetWidth < 1024;

  // Create observable from window resize event throttled so only fires every 500ms
  // const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(checkScreenSize));  
  // Start off with the initial value use the isScreenSmall$ | async in the
  // view to get both the original value and the new value after resize.
  // this.mobile = screenSizeChanged$.pipe(startWith(checkScreenSize()))
  }

}
