"use server";

import { getAccessToken } from "@/helpers/getToken";
import { PaymentCashResponseI, PaymentShippingAddressI } from "@/interfaces";

export async function cashPaymentAction(
  cartId: string,
  shippingAdd: PaymentShippingAddressI
): Promise<PaymentCashResponseI> {
  return await fetch(
    "https://ecommerce.routemisr.com/api/v1/orders/" + cartId,
    {
      method: "POST",
      headers: {
        token: (await getAccessToken()) + "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress: shippingAdd }),
    }
  ).then((res) => res.json());
}
