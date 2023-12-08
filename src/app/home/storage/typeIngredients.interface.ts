import { Ingredient } from "src/app/shared/ingredient-popup/ingredient.interface";

export interface TypeIngredients {
  [key: string]: IngredientTable[];
}

export interface IngredientTable {
  id: number;
  name: string;
  amountInStock: number;
  portionSize: number;
  measurementUnit: string;
  productsCount: number;
}
