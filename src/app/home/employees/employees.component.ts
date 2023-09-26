import { Component } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  constructor(
    public auth:AuthService
  ){}
}
