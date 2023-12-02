import { Injectable } from '@angular/core';
import { Waiter } from './waiter.interface';

@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  waiters:Waiter[]=[
    {
      id:1,
      name:'marilo',
      cpf:'2',
      responsabletables:[
        25,35,56
      ]
    },
    {
      id:2,
      name:'hernandes',
      cpf:'5',
      responsabletables:[
        20,40,32
      ]
    },
    {
      id:1,
      name:'pablo',
      cpf:'3',
      responsabletables:[
        23,15,10
      ]
    },
  ]

  constructor() { }
}
