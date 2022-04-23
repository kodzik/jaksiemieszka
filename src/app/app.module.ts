import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from "./_shared/shared/shared.module";
import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { CommentsModule } from './comments/comments.module';
import { GraphQLModule } from './graphql.module';

import { MarkerService } from './_services/marker.service';
import { PopupService } from './_services/popup.service';
import { ShapeService } from './_services/shape.service';

import { AppComponent } from './app.component';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ApolloTestComponent,
    HomeComponent,
    MapComponent,
    NavbarComponent,
  ],
  imports: [
    SharedModule,
    CommentsModule,
    AccountModule,
    AppRoutingModule,
    ScrollingModule,
    HttpClientModule,
    GraphQLModule,
  ],
  exports:[],
  providers: [MarkerService, PopupService, ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
