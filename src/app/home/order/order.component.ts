import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InProgressTables } from './InProgressTables.interface';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/services/order/order.interface';
import { firstValueFrom } from 'rxjs'
import { BackendOrder } from 'src/app/services/order/backendOrder.interface';
import { TableService } from 'src/app/services/table/table.service';
import { OrderToBackend } from 'src/app/services/order/orderToBackend.interface';
import { Customer } from 'src/app/services/customer/customer.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  launchOrderModal = false;

  orderModal = false;

  loading = false;

  inProgressOrderList:Order[]=[]

  inProgressTables:InProgressTables[]=[];

  constructor(
    public auth:AuthService,
    private orderService:OrderService,
    private tableService:TableService
  ){}

  async ngOnInit(){
    await this.getData();
  }

  async getData(){
    this.loading = true;
    try{
      const ordersData = await firstValueFrom(this.orderService.getOrders());
      ordersData.map((backendOrder: BackendOrder) => {
          this.inProgressOrderList.push({
            checked:false,
            id:backendOrder.id,
            menuItem:backendOrder.menuItem,
            customers:backendOrder.customers,
            status:backendOrder.status,
            table:backendOrder.table,
            deliveredTime:backendOrder.deliveredTime,
            orderedTime:backendOrder.orderedTime
          });
        })

      const ordersTable = await firstValueFrom(this.tableService.getInProgressTables());
      ordersTable.map((inProgressTable:InProgressTables) => {
          this.inProgressTables.push({
            id:inProgressTable.id,
            orders:inProgressTable.orders,
            table:inProgressTable.table,
            orderQt:inProgressTable.orderQt
          });
        })
      this.loading = false;
    }catch(error: any){
      console.log(error);
    }
  }
  expandOrder(loopCell:HTMLElement,deepInfo:HTMLElement){
    if(loopCell.style.minHeight === '7vh' || loopCell.style.minHeight === ""){
      loopCell.style.minHeight = '22vh'
      deepInfo.style.display = 'flex'
    }
    else{
      loopCell.style.minHeight = '7vh'
      deepInfo.style.display = 'none'
    }
  }

  showLaunchOrderModal(){
    this.launchOrderModal = !this.launchOrderModal
  }

  showOrderModal(){
    this.orderModal = !this.orderModal
  }

  recieveOrdersFromModal(orders:Order[]){
    console.log(orders)
    const ordersToBack:OrderToBackend[]=[]
    orders.map((order:Order)=>{
      const ids:number[] = []
      order.customers.map((customer:Customer)=>{
        ids.push(customer.id ?? '')
      })

      ordersToBack.push({
        tableId: order.table.id,
        status: order.status,
        productId: order.menuItem.id,
        totalValue: order.menuItem.price,
        personIds:ids
      })
      // console.log('chatpgc')
      this.orderService.createOrder(ordersToBack);
    })
    orders.map((e:Order)=>{
      this.inProgressOrderList.push(e);
    })
  }

}
