import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YellowlineComponent } from './yellowline.component';



@NgModule({
  declarations: [
    YellowlineComponent
  ],
  exports: [
    YellowlineComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class YellowlineModule { }
