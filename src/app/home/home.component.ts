import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CommentService } from '../_services/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() headerTemplate: TemplateRef<any>; // Custom template provided by parent
  template: TemplateRef<any>;

  windowIndex: number = 0;

  constructor(private cmtService: CommentService) { }

  ngOnInit(): void {
    this.cmtService.newComment.subscribe(cmt => {
      this.windowIndex = 0
    })
  }

  switchWindow(){
    this.windowIndex = (this.windowIndex + 1)%2;
  }

}
