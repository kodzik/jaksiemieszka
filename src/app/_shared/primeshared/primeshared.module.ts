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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpeedDialModule } from 'primeng/speeddial';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
    InputTextareaModule,
    SpeedDialModule,
    StepsModule,
    CardModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
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
    InputTextareaModule,
    SpeedDialModule,
    StepsModule,
    CardModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ],
  providers:[
    ConfirmationService
  ]
})
export class PrimesharedModule { }
