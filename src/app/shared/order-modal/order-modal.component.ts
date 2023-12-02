import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableDetailed } from './tableDetailed.interface';
import { TableService } from 'src/app/services/table/table.service';
import { firstValueFrom } from 'rxjs';
import { InProgressTables } from 'src/app/home/order/InProgressTables.interface';

@Component({
  selector: 'opa-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit{

  @Input()
  table!:InProgressTables

  loading = false;

  @Output()
  close:EventEmitter<Boolean> = new EventEmitter<Boolean>

  @Input()
  tableDetailed!:TableDetailed

  constructor(
    private tableService:TableService
  ){

  }

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData(){
    this.loading = true;
    try{
      const data = await firstValueFrom(this.tableService.getSingleTable(this.table.id));
      this.tableDetailed = data;
      this.loading = false;
    }catch(error: any){
      console.log(error);
    }
  }

  closeModal(){
    this.close.emit(false);
  }
}
