import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";
import { Menu } from "src/app/services/menu/menu.interface";

export interface LauchOrder{
  checked:boolean;
  tableId: number;
  menuItem: Menu;
  totalValue: number;
  status: OrderStatus;
  personIds: number[];
  quantity:number;
}
