import { OrderStatus } from "./inProgressOrder.interface";

export interface InProgressTables{
  number:number;
  orders:SimplifiedOrders[]
  responsableWaiter:string
}

export interface SimplifiedOrders{
  name:string;
  status:OrderStatus;
  quantity:number;
}
