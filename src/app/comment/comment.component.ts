import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../_models/comment';
import { CommentService } from '../_services/comment.service';
import { MarkerService } from '../_services/marker.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  
  @Input() comment: Comment; //= {id:'1', username: 'asd', date:'6/15/19, 10:54 PM'};

  changeText: boolean;

  constructor(
    private markerService: MarkerService,
    private commentService: CommentService
    ) { }

  ngOnInit(): void {
  }

  highlightMarker() {
    this.commentService.highlightMarker( this.comment )
  }
}
