import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientPopupComponent } from './ingredient-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    IngredientPopupComponent
  ],
  exports: [
    IngredientPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class IngredientPopupModule { }
