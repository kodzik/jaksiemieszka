import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsRoutingModule } from './comments-routing.module';

import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from '././comments/comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

import { SharedModule } from '../_shared/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { FormHelpComponent } from './comment-form/form-help/form-help.component';


@NgModule({
  declarations: [
    CommentComponent,
    CommentsComponent,
    AddCommentComponent,
    LayoutComponent,
    CommentFormComponent,
    FormHelpComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,

    CommentsRoutingModule,
  ],
  exports:[
    CommentsComponent,
    AddCommentComponent,
    CommentFormComponent,
    FormHelpComponent
    // SharedModule
  ]
})
export class CommentsModule { }
