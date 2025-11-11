export interface Product {
  id: number;
  name: { [key: string]: string };
  category: { [key: string]: string };
  price: number;
  salePrice?: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DiscountCode {
  code: string;
  percentage: number; // e.g., 25 for 25%
}