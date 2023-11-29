import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";
import { Menu } from "src/app/services/menu/menu.interface";
import { Table } from "src/app/services/table/table.interface";

export interface TableDetailed{
  table:Table;
  orders:OrderToTableDetailed[]
}

export interface OrderToTableDetailed{
  id:number;
  menuItem:Menu[];
  clients:Client[];
  status:OrderStatus;
  orderedTime?:string;
  deliveredTime?:string;
}

export interface Client{
  id:number;
  name:string;
}
