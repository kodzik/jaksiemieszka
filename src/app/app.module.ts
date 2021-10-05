import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapTestComponent } from './map-test/map-test.component';

import { OpenmapTestComponent } from './openmap-test/openmap-test.component';
import { LeafletTestComponent } from './leaflet-test/leaflet-test.component';

import { GraphQLModule } from './graphql.module';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { HomeComponent } from './home/home.component';

import { MarkerService } from './_services/marker.service';
import { PopupService } from './_services/popup.service';
import { ShapeService } from './_services/shape.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';

import { CommentComponent } from './comments/comment/comment.component';
import { MapComponent } from './map/map.component';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentComponent } from './comments/add-comment/add-comment.component';
import { SharedModule } from "./_shared/shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    MapTestComponent,
    OpenmapTestComponent,
    LeafletTestComponent,
    ApolloTestComponent,
    HomeComponent,
    CommentComponent,
    MapComponent,
    CommentsComponent,
    AddCommentComponent,
  ],
  imports: [
    SharedModule,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ScrollingModule,

    HttpClientModule,
    GraphQLModule,

    FormsModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,

  ],
  exports:[
    SharedModule,
  ],
  providers: [MarkerService, PopupService, ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
