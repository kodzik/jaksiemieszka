import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Comment } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentSource = new Subject<Comment>();
  highlightedComment = this.commentSource.asObservable();

  private newCommentSource = new Subject<Comment>();
  newComment = this.newCommentSource.asObservable();
  
  constructor() { }

  addnewComment(location: { lng: number; lat: number; }){
    let comment = new Comment
    comment.id = '124'
    comment.date = new Date();
    comment.username = 'Marjan'
    comment.location = {lat: location.lat, lng: location.lng};
    this.newCommentSource.next(comment)
    // console.log("New comment", comment);
  }

  highlightMarker(comment: Comment) {
    this.commentSource.next(comment)
  }
}
