import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";
import { Customer } from "../customer/customer.interface";
import { Menu } from "../menu/menu.interface";
import { Table } from "../table/table.interface";

export interface BackendOrder{
  id:number;
  menuItem:Menu[];
  customer:Customer[];
  status:OrderStatus;
  table:Table;
  orderedTime?:string;
  deliveredTime?:string;
}
