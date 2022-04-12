import { Component, OnInit } from '@angular/core';
import { IComment } from 'src/app/_models/comment';
import { CommentService } from '../../_services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  comments: IComment[] = [];

  constructor(private cmtService: CommentService) {}

  ngOnInit(): void {
    this.cmtService.getComments();

    this.cmtService.newComment.subscribe(comment => {
      this.comments.push(comment)
      console.log(comment);
      
    });
  }

  scrollTo(e:any){
    const comment = document.getElementById('6da394f8-c4c8-4b6b-b567-e7691383621a')
    if(comment !== null){
      comment.scrollIntoView({behavior: 'smooth', inline: "center"});
    }
  }

}

