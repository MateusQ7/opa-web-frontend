import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {
  showModal = true;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  public handleShowModal() {
    this.showModal = !this.showModal
  }

  constructor(
    public auth: AuthService
  ) { }
}
