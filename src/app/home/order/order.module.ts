import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderComponent } from './order.component';
import { YellowlineModule } from 'src/app/shared/yellowline/yellowline.module';
import { OrderModalModule } from 'src/app/shared/order-modal/order-modal.module';
import { LaunchOrderModalModule } from 'src/app/shared/launch-order-modal/launch-order-modal.module';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    OrderComponent
  ],
  exports: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    YellowlineModule,
    OrderModalModule,
    LaunchOrderModalModule,
    LoadingModule,
    NgbAccordionModule,
  ],
  providers: [
    DatePipe
  ]
})
export class OrderModule { }
