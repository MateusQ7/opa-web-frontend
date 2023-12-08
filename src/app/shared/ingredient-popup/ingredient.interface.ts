export interface Ingredient {
  checked: boolean;
  id: number;
  name: string;
  un: string;
  qt: number;
  portionSize: number;
  portionSum: number;
  typeName: string;
}

export interface ItemType {
  name: string;
}
