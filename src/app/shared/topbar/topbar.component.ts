import { Component } from '@angular/core';
import { AuthService } from 'src/app/guard/auth.service';
import { Buttons } from './buttons';

@Component({
  selector: 'opa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  public restaurantName?:string = 'Restaurante ABC';

  public buttons:Buttons[]=[
    {
    name:'Dashboard',
    route:'/dashboard'
    },
    {
    name:'Estoque',
    route:'/storage'
    },
    {
    name:'Funcionários',
    route:'/employees'
    },
    {
    name:'Cardápio',
    route:'/menu'
    },
  ]
  constructor(
    public auth:AuthService
  ){}
}
