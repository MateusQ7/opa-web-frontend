export interface LoginDto {
  data: {
    token: string;
    restaurantId: number;
    ownerRestaurantId: number;
    userId: number;
  }
}
