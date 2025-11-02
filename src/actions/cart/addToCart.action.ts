"use server";

import { getAccessToken } from "@/helpers/getToken";
import { AddToCartApiResponse } from "@/Types";

export async function addToCartAction(
  productId: string
): Promise<AddToCartApiResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token: (await getAccessToken()) + "",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  }).then((res) => res.json());
}
