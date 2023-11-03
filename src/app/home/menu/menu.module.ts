import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { CreateUpdateProductComponent } from './create-update-stock/create-update-stock.component';



@NgModule({
  declarations: [
    MenuComponent,
    CreateUpdateProductComponent,
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
