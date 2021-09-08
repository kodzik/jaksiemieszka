import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapTestComponent } from './map-test/map-test.component';

import { GMapModule } from 'primeng/gmap';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { OpenmapTestComponent } from './openmap-test/openmap-test.component';
import { LeafletTestComponent } from './leaflet-test/leaflet-test.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';
import { ShapeService } from './shape.service';


@NgModule({
  declarations: [
    AppComponent,
    MapTestComponent,
    OpenmapTestComponent,
    LeafletTestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GMapModule,
    CheckboxModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    HttpClientModule
  ],
  providers: [MarkerService, PopupService, ShapeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
