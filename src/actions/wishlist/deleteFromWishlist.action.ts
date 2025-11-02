"use server";

import { getAccessToken } from "@/helpers/getToken";
import { RemoveFromWishlistApiResponse } from "@/Types";

export async function deleteFromWishlistAction(
  productId: string
): Promise<RemoveFromWishlistApiResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
    {
      method: "DELETE",
      headers: {
        token: (await getAccessToken()) + "",
      },
    }
  ).then((res) => res.json());
}
