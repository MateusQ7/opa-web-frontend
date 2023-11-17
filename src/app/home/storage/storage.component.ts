import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {

  popUp = false;

  constructor(
    public auth: AuthService
  ) { }

  showPopUp(){
    this.popUp = !this.popUp
    console.log("okasdokas")
  }
}
