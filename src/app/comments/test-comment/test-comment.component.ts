import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/_models/comment';

@Component({
  selector: 'app-test-comment',
  templateUrl: './test-comment.component.html',
  styleUrls: ['./test-comment.component.scss']
})
export class TestCommentComponent implements OnInit {

  @Input() comment: IComment;
  rating: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
