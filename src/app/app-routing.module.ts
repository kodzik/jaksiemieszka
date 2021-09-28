import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { LeafletTestComponent } from './leaflet-test/leaflet-test.component';
import { MapTestComponent } from './map-test/map-test.component';
import { OpenmapTestComponent } from './openmap-test/openmap-test.component';

const routes: Routes = [
  { path: 'gmap', component: MapTestComponent },
  { path: 'openmap', component: OpenmapTestComponent },
  { path: '', component: LeafletTestComponent },
  { path: 'apollo', component: ApolloTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
