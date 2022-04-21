import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from '../_models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  addComment: IComment

  // private commentSource = new Subject<IComment>();
  // highlightedComment = this.commentSource.asObservable();

  private newCommentSource = new Subject<IComment>();
  newComment = this.newCommentSource.asObservable();//comments got from db
  
  constructor(private http: HttpClient ) {}

  comments: IComment[] = [];

  getComments(): void{
    this.http.get<IComment>(environment.apiUrl + '/api/comments/').subscribe((comments: any) => {
      comments.data.forEach((element: IComment) => {
        this.newCommentSource.next(element)
      });
    })
  }

  addNewComment(comment: IComment){
    this.http.post<IComment>(environment.apiUrl + '/api/comments/', comment).subscribe((response: any) => {
      console.log("Response:", response);
    })
  }

  // highlightMarker(comment: IComment) {
  //   this.commentSource.next(comment)
  // }

  calculateAvgScore(comment: IComment): number{
    let index = 0;
    let avg = 0;

    Object.values(comment.rating).forEach(element => {
      avg += element;
      index+=1;
    })
    return (avg / index);
  }
}
