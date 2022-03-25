import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimesharedModule } from '../primeshared/primeshared.module';
import { MatSharedModule } from '../mat-shared/mat-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    // BrowserModule,
    // BrowserAnimationsModule,

    PrimesharedModule,
    MatSharedModule,
    
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    PrimesharedModule,
    MatSharedModule,

    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
