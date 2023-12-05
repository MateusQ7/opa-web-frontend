import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InProgressTables } from './InProgressTables.interface';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/services/order/order.interface';
import { firstValueFrom } from 'rxjs'
import { BackendOrder } from 'src/app/services/order/backendOrder.interface';
import { TableService } from 'src/app/services/table/table.service';
import { OrderToBackend } from 'src/app/services/order/orderToBackend.interface';
import { LauchOrder } from 'src/app/shared/launch-order-modal/lauchOrder.interface';
import { Customer } from 'src/app/services/customer/customer.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  launchOrderModal = false;

  orderModal = false;

  loading = false;

  tableToOrderModal!:InProgressTables;

  inProgressOrderList:Order[]=[]

  inProgressTables:InProgressTables[]=[];

  array:any[] =[1]

  constructor(
    public auth:AuthService,
    private orderService:OrderService,
    private tableService:TableService,
    private datePipe: DatePipe
  ){}

  async ngOnInit(){
    await this.getData();
  }

  async getData(){
    this.loading = true;
    try{
      const ordersData = await firstValueFrom(this.orderService.getOrders());

      ordersData.map((backendOrder: BackendOrder) => {
        let customers:string[] = []

        backendOrder.customers.map((customer:Customer)=>{
          customers.push(customer.name);
        })
          this.inProgressOrderList.push({
            id:backendOrder.id,
            menuItem:backendOrder.menuItem,
            status:backendOrder.status,
            table:backendOrder.table,
            deliveredTime: this.getDateFormattedTime(backendOrder.deliveredTime),
            orderedTime: this.getDateFormattedTime(backendOrder.orderedTime),
            customers:backendOrder.customers,
            customersName:customers
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

  showOrderModal(table:InProgressTables,){
    this.tableToOrderModal = table;
    this.orderModal = !this.orderModal
  }

  recieveOrdersFromModal(orders:LauchOrder[]){
    const ordersToBack:OrderToBackend[]=[]
    orders.map((order:LauchOrder)=>{
      ordersToBack.push({
        tableId: order.tableId,
        status: order.status,
        productId: order.menuItem.id,
        totalValue: order.totalValue,
        personIds:order.personIds
      })
    })
    this.orderService.createOrder(ordersToBack[0]).subscribe(
      (e:any)=>{
        console.log(e);
      }
    );
  }

  getDateFormattedTime(date: string): string {
    if (date == 'Não entregue') {
      return date;
    }

    const formattedDate = this.datePipe.transform(date, 'HH:mm');

    return formattedDate ? formattedDate : date;
  }

}
