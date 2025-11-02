import { Product } from "./product";

export interface GetWishlistI {
  status: string;
  message?: string;
  count: number;
  data: Product[];
}
export interface AddAndRemoveWishlistI {
  status: string;
  message: string;
  data: string[];
}
