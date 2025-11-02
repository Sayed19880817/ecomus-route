"use server";

import { getAccessToken } from "@/helpers/getToken";
import { AddToCartApiResponse } from "@/Types";

export async function removeProductFromCartAction(
  productId: string
): Promise<AddToCartApiResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
    {
      method: "DELETE",
      headers: {
        token: (await getAccessToken()) + "",
      },
    }
  ).then((res) => res.json());
}
