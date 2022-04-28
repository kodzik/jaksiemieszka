import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { AddCommentComponent } from './comments/add-comment/add-comment.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const commentsModule = () => import('./comments/comments.module').then(x => x.CommentsModule);

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // loadChildren: commentsModule,
    // children: [
    //   {
    //     path: 'add',
    //     component: AddCommentComponent,
    //     canActivate: [AuthGuard]
    //   }
    // ]
  },
  // { path: 'apollo', component: ApolloTestComponent },

  // {
  //   path: 'comments',
  //   // loadChildren: commentsModule,
  //   children: [
  //     {
  //       path: 'add',
  //       component: AddCommentComponent,
  //       canActivate: [AuthGuard]
  //     }
  //   ],
  //   canActivate: [AuthGuard],
  //   canActivateChild: [AuthGuard],
  // },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }//, pathMatch: 'full'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
