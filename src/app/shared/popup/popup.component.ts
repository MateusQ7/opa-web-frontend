import { Component, EventEmitter, Output } from '@angular/core';
import { ListOfMessages } from './list-of-messages';

@Component({
  selector: 'opa-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @Output() okButton:EventEmitter<boolean> = new EventEmitter<boolean>

  public listOfMessages:ListOfMessages[]=[
    {
      message:'deu a porra memo'
    },
    {
      message:'deu a porra memo'
    },
    {
      message:'deu a porra memo'
    },
  ]

  emit(){
    this.okButton.emit(false);
  }
}
