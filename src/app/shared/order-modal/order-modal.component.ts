import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableDetailed } from './tableDetailed.interface';

@Component({
  selector: 'opa-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent {

  loading = false;

  @Output()
  close:EventEmitter<Boolean> = new EventEmitter<Boolean>

  @Input()
  tableDetailed:TableDetailed = {
    table:{
      token:`a3woijowijfoij`,
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
    orders:[
      {
        id:3,
        menuItem:[
          {
          id:4,
          name:'catiaaaaaas',
          description:`aoskdoaks`,
          value:19.99
          }
        ],
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
        status:2,
        orderedTime:`13:02`,
        deliveredTime:`13:30`
      },
      {
        id:1,
        menuItem:[
          {
          id:4,
          name:'catinhssssssssssssslas',
          description:`aoskdoaks`,
          value:19.99
          }
        ],
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
        status:1,
      }
    ]
  }

  closeModal(){
    this.close.emit(false);
  }
}
