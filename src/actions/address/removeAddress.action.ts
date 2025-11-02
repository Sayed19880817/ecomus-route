"use server";

import { getAccessToken } from "@/helpers/getToken";
import { RemoveAddressApiResponse } from "@/Types";

export async function deleteAddressAction(
  productId: string
): Promise<RemoveAddressApiResponse> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses/" + productId,
    {
      method: "DELETE",
      headers: {
        token: (await getAccessToken()) + "",
      },
    }
  ).then((res) => res.json());
}
