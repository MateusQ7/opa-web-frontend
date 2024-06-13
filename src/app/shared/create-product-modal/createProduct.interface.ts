import { OrderStatus } from "src/app/home/order/inProgressOrder.interface";
import { Menu } from "src/app/services/menu/menu.interface";

export interface createProduct {
  checked:boolean;
  tableId: number;
  menuItem: Menu;
  totalValue: number;
  status: OrderStatus;
  customersList: number[];
  quantity:number;
  formattedNames?:string;
}

export interface ProductType {
  name: string;
}
