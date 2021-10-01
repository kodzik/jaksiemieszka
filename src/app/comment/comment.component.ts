import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../_models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  
  @Input() comment: Comment; //= {id:'1', username: 'asd', date:'6/15/19, 10:54 PM'};

  changeText: boolean;

  constructor( ) { }

  ngOnInit(): void {
  }

  showMarker(){
  }


}
