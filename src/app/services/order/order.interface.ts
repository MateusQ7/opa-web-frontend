import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";
import { Menu } from "src/app/services/menu/menu.interface";
import { Table } from "../table/table.interface";
import { Customer } from "../customer/customer.interface";

export interface Order{
  checked:boolean;
  id:number;
  menuItem:Menu;
  customers:Customer[];
  status:OrderStatus;
  table:Table;
  orderedTime?:string;
  deliveredTime?:string;
}
