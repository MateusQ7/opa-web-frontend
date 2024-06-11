export interface CreateProductDto {
  productName: string;
  productPrice: number;
  productDescription: string;
  productItems: ProductItemsDto[];
}

export interface ProductItemsDto {
  stockProductId: number;
  measurementUnit: string;
  stockProductName: string;
  isPortion: boolean;
  quantity: number;
}
