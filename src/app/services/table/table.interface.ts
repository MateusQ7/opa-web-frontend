import { Customer } from "../customer/customer.interface";

export interface Table{
  token:string;
  id:number;
  openTime:string;
  customer:Customer[];
  responsableWaiter:string;
}
