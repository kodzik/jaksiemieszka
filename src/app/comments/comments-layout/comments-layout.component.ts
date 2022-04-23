import { Component, Input, OnInit } from '@angular/core';
import { commentsView } from '../commentsView';

@Component({
  selector: 'app-comments-layout',
  templateUrl: './comments-layout.component.html',
  styleUrls: ['./comments-layout.component.scss']
})
export class CommentsLayoutComponent implements OnInit {

  @Input() changeView: commentsView;
  public commentsView = commentsView;

  constructor() { }

  ngOnInit(): void {
    this.changeView = commentsView.Add;    
  }

  changeViewCallback(ev: commentsView){
    this.changeView = ev;
  }

}
