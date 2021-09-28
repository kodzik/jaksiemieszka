import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { LeafletTestComponent } from './leaflet-test/leaflet-test.component';
import { MapTestComponent } from './map-test/map-test.component';
import { OpenmapTestComponent } from './openmap-test/openmap-test.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { path: 'gmap', component: MapTestComponent },
  { path: 'openmap', component: OpenmapTestComponent },
  { path: '', component: LeafletTestComponent },
  { path: 'apollo', component: ApolloTestComponent },
  { path: 'account', loadChildren: accountModule },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
