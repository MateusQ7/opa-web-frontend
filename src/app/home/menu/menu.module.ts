import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { CreateUpdateProductComponent } from './create-update-stock/create-update-stock.component';
import { LoadingModule } from 'src/app/shared/loading/loading.module';



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
    YellowlineModule,
    LoadingModule
  ]
})
export class MenuModule { }
