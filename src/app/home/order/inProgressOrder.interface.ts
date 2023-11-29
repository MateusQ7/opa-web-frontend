export interface InProgressOrder{
  id:number;
  name:string;
  status:OrderStatus;
  tableID:number;
  clients:string[];
  orderedTime:string;
  responsableWaiter:string;
  quantity:number;
  deliveredTime?:string;
}

export enum OrderStatus{
  EmAndamento = 1,
  Entregue = 2,
  Cancelado = 3
}
