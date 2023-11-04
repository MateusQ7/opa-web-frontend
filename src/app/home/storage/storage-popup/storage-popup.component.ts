import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'opa-storage-popup',
  templateUrl: './storage-popup.component.html',
  styleUrls: ['./storage-popup.component.css']
})
export class StoragePopupComponent {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>

  closePopUp() {
    this.close.emit(false);
    console.log('and WE OCUPPYYYYYYYY')
  }


}
