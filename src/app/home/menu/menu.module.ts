import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';



@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule
  ]
})
export class MenuModule { }
