import { getUserId } from "@/helpers/user/getUserId";
import {
  BrandsApiResponse,
  CategoriesApiResponse,
  GetUserAddressesApiResponse,
  GetUserOrdersApiResponse,
  ProductsApiResponse,
  SingleBrandApiResponse,
  SingleCategoryApiResponse,
  SingleProductApiResponse,
  SubCategoriesApiResponse,
} from "@/Types";

const mainUrl = process.env.NEXT_PUBLIC_URL;

class ApiServices {
  #baseUrl: string = "";
  constructor() {
    this.#baseUrl = mainUrl ?? "";
  }

  //✅ Method to fetch All Categories
  async getAllCategories(page?: number): Promise<CategoriesApiResponse> {
    const url = new URL(this.#baseUrl + "api/categories");
    if (page) {
      url.searchParams.append("page", page.toString());
    }
    return await fetch(url.toString(), {
      method: "get",
      next: {
        revalidate: 30,
      },
    }).then((res) => res.json());
  }

  //✅ Method to fetch All Brands
  async getAllBrands(page?: number): Promise<BrandsApiResponse> {
    const url = new URL(this.#baseUrl + "api/brands");
    if (page) {
      url.searchParams.append("page", page.toString());
    }
    return await fetch(url.toString(), {
      method: "get",
      next: {
        revalidate: 30,
      },
    }).then((res) => res.json());
  }

  //✅ Method to fetch All Products with sorting
  async getAllProducts(
    sortKeys: { key: string; value: string }[] = []
  ): Promise<ProductsApiResponse> {
    const url = new URL(this.#baseUrl + "api/products");
    sortKeys.map((sortKey) => {
      url.searchParams.append(sortKey.key, sortKey.value);
    });
    return await fetch(url.toString(), {
      method: "get",
      next: {
        revalidate: 30,
      },
    }).then((res) => res.json());
  }

  //✅ Method to fetch Search Products with sorting
  async getSearchProducts(
    // searchParams: ReadonlyURLSearchParams,
    searchParams: URLSearchParams,
    limit: string = "10",
    paramKey?: string,
    paramValue?: string
  ): Promise<ProductsApiResponse> {
    const url = new URL(this.#baseUrl + "api/products");
    // const url = new URL(this.#baseUrl + "api/v1/products");
    url.searchParams.append("limit", limit);
    if (paramKey && paramValue) url.searchParams.append(paramKey, paramValue);
    searchParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
    return await fetch(url.toString(), {
      method: "get",
      next: {
        revalidate: 30,
      },
    }).then((res) => res.json());
  }

  //✅ Method to fetch Specific Product
  async getSpecificProduct(id: string): Promise<SingleProductApiResponse> {
    return await fetch(this.#baseUrl + "api/products/" + id, {
      // return await fetch( + "api/v1/products/" + id, {
      method: "get",
    }).then((res) => res.json());
  }

  //✅ Method to fetch Specific Category
  async getSpecificCategory(id: string): Promise<SingleCategoryApiResponse> {
    return await fetch(this.#baseUrl + "api/categories/" + id, {
      method: "get",
    }).then((res) => res.json());
  }

  //✅ Method to fetch Specific Brand
  async getSpecificBrand(id: string): Promise<SingleBrandApiResponse> {
    return await fetch(this.#baseUrl + "api/brands/" + id, {
      method: "get",
    }).then((res) => res.json());
  }

  //✅ Method to fetch all subcategories in category
  async getAllSubCategoriesInCategory(
    id: string,
    page: number = 1
  ): Promise<SubCategoriesApiResponse> {
    return await fetch(
      this.#baseUrl + "api/categories/" + id + "/subcategories?page=" + page,
      {
        method: "get",
        next: {
          revalidate: 30,
        },
      }
    ).then((res) => res.json());
  }

  // GetCartDataApi
  async GetUserCartData() {
    return await fetch(this.#baseUrl + "api/cart", {
      method: "GET",
    }).then((res) => res.json());
  }

  // GetWishlistDataApi
  async GetUserWishlistData() {
    return await fetch(this.#baseUrl + "api/wishlist", {
      method: "GET",
    }).then((res) => res.json());
  }

  // Get User ID
  async getUserId() {
    return await fetch(this.#baseUrl + "api/account/token", {
      method: "GET",
    }).then((res) => res.json());
  }

  // Get User Addresses
  async GetUserAddresses(): Promise<GetUserAddressesApiResponse> {
    return await fetch(this.#baseUrl + "api/account/address", {
      method: "GET",
    }).then((res) => res.json());
  }

  // Get User Orders
  async getUserOrders(): Promise<GetUserOrdersApiResponse> {
    // const user: VerifyTokenApiResponse = await this.GetUserId();
    const userId = await getUserId();
    return await fetch(this.#baseUrl + "api/orders/" + userId, {
      method: "GET",
    }).then((res) => res.json());
  }
}

export const apiServices = new ApiServices();
