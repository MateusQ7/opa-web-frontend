import { Component, EventEmitter, Input, OnInit, Output, inject ,TemplateRef, ViewChild} from '@angular/core';
import { OrderToTableDetailed, TableDetailed } from './tableDetailed.interface';
import { TableService } from 'src/app/services/table/table.service';
import { firstValueFrom } from 'rxjs';
import { InProgressTables, SimplifiedOrders } from 'src/app/home/order/InProgressTables.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'opa-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit {
  tableTotalBill = 0;

  @ViewChild('content', { static: true })
  modalContent!: TemplateRef<any>;

  @Input()
  table!:InProgressTables

  @Input()
  tableDetailed!:TableDetailed;

  @Output()
  close:EventEmitter<Boolean> = new EventEmitter<Boolean>

  modalService = inject(NgbModal)

  loading = false;

  constructor(
    private tableService:TableService,
    private datePipe:DatePipe
  ){

  }

  async ngOnInit(): Promise<void> {
    this.modalService.open(this.modalContent, { size: 'xl', scrollable: true });
    await this.getData();
  }

  async getData() {
    this.loading = true;
    try {
      const data = await firstValueFrom(this.tableService.getSingleTable(this.table.id));
      data.table.openTime = this.getDateFormattedTime(data.table.openTime);
      data.orders.map((order:OrderToTableDetailed) => {
        order.orderedTime = this.getDateFormattedTime(order.orderedTime)
        order.deliveredTime = this.getDateFormattedTime(order.deliveredTime)

        this.tableTotalBill += parseFloat(String(order.menuItem.price));
      });

      this.tableDetailed = data;
      this.loading = false;
    }
    catch (error: any) {
      console.log(error);
    }

    console.log(this.tableDetailed)
  }

  closeModal(){
    this.close.emit(false);
    this.modalService.dismissAll()
  }

  getDateFormattedTime(date: string): string {
    if (date == 'Não entregue') {
      return date;
    }

    const formattedDate = this.datePipe.transform(date, 'HH:mm');

    return formattedDate ? formattedDate : date;
  }
}
