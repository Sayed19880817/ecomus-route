import { CategoryAndBrand, Subcategory } from "./categoryAndBrand";

export interface CartResponseI<T> {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData<T>;
}

export interface CartData<T> {
  _id: string;
  cartOwner: string;
  products: T[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddToCartProduct {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface GetCartProduct {
  count: number;
  _id: string;
  product: InnerGetCartProduct;
  price: number;
}

export interface InnerGetCartProduct {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: CategoryAndBrand;
  brand: CategoryAndBrand;
  ratingsAverage: number;
  id: string;
}
