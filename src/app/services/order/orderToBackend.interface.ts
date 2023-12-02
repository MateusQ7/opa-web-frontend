import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";

export interface OrderToBackend{
  totalValue: number;
  status: OrderStatus;
  tableId: number;
  productId: number;
  personIds: number[];
}
