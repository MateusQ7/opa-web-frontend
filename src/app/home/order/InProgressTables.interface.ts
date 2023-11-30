import { Table } from "src/app/services/table/table.interface";
import { OrderStatus } from "./inProgressOrder.interface";

export interface InProgressTables{
  id:number;
  orders:SimplifiedOrders[]
  table:Table;
}

export interface SimplifiedOrders{
  id:number;
  name:string;
  status:OrderStatus;
  quantity:number;
}
