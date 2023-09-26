import { Component } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(
    public auth:AuthService
  ){}
}
