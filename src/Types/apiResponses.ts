import {
  AddAndRemoveWishlistI,
  AddToCartProduct,
  ApiResponse,
  CartResponseI,
  CategoryAndBrand,
  FailedUpdateUserDataI,
  GetCartProduct,
  GetWishlistI,
  Product,
  Subcategory,
  UpdateUserDataI,
  VerifyTokenI,
} from "@/interfaces";
import { AddAndRemoveAddressI, GetAddressesI } from "@/interfaces/address";
import { GetUserOrdersI } from "@/interfaces/orders";

export type ProductsApiResponse = ApiResponse<Product>;

export type CategoriesApiResponse = ApiResponse<CategoryAndBrand>;

export type BrandsApiResponse = ApiResponse<CategoryAndBrand>;

export type SubCategoriesApiResponse = ApiResponse<Subcategory>;

// Get Single Response
export type SingleCategoryApiResponse = {
  data: CategoryAndBrand;
};

export type SingleBrandApiResponse = {
  data: CategoryAndBrand;
};

export type SingleProductApiResponse = {
  data: Product;
};

// Cart Responses
export type AddToCartApiResponse = CartResponseI<AddToCartProduct>;

export type GetCartApiResponse = CartResponseI<GetCartProduct>;

// Wishlist Responses
export type GetWishlistApiResponse = GetWishlistI;

export type AddToWishlistApiResponse = AddAndRemoveWishlistI;

export type RemoveFromWishlistApiResponse = AddAndRemoveWishlistI;

// Addresses Responses
export type GetUserAddressesApiResponse = GetAddressesI;

export type GetSpecificAddressApiResponse = GetAddressesI;

export type AddAddressApiResponse = AddAndRemoveAddressI;

export type RemoveAddressApiResponse = AddAndRemoveAddressI;

// Verify Token Response
export type VerifyTokenApiResponse = VerifyTokenI;

// Orders Response
export type GetUserOrdersApiResponse = GetUserOrdersI[];

// Update User Data Responses
export type SuccessUpdateUserDataApiResponse = UpdateUserDataI;

export type FailedUpdateUserDataApiResponse = FailedUpdateUserDataI;
