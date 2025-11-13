export interface Product {
  id: number;
  name: { [key: string]: string };
  category: { [key: string]: string };
  price: number;
  salePrice?: number;
  imageUrl: string;
  description: { [key: string]: string };
  stock: number;
  tags: { [key: string]: string[] };
  sku: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface DiscountCode {
  code: string;
  percentage: number; // e.g., 25 for 25%
}

export interface Testimonial {
  id: number;
  text: { [key: string]: string };
  author: { [key: string]: string };
  rating: number;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  email: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  shippingCost: number;
  customer: CustomerDetails;
  status: 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: string;
}