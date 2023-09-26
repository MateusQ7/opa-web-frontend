import { Component } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {

  constructor(
    public auth:AuthService
  ){}
}
