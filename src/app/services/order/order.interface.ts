import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";
import { Menu } from "src/app/services/menu/menu.interface";
import { Table } from "../table/table.interface";

export interface Order{
  checked:boolean;
  id:number;
  menuItem:Menu;
  clients:string[];
  quantity:number;
  status:OrderStatus;
  table:Table;
  orderedTime?:string;
  deliveredTime?:string;
}
