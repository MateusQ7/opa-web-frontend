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
      clients:[
        `ricardo`,
        `moreno`,
        `cabeca`
      ]
    },
    {
      token:`sim`,
      id:30,
      openTime:`19:25`,
      responsableWaiter:'hernandes',
      clients:[
        `carlos`,
        `adriano`,
        `cabeca`
      ]
    },
    {
      token:`sim`,
      id:40,
      openTime:`19:25`,
      responsableWaiter:'pedro cailow',
      clients:[
        `hernandes`,
        `jorge ombrinho`,
        `cabeca`
      ]
    },
  ]

  constructor() { }
}
