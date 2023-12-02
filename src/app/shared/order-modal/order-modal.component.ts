import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableDetailed } from './tableDetailed.interface';

@Component({
  selector: 'opa-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {

  loading = false;

  @Output()
  close:EventEmitter<Boolean> = new EventEmitter<Boolean>

  @Input()
  tableDetailed!:TableDetailed

  closeModal(){
    this.close.emit(false);
  }
}
