import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { OpenmapTestComponent } from './openmap-test/openmap-test.component';

import { GraphQLModule } from './graphql.module';
import { ApolloTestComponent } from './apollo-test/apollo-test.component';
import { HomeComponent } from './home/home.component';

import { MarkerService } from './_services/marker.service';
import { PopupService } from './_services/popup.service';
import { ShapeService } from './_services/shape.service';

import { MapComponent } from './map/map.component';

import { SharedModule } from "./_shared/shared/shared.module";
import { CommentsModule } from './comments/comments.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,

    OpenmapTestComponent,
    ApolloTestComponent,

    HomeComponent,
    MapComponent,
    NavbarComponent,

  ],
  imports: [
    SharedModule,
    CommentsModule,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ScrollingModule,

    HttpClientModule,
    GraphQLModule,
  ],
  exports:[
    // SharedModule,
  ],
  providers: [MarkerService, PopupService, ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
