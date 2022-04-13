import { Component, OnInit } from '@angular/core';
import { IComment } from 'src/app/_models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  comment: IComment;

  constructor() { }

  ngOnInit(): void {
  }


}
