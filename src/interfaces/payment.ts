import { ShippingAddress } from "./orders";

export interface PaymentOnlineResponseI {
  statusMsg?: string;
  message: string;
  status?: string;
  session?: Session;
}

export interface Session {
  url: string;
  success_url: string;
  cancel_url: string;
}

// Cash Api Response
export interface PaymentCashResponseI {
  message?: string;
  statusMsg?: string;
  status?: string;
  data?: Data;
}

export interface Data {
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: string;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}

export interface CartItem {
  count: number;
  _id: string;
  product: string;
  price: number;
}
