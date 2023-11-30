import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InProgressTables } from './InProgressTables.interface';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/services/order/order.interface';
import { firstValueFrom } from 'rxjs'
import { BackendOrder } from 'src/app/services/order/backendOrder.interface';
import { TableService } from 'src/app/services/table/table.service';

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

      const ordersTable = await firstValueFrom(this.tableService.getTables());
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
    this.orderService.createOrder(orders);
    orders.map((e:Order)=>{
      this.inProgressOrderList.push(e);
    })
  }

}
