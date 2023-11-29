import { OrderStatus } from "./inProgressOrder.interface";

export interface InProgressTables{
  id:number;
  number:number;
  orders:SimplifiedOrders[]
  responsableWaiter:string
}

export interface SimplifiedOrders{
  name:string;
  status:OrderStatus;
  quantity:number;
}
