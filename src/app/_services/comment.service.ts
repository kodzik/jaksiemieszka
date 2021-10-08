import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IComment } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // comment: Comment

  private commentSource = new Subject<IComment>();
  highlightedComment = this.commentSource.asObservable();

  private newCommentSource = new Subject<IComment>();
  newComment = this.newCommentSource.asObservable();
  
  constructor() { }

  addnewComment(comment: IComment){
    console.log("Comment service, new comment:", comment);
    this.newCommentSource.next(comment);
  }

  // addComment(location: { lng: number; lat: number; }){
  //   const comment: IComment = <IComment>{
  //     id = '124'
  //     date = new Date();
  //     username = 'Marjan'
  //     comment.location = {lat: location.lat, lng: location.lng};
  //   }

  //   this.newCommentSource.next(comment)
  //   // console.log("New comment", comment);
  // }

  highlightMarker(comment: IComment) {
    this.commentSource.next(comment)
  }
}
