import { Customer } from "src/app/services/customer/customer.interface";
import { Table } from "src/app/services/table/table.interface";
import { OrderStatus } from "./inProgressOrder.interface";

export interface InProgressTables{
  id:number;
  table:Table;
  orders:SimplifiedOrders[]
  orderQt:number;
}

export interface SimplifiedOrders{
  id:number;
  name:string;
  status:OrderStatus;
  price:number;
}
