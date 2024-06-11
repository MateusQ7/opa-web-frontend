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

  constructor(
    public auth:AuthService,
    private orderService:OrderService,
    private tableService:TableService,
    private datePipe: DatePipe,
  ){}

  async ngOnInit(){
    await this.getData();
  }

  async getData() {
    this.loading = true;
    try{
      const ordersData = await firstValueFrom(this.orderService.getOrders());
      console.log(ordersData);
      this.inProgressOrderList = [];
      this.inProgressTables = [];

      ordersData.map((backendOrder: BackendOrder) => {
        let customers:string[] = []

        backendOrder.customers.map((customer:Customer)=>{
          customers.push(customer.name);
        });

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
      this.inProgressTables = [];
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

  showLaunchOrderModal(){
    this.launchOrderModal = !this.launchOrderModal
  }

  showOrderModal(table:InProgressTables,){
    this.tableToOrderModal = table;
    this.orderModal = !this.orderModal
  }

  async receiveOrdersFromModal(orders:LauchOrder[]){
    const ordersToBack:OrderToBackend[]=[]
    orders.map((order:LauchOrder)=>{
      for (let i = 0; i < order.quantity; i++) {
        ordersToBack.push({
          tableId: order.tableId,
          status: order.status,
          productId: order.menuItem.id,
          totalValue: order.totalValue / order.quantity,
          personIds: order.customersList,
        });
      }
    })
    try{
      this.loading = true;
      this.orderService.createOrder(ordersToBack).subscribe(
        async (e:Order[])=>{
          await this.getData();
        }
      );
      this.loading = false;
    }catch(error){
      console.log(error);
    }
  }

  getDateFormattedTime(date: string): string {
    if (date == 'Não entregue') {
      return date;
    }

    const formattedDate = this.datePipe.transform(date, 'HH:mm');

    return formattedDate ? formattedDate : date;
  }
}
