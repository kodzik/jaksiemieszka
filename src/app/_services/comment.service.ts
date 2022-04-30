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
  loadingComments: boolean = false;

  private newCommentSource = new Subject<IComment>();
  newComment = this.newCommentSource.asObservable();//comments got from db
  
  constructor(private http: HttpClient ) {}

  getComments(): any{
    this.loadingComments = true;

    return this.http.get<IComment>(environment.apiUrl + '/api/comments/').subscribe((comments: any) => {
      comments.data.forEach((element: IComment) => {
        this.newCommentSource.next(element)
        this.loadingComments = false;
      });
    })
  }

  addNewComment(comment: IComment){
    this.http.post<IComment>(environment.apiUrl + '/api/comments/', comment).subscribe((response: any) => {
      console.log("Response:", response);
    })
  }


}
