"use server";

import { getAccessToken } from "@/helpers/getToken";
import { AddToWishlistApiResponse } from "@/Types";

export async function addToWishlistAction(
  productId: string
): Promise<AddToWishlistApiResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
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
