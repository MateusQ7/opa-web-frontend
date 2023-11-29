import { Injectable } from '@angular/core';
import { Table } from './table.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  tables:Table[]=[
    {
      token:`sim`,
      id:25,
      openTime:`19:25`,
      responsableWaiter:'jorgin amado',
      customer:[
        {
        id:1,
        name:'renatin'
        },
        {
        id:2,
        name:'oclin'
        },
        {
        id:3,
        name:'power ranger rosa'
        },
      ],
    },
    {
      token:`sim`,
      id:30,
      openTime:`19:25`,
      responsableWaiter:'hernandes',
      customer:[
        {
        id:1,
        name:'renatin'
        },
        {
        id:2,
        name:'oclin'
        },
        {
        id:3,
        name:'power ranger rosa'
        },
      ],
    },
    {
      token:`sim`,
      id:40,
      openTime:`19:25`,
      responsableWaiter:'pedro cailow',
      customer:[
        {
        id:1,
        name:'renatin'
        },
        {
        id:2,
        name:'oclin'
        },
        {
        id:3,
        name:'power ranger rosa'
        },
      ],
    },
  ]

  constructor() { }
}
