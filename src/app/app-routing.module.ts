import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const commentsModule = () => import('./comments/comments.module').then(x => x.CommentsModule);

const routes: Routes = [
  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      // { path: 'account', loadChildren: accountModule },
      { path: 'comments', loadChildren: commentsModule },
    ]
  },
  // { path: 'apollo', component: ApolloTestComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }//, pathMatch: 'full'
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
