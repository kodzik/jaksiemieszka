import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimesharedModule } from '../primeshared/primeshared.module';
import { MatSharedModule } from '../mat-shared/mat-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
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
