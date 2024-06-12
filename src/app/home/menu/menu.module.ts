import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { CreateProductModalModule } from 'src/app/shared/create-product-modal/create-product-modal.module';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    MenuComponent,
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule,
    LoadingModule,
    CreateProductModalModule,
    NgSelectModule
  ]
})
export class MenuModule { }
