"use server";

import { getAccessToken } from "@/helpers/getToken";
import { AddAddressApiResponse } from "@/Types";

export async function addAddressAction(
  formData: object
): Promise<AddAddressApiResponse> {
  return await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    method: "POST",
    headers: {
      token: (await getAccessToken()) + "",
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then((res) => res.json());
}
