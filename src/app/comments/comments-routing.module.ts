import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentsComponent } from '././comments/comments.component';
import { LayoutComponent } from '../account/layout/layout.component';


const routes: Routes = [
  {
    path: 'comments', component: LayoutComponent,
    children: [
        { path: 'add', component: AddCommentComponent },
        { path: 'show', component: CommentsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
