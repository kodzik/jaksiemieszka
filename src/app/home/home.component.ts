import { Component, OnInit } from '@angular/core';
import { commentsView } from '../comments/commentsView';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  commentsView: commentsView;
  showDistricts: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  changeViewCallback($event: commentsView) {
    this.commentsView = $event
  }

  toggleDistrictLayer($event: boolean){
    this.showDistricts = $event;
  }

}
