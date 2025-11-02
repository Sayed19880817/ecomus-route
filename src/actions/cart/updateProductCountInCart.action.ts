"use server";

import { getAccessToken } from "@/helpers/getToken";

export async function updateProductCountInCartAction(
  productId: string,
  count: number
) {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
    {
      method: "put",
      headers: {
        token: (await getAccessToken()) + "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count,
      }),
    }
  ).then((res) => res.json());
}
