import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup.component';



@NgModule({
  declarations: [
    PopupComponent
  ],
  exports: [
    PopupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PopupModule { }
