import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  string = 'Dashboard';

  billing:string = `18.309,35`

  ticket:string =`1.309,42`

  constructor(
    public auth:AuthService
  ){}
}
