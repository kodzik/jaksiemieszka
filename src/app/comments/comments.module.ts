import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from '././comments/comments.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

import { SharedModule } from '../_shared/shared/shared.module';
import { CommentsLayoutComponent } from './comments-layout/comments-layout.component';
import { FormHelpComponent } from './comment-form/form-help/form-help.component';
import { TestCommentComponent } from './test-comment/test-comment.component';


@NgModule({
  declarations: [
    CommentComponent,
    CommentsComponent,
    AddCommentComponent,
    CommentsLayoutComponent,
    CommentFormComponent,
    FormHelpComponent,
    TestCommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    CommentsComponent,
    AddCommentComponent,
    CommentFormComponent,
    FormHelpComponent,
    CommentsLayoutComponent
  ]
})
export class CommentsModule { }
