import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GMapModule } from 'primeng/gmap';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { VirtualScrollerModule } from 'primeng/virtualscroller';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GMapModule,
    MessagesModule,
    MessageModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    CheckboxModule,
    DialogModule,
    RatingModule,
    ButtonModule,
    InputTextModule,
  ],
  exports:[
    CommonModule,
    GMapModule,
    MessagesModule,
    MessageModule,
    ScrollPanelModule,
    VirtualScrollerModule,
    CheckboxModule,
    DialogModule,
    RatingModule,
    ButtonModule,
    InputTextModule,
  ]
})
export class PrimesharedModule { }
