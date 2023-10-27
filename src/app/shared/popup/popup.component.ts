import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackReponse } from 'src/app/user-register/backReponse.interface';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'opa-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @Output() okButton: EventEmitter<boolean> = new EventEmitter<boolean>

  @Output() goToLogin: EventEmitter<any> = new EventEmitter<any>

  @Input() public listOfMessages: BackReponse[] = []

  emit() {
    this.okButton.emit(false);

    this.listOfMessages.forEach(element => {
      if (element.data) {

        this.goToLogin.emit(true);
      }
    });

    this.listOfMessages.length = 0;
  }
}
