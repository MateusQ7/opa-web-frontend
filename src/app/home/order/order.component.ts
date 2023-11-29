import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InProgressTables } from './InProgressTables.interface';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/services/order/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  launchOrderModal = false;

  orderModal = true;

  inProgressOrderList:Order[]=[]

  tablesInProgress:InProgressTables[]=[
    {
      id:1,
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
      id:1,
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
      id:1,
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
    private orderService:OrderService
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

  showLaunchOrderModal(){
    this.launchOrderModal = !this.launchOrderModal
  }

  showOrderModal(){
    this.orderModal = !this.orderModal
  }

  recieveOrders(orders:Order[]){
    this.orderService.createOrder(orders);
    orders.map((e:Order)=>{
      this.inProgressOrderList.push(e);
    })
  }

}
