import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InProgressTables } from './InProgressTables.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  launchOrderModal = false;

  orderModal = false;

  inProgressOrderList=[
    {
      id:1,
      name:`catinha de parangolas`,
      status:1,
      table:12,
      clients:[`fernando`,`barreto`,`pc`],
      orderedTime:`13:09`,
      responsableWaiter:`renatin`,
      deliveredTime:`13:20`,
      quantity:1
    },
    {
      id:1,
      name:`catinha de parangolas`,
      status:2,
      table:12,
      clients:[`fernando`,`barreto`,`pc`],
      orderedTime:`13:09`,
      responsableWaiter:`renatin`,
      deliveredTime:`13:20`,
      quantity:1
    },
    {
      id:1,
      name:`catinha de parangolas`,
      status:3,
      table:12,
      clients:[`fernando`,`barreto`,`pc`],
      orderedTime:`13:09`,
      responsableWaiter:`renatin`,
      deliveredTime:`13:20`,
      quantity:1
    },
  ];

  tablesInProgress:InProgressTables[]=[
    {
      number:25,
      responsableWaiter:`arnaldin`,
      orders:[
        {
          name:`esfera de lactos`,
          status:2,
          quantity:3
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de amedoi`,
          status:1,
          quantity:2
        },
      ]
    },
    {
      number:12,
      responsableWaiter:`felipe da zaga`,
      orders:[
        {
          name:`esfera de lactos`,
          status:2,
          quantity:3
        },
        {
          name:`esfera de amedoi`,
          status:1,
          quantity:2
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de amedoi`,
          status:1,
          quantity:2
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de amedoi`,
          status:1,
          quantity:2
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        }
      ]
    },
    {
      number:40,
      responsableWaiter:`jorge amado`,
      orders:[
        {
          name:`esfera de presunto`,
          status:3,
          quantity:31
        },
        {
          name:`esfera de amedoi`,
          status:1,
          quantity:2
        },{
          name:`esfera de lactos`,
          status:2,
          quantity:3
        },
      ]
    },
  ];

  constructor(
    public auth:AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ){}

  expandOrder(loopCell:HTMLElement,deepInfo:HTMLElement){
    if(loopCell.style.minHeight === '7vh' || loopCell.style.minHeight === ""){
      loopCell.style.minHeight = '22vh'
      deepInfo.style.display = 'flex'
      console.log('if')
    }
    else{
      loopCell.style.minHeight = '7vh'
      console.log('else')
      deepInfo.style.display = 'none'
    }
  }
}
