import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from "./_shared/shared/shared.module";
import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { CommentsModule } from './comments/comments.module';

import { MarkerService } from './_services/marker.service';
import { PopupService } from './_services/popup.service';
import { ShapeService } from './_services/shape.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FabComponent } from './fab/fab.component';
import { AuthService } from './_services/auth.service';
import { MenuComponent } from './navbar/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    NavbarComponent,
    FabComponent,
    MenuComponent,
  ],
  imports: [
    SharedModule,
    CommentsModule,
    AccountModule,
    AppRoutingModule,
    ScrollingModule,
    HttpClientModule
  ],
  exports:[],
  providers: [
    MarkerService,
    PopupService,
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
