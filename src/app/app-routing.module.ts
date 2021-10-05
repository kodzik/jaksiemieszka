import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { HomeComponent } from './home/home.component';
import { LeafletTestComponent } from './leaflet-test/leaflet-test.component';
import { MapTestComponent } from './map-test/map-test.component';
import { OpenmapTestComponent } from './openmap-test/openmap-test.component';
import { AuthGuard } from './_helpers/auth.guard';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const commentsModule = () => import('./comments/comments.module').then(x => x.CommentsModule);

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'gmap', component: MapTestComponent },
      { path: 'openmap', component: OpenmapTestComponent },
      { path: 'leaf', component: LeafletTestComponent },
      { path: 'apollo', component: ApolloTestComponent },
      { path: 'account', loadChildren: accountModule },
      { path: 'comments', loadChildren: commentsModule },
    ]
},
  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
