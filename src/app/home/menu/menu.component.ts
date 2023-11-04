import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  showModal = false;

  constructor(
    public auth:AuthService
  ){}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  public handleShowModal() {
    this.showModal = !this.showModal
  }
}
