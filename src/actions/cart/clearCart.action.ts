"use server";

import { getAccessToken } from "@/helpers/getToken";

export async function clearCartAction() {
  return await fetch("https://ecommerce.routemisr.com/api/v1/cart/", {
    method: "DELETE",
    headers: {
      token: (await getAccessToken()) + "",
    },
  }).then((res) => res.json());
}
