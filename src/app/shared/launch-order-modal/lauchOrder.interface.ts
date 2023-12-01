import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";

export interface LauchOrder{
  checked:boolean;
  tableId: number;
  productId: number;
  totalValue: number;
  status: OrderStatus;
  personIds: number[];
}
