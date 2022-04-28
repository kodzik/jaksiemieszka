import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FabService } from 'src/app/fab/fab.service';
import { commentsView } from '../commentsView';

@Component({
  selector: 'app-comments-layout',
  templateUrl: './comments-layout.component.html',
  styleUrls: ['./comments-layout.component.scss']
})
export class CommentsLayoutComponent implements OnInit, OnDestroy {

  changeView: commentsView;
  public commentsView = commentsView;
  subFabserviceCommentsView: any;

  constructor(private fabService: FabService) { }

  ngOnInit(): void {
    this.changeView = commentsView.View;
    this.subFabserviceCommentsView = this.fabService.commentsView.subscribe(view => {
      this.changeView = view;
    })
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes.changeView.currentValue);
  // }

  // changeViewCallback(ev: commentsView){
  //   this.changeView = ev;
  // }

  // onChangeButton(){
  //   this.changeView = (this.changeView + 1)%2;
  // }

  ngOnDestroy(): void {
    this.subFabserviceCommentsView.unsubscribe();
  }

}
