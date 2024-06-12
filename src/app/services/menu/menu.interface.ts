export interface Menu {
  id:number;
  name:string;
  price:number;
  description:string;
  type:string;
  items:IngredientsItem[];
}

export interface IngredientsItem {
  ingredientId: number;
  portionSize: number;
  stockQuantity: number;
}
