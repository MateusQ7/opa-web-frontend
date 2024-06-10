export interface RestaurantOutput {
  status:number,
  message:string,
  data?: RestaurantOutputData
}

export interface RestaurantOutputData {
  id: number,
  name: string,
}
