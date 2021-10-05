import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimesharedModule } from '../primeshared/primeshared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimesharedModule,
  ],
  exports:[
    PrimesharedModule,
  ]
})
export class SharedModule { }
