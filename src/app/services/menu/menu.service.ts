import { Injectable } from '@angular/core';
import { Menu } from './menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu:Menu[]=[
    {
      id:1,
      description:'lobia',
      name:'catinha de parangolas',
      value:19.99
    },
    {
      id:2,
      description:'p',
      name:'parmegilaine',
      value:59.99
    },
    {
      id:4,
      description:'fisca de eixe',
      name:'fisca de eixe',
      value:39.99
    },
    {
      id:3,
      description:'lobia',
      name:'gerardo bastos',
      value:29.99
    },
  ]

  constructor() { }
}
