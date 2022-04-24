import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
    this.changeView = commentsView.View;    
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.changeView = changes.changeView.currentValue
  // }

  changeViewCallback(ev: commentsView){
    this.changeView = ev;
  }

  onChangeButton(){
    this.changeView = (this.changeView + 1)%2;
  }

}
