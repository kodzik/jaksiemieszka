import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from '././comments/comments.component';
import { LayoutComponent } from '../account/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
        { path: 'add', component: AddCommentComponent },
        // { path: '', component: CommentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
