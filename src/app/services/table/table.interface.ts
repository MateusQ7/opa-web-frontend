import { Customer } from "../customer/customer.interface";

export interface Table{
  token:string;
  id:number;
  openTime:string;
  customers:Customer[];
  status:TableStatus;
  responsableWaiter:string;
}

export enum TableStatus{
  Fechada = 0,
  Aberta = 1
}
