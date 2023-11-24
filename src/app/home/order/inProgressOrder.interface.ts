export interface InProgressOrder{
  id:number;
  name:string;
  status:OrderStatus;
  table:number;
  clients:string[];
  orderedTime:string;
  responsableWaiter:string;
  deliveredTime?:string;
  quantity?:number;
}

export enum OrderStatus{
  EmAndamento = 1,
  Entregue = 2,
  Cancelado = 3
}
