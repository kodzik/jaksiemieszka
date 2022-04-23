import { Component, OnInit } from '@angular/core';
import { commentsView } from '../comments/commentsView';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  commentsView: commentsView;

  constructor() { }

  ngOnInit(): void {
  }

  changeViewEvent($event: commentsView) {
    this.commentsView = $event
  }

}
