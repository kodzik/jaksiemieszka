import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FabComponent } from './fab/fab.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { appInitializer } from './_helpers/app.initializer';
import { AuthService } from './_services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ApolloTestComponent,
    HomeComponent,
    MapComponent,
    NavbarComponent,
    FabComponent,
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
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    MarkerService, 
    PopupService, 
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
