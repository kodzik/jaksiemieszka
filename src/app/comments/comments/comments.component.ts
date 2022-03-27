import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/_models/comment';
import { environment } from 'src/environments/environment';
import { CommentService } from '../../_services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent implements OnInit {

  comments: IComment[] = [];

  constructor(
    private commentService: CommentService,
    // private http: HttpClient
    ) {
  }

  ngOnInit(): void {

    // this.commentService.newComment.subscribe(comment => {
    //   console.warn("nowe komcie:", comment);
      
    //   this.comments.push(comment);
    // });

    // this.comments = this.commentService.comments //<========= TO MA WRÓCIĆ

    // this.comments.push({ id: '1', username:'Superman', date: new Date(), location: {lat: 52.223142679517, lng: 20.910263299484} });
    // this.getComments()
  }

  // getComments(): void{
  //   this.http.get(environment.appUrl + '/assets/comments.json').subscribe(comments => {
  //     this.addComments(comments)
  //   })
  // }

  addComments(comments: any): void{
    console.log(comments);
    this.comments = comments.Comments
  }
}

