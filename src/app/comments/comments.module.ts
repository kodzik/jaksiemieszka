import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsRoutingModule } from './comments-routing.module';

import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from '././comments/comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

import { SharedModule } from '../_shared/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    CommentComponent,
    CommentsComponent,
    AddCommentComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    CommentsRoutingModule,
  ],
  exports:[
    CommentsComponent,
    AddCommentComponent
    // SharedModule
  ]
})
export class CommentsModule { }
