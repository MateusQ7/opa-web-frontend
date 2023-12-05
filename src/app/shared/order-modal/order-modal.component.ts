import { Component, EventEmitter, Input, OnInit, Output, inject ,TemplateRef, ViewChild} from '@angular/core';
import { TableDetailed } from './tableDetailed.interface';
import { TableService } from 'src/app/services/table/table.service';
import { firstValueFrom } from 'rxjs';
import { InProgressTables } from 'src/app/home/order/InProgressTables.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'opa-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent implements OnInit{

  @ViewChild('content', { static: true })
  modalContent!: TemplateRef<any>;

  @Input()
  table!:InProgressTables

  @Input()
  tableDetailed!:TableDetailed

  @Output()
  close:EventEmitter<Boolean> = new EventEmitter<Boolean>

  modalService = inject(NgbModal)

  loading = false;

  constructor(
    private tableService:TableService
  ){

  }

  async ngOnInit(): Promise<void> {
    console.log(this.table);
    this.modalService.open(this.modalContent, { size: 'xl' });
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
    this.modalService.dismissAll()
  }
}
