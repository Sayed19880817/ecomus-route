import { CategoryAndBrand, Subcategory } from "./categoryAndBrand";

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: CategoryAndBrand;
  brand: CategoryAndBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
