import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CComment, IComment } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // comment: Comment

  private commentSource = new Subject<IComment>();
  highlightedComment = this.commentSource.asObservable();

  private newCommentSource = new Subject<IComment>();
  newComment = this.newCommentSource.asObservable();
  
  // constructor() { }

  comments: IComment[] = [];

  addnewComment(comment: IComment){
    console.log("Comment service, new comment:", comment);
    this.newCommentSource.next(comment);
    this.comments.push(comment)
    // this.newCommentSource.next();
  }

  highlightMarker(comment: IComment) {
    this.commentSource.next(comment)
  }

  calculateAvgScore(comment: IComment): number{
    let index = 0;
    Object.values(comment.rating).forEach(element => {
      if(element != 0) {
        comment.avg += element;
        index+=1;
      }
    });
    return (comment.avg / index);
  }

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