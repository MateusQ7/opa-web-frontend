import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";
import { Customer } from "src/app/services/customer/customer.interface";
import { Menu } from "src/app/services/menu/menu.interface";
import { Table } from "src/app/services/table/table.interface";

export interface TableDetailed {
  table:Table;
  orders:OrderToTableDetailed[];
}

export interface OrderToTableDetailed {
  id:number;
  menuItem:Menu;
  customers:Customer[];
  status:OrderStatus;
  orderedTime:string;
  deliveredTime:string;
}

