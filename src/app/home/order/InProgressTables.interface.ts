import { Table } from "src/app/services/table/table.interface";
import { OrderStatus } from "./inProgressOrder.interface";

export interface InProgressTables{
  id:number;
  number:number;
  orders:SimplifiedOrders[]
  table:Table;
}

export interface SimplifiedOrders{
  name:string;
  status:OrderStatus;
  quantity:number;
}
